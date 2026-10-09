/* Pixel-art robot mascot, drawn as an SVG grid — crisp at any size, no image asset. */
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
  B: "#8b7cf6", // body
  D: "#5b49cf", // shade / mouth / antenna
  W: "#f4f1ff", // eyes / antenna tips
  L: "#c3b9ff", // blush
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
    <div className="mascot" aria-hidden="true">
      <svg viewBox="0 0 15 11" shapeRendering="crispEdges" role="img" aria-label="Pixel robot mascot">
        {pixels}
      </svg>
      <span className="spark s1">✦</span>
      <span className="spark s2">✚</span>
      <span className="spark s3">●</span>
      <span className="spark s4">✦</span>
      <span className="spark s5">◆</span>
    </div>
  );
}
