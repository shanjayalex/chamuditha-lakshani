import { renderAll } from "./components/render.js";
import { initLightbox } from "./components/lightbox.js";
import { initNav, initFilters, initStory, initClock, initForm, initCursor } from "./components/ui.js";
import { initMotion, playIntro } from "./motion.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const motion = !reduced && !!window.gsap && !!window.ScrollTrigger;
document.documentElement.classList.toggle("no-motion", !motion);

renderAll();

const ctrl = motion ? initMotion() : null;
const filters = initFilters({ motion });
initLightbox({ getVisibleIds: filters.getVisibleIds, onOpen: () => ctrl?.stop(), onClose: () => ctrl?.start() });
initNav();
initStory({ motion: !reduced });
initClock();
initForm();
if (!reduced) initCursor();
playIntro({ motion });
