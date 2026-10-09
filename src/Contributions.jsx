import { useEffect, useMemo, useState } from "react";

/* Live GitHub contribution graph.
   GitHub's own contribution data isn't on the REST API, so we read it from the
   public jogruber mirror. If that call fails we say so rather than draw fake squares. */
const endpoint = (user) => `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;
const CACHE_KEY = (user) => `contrib:${user}`;
const CACHE_TTL = 60 * 60 * 1000; // an hour is plenty for a graph of whole days

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function readCache(user) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY(user));
    if (!raw) return null;
    const { at, payload } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? payload : null;
  } catch {
    return null;
  }
}

function writeCache(user, payload) {
  try {
    sessionStorage.setItem(CACHE_KEY(user), JSON.stringify({ at: Date.now(), payload }));
  } catch {
    /* private mode / quota — the graph just refetches next visit */
  }
}

export function useContributions(user) {
  const [state, setState] = useState(() => {
    const cached = readCache(user);
    return cached ? { status: "ok", data: cached } : { status: "loading", data: null };
  });

  useEffect(() => {
    if (state.status === "ok") return;
    const ac = new AbortController();
    fetch(endpoint(user), { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) => {
        if (!data?.contributions?.length) throw new Error("empty");
        writeCache(user, data);
        setState({ status: "ok", data });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error", data: null });
      });
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return state;
}

/* Dates are plain YYYY-MM-DD days — parse as UTC so a timezone never shifts a square. */
const utc = (iso) => new Date(`${iso}T00:00:00Z`);

function buildWeeks(days) {
  const lead = utc(days[0].date).getUTCDay();
  const cells = [...Array(lead).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function monthLabels(weeks) {
  const labels = [];
  let last = -1;
  weeks.forEach((week, i) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = utc(first.date).getUTCMonth();
    // Only label a month once its column has room for the word.
    if (month !== last && i < weeks.length - 2) {
      labels[i] = MONTHS[month];
      last = month;
    }
  });
  return labels;
}

const fmt = (iso) =>
  utc(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function Contributions({ user, profileUrl, state }) {
  const [tip, setTip] = useState(null);
  const { status, data } = state;

  const weeks = useMemo(() => (data ? buildWeeks(data.contributions) : []), [data]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);

  return (
    <section className="sec" id="contributions">
      <div className="sec-head">
        <h2>Contributions</h2>
        <a className="sec-link" href={profileUrl} target="_blank" rel="noopener noreferrer">
          @{user} ↗
        </a>
      </div>

      <div className="cg-card">
        {status === "loading" && (
          <div className="cg-scroll">
            <div className="cg-skeleton" aria-label="Loading contribution graph">
              {Array.from({ length: 53 * 7 }).map((_, i) => (
                <i key={i} style={{ animationDelay: `${(i % 53) * 18}ms` }} />
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="cg-error">
            Couldn't reach the contributions API right now —{" "}
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              see the live graph on GitHub ↗
            </a>
          </p>
        )}

        {status === "ok" && (
          <>
            <div className="cg-scroll">
              <div className="cg-inner">
                <div className="cg-months" aria-hidden="true">
                  {weeks.map((_, i) => (
                    <span key={i}>{labels[i] || ""}</span>
                  ))}
                </div>

                <div
                  className="cg-weeks"
                  role="img"
                  aria-label={`${data.total.lastYear} GitHub contributions in the last year`}
                  onMouseLeave={() => setTip(null)}
                >
                  {weeks.map((week, w) => (
                    <div className="cg-week" key={w}>
                      {week.map((day, d) =>
                        day ? (
                          <i
                            key={day.date}
                            className="cg-cell"
                            data-level={day.level}
                            onMouseEnter={(e) => {
                              const r = e.currentTarget.getBoundingClientRect();
                              setTip({
                                x: r.left + r.width / 2,
                                y: r.top,
                                text: `${day.count || "No"} contribution${day.count === 1 ? "" : "s"} on ${fmt(day.date)}`,
                              });
                            }}
                          />
                        ) : (
                          <i key={`pad-${w}-${d}`} className="cg-cell pad" />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cg-foot">
              <span className="cg-total">
                <strong>{data.total.lastYear.toLocaleString()}</strong> contributions in the last year
              </span>
              <span className="cg-legend">
                Less
                {[0, 1, 2, 3, 4].map((l) => (
                  <i key={l} className="cg-cell" data-level={l} />
                ))}
                More
              </span>
            </div>
          </>
        )}
      </div>

      {tip && (
        <div className="cg-tip" style={{ left: tip.x, top: tip.y }} role="status">
          {tip.text}
        </div>
      )}
    </section>
  );
}
