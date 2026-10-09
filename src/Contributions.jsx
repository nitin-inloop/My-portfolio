import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* Live GitHub contribution graph.
   Fetches live contribution data (including private contributions if enabled on GitHub)
   from gh-calendar with a fallback to jogruber mirror. */
const CACHE_KEY = (user) => `contrib_v3:${user}`;
const CACHE_TTL = 15 * 60 * 1000; // 15 mins

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

async function fetchContributionData(user, signal) {
  try {
    const res = await fetch(`https://gh-calendar.rschristian.dev/user/${user}`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    if (!d?.contributions?.length) throw new Error("empty");
    const flatDays = Array.isArray(d.contributions[0]) ? d.contributions.flat() : d.contributions;
    const normalizedDays = flatDays.map((item) => ({
      date: item.date,
      count: item.count || 0,
      level: Number(item.intensity ?? item.level ?? 0),
    }));
    return {
      total: { lastYear: typeof d.total === "number" ? d.total : d.total?.lastYear || 0 },
      contributions: normalizedDays,
    };
  } catch (err) {
    if (err.name === "AbortError") throw err;
    // Fallback to jogruber mirror
    const res2 = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal });
    if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
    const data = await res2.json();
    if (!data?.contributions?.length) throw new Error("empty");
    return data;
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
    fetchContributionData(user, ac.signal)
      .then((data) => {
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
  const tipRef = useRef(null);
  const scrollRef = useRef(null);
  const { status, data } = state;

  /* On initial render/load, scroll calendar to the right so current contributions are immediately visible on mobile */
  useLayoutEffect(() => {
    if (status === "ok" && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [status]);

  /* The tooltip is centered on its cell, so near the viewport edges half of it
     would hang off-screen — measure it after render and nudge it back inside. */
  useLayoutEffect(() => {
    const el = tipRef.current;
    if (!tip || !el) return;
    el.style.left = `${tip.x}px`;
    const r = el.getBoundingClientRect();
    const pad = 8;
    if (r.left < pad) el.style.left = `${tip.x + (pad - r.left)}px`;
    else if (r.right > window.innerWidth - pad) el.style.left = `${tip.x - (r.right - (window.innerWidth - pad))}px`;
  }, [tip]);

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
          <div className="cg-scroll" ref={scrollRef}>
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
            <div className="cg-scroll" ref={scrollRef}>
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
                            onClick={(e) => {
                              const r = e.currentTarget.getBoundingClientRect();
                              setTip({
                                x: r.left + r.width / 2,
                                y: r.top,
                                text: `${day.count || "No"} contribution${day.count === 1 ? "" : "s"} on ${fmt(day.date)}`,
                              });
                            }}
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
        <div ref={tipRef} className="cg-tip" style={{ left: tip.x, top: tip.y }} role="status">
          {tip.text}
        </div>
      )}
    </section>
  );
}
