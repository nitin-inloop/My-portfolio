/* Pixel-art robot, drawn as an SVG grid — crisp at any size, no image asset.
   It strolls along the rail above the footer and turns around at each end. */
const GRID = [
  "....W.....W....",
  "....D.....D....",
  "..BBBBBBBBBBB..",
  ".BBBBBBBBBBBBB.",
  ".BBWWBBBBBWWBB.",
  ".BBWWBBBBBWWBB.",
  ".BBBBBBBBBBBBB.",
  ".BLBBBDDDBBBLB.",
  ".BBBBBBBBBBBBB.",
  "..BBBBBBBBBBB..",
  "...BB.....BB...",
];

const COLORS = {
  B: "#2ea043", // body
  D: "#1a6b2c", // shade / mouth / antenna
  W: "#56d4dd", // eyes / antenna tips
  L: "#46e05f", // cheek glow
};

export default function Mascot() {
  const pixels = [];
  GRID.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch !== ".") {
        pixels.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[ch]} />);
      }
    });
  });

  return (
    <div className="rail" aria-hidden="true">
      <div className="walker">
        <svg viewBox="0 0 15 11" shapeRendering="crispEdges" className="walker-sprite">
          {pixels}
        </svg>
      </div>
    </div>
  );
}
