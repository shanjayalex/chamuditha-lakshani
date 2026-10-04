// Image helpers: aspect-ratio classes, intrinsic sizes, srcset and blur placeholders.
import { placeholders } from "../data/placeholders.js";
import { work } from "../data/content.js";

// Intrinsic size of the FULL export for each ratio (the -560 thumbnail scales from it).
const SIZES = {
  "4:5": [1080, 1350],
  "1:1": [1080, 1080],
  "9:16": [760, 1350],
  a4: [955, 1350],
};

export const ratioClass = (ratio) => `ratio-${String(ratio).replace(":", "-")}`;
export const dims = (ratio) => SIZES[ratio] || SIZES["4:5"];
export const fullSrc = (name) => `work/${name}.jpg`;
export const thumbSrc = (name) => `work/${name}-560.jpg`;
export const placeholder = (name) => placeholders[name] || "";

export const workById = (id) => work.find((w) => w.id === id);

/**
 * <img> for a poster with srcset + blurred placeholder background.
 * opts: { ratio, alt, sizes, eager, full (use full-size only), cls }
 */
export function posterImg(name, { ratio = "4:5", alt = "", sizes = "(max-width: 700px) 90vw, 33vw", eager = false, full = false, cls = "" } = {}) {
  const [w, h] = dims(ratio);
  const ph = placeholder(name);
  const esc = (s) => String(s).replace(/"/g, "&quot;");
  const src = full ? fullSrc(name) : thumbSrc(name);
  const srcset = full ? "" : ` srcset="${thumbSrc(name)} 560w, ${fullSrc(name)} ${w}w" sizes="${sizes}"`;
  return `<img class="${cls}" src="${src}"${srcset} width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${ph ? ` style="background-image:url(${ph})"` : ""}>`;
}
