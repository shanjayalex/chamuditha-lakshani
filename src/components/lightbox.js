// Accessible lightbox: focus trap, ←/→/Esc, stories inside a phone frame, carousels with dots.
import { work } from "../data/content.js";
import { icon } from "../lib/icons.js";
import { fullSrc, dims, placeholder } from "../lib/images.js";
import { esc } from "./render.js";

export function initLightbox({ getVisibleIds, onOpen, onClose }) {
  const lb = document.getElementById("lightbox");
  let list = [];
  let index = 0;
  let slide = 0;
  let lastFocus = null;

  lb.innerHTML = `
    <div class="lb-backdrop" data-lb-close></div>
    <button class="lb-btn lb-close" type="button" data-lb-close aria-label="Close">${icon("close")}</button>
    <div class="lb-inner">
      <div class="lb-media"></div>
      <aside class="lb-info">
        <p class="mono lb-count"></p>
        <h3 id="lb-title" class="display"></h3>
        <p class="lb-meta"></p>
        <p class="lb-idea"></p>
        <p class="mono lb-tools-label">Tools</p>
        <ul class="lb-tools"></ul>
        <div class="lb-nav">
          <button class="lb-btn" type="button" data-lb-prev aria-label="Previous poster">${icon("arrowLeft")}</button>
          <button class="lb-btn" type="button" data-lb-next aria-label="Next poster">${icon("arrowRight")}</button>
        </div>
        <p class="mono lb-hint">← → to browse · Esc to close</p>
      </aside>
    </div>`;

  const $ = (s) => lb.querySelector(s);
  const media = $(".lb-media");

  function img(name, w) {
    const [iw, ih] = dims(w.ratio);
    return `<img src="${fullSrc(name)}" width="${iw}" height="${ih}" alt="${esc(w.alt)}" style="background-image:url(${placeholder(name)})">`;
  }

  function renderMedia(w) {
    if (w.type === "story") {
      media.innerHTML = `<div class="phone"><div class="phone-screen">${img(w.images[0], w)}</div><span class="phone-notch" aria-hidden="true"></span></div>`;
    } else if (w.images.length > 1) {
      media.innerHTML = `<div class="lb-carousel">${img(w.images[slide], w)}
        <div class="lb-dots" role="group" aria-label="Variations">${w.images
          .map((_, i) => `<button type="button" data-slide="${i}" aria-label="Variation ${i + 1} of ${w.images.length}" aria-current="${i === slide}"></button>`)
          .join("")}</div></div>`;
    } else {
      media.innerHTML = img(w.images[0], w);
    }
  }

  function render() {
    const w = work.find((x) => x.id === list[index]);
    if (!w) return;
    renderMedia(w);
    $(".lb-count").textContent = `${String(index + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    $("#lb-title").textContent = w.brand;
    $(".lb-meta").innerHTML = `<span class="tag">${esc(w.category)}</span><span class="status">${esc(w.status)}</span><span class="mono">${esc(w.year)}</span>`;
    $(".lb-idea").textContent = w.idea;
    $(".lb-tools").innerHTML = w.tools.map((t) => `<li>${esc(t)}</li>`).join("");
    const multi = list.length > 1;
    $("[data-lb-prev]").hidden = !multi;
    $("[data-lb-next]").hidden = !multi;
  }

  function open(id) {
    const visible = getVisibleIds();
    list = visible.includes(id) ? visible : work.map((w) => w.id);
    index = Math.max(0, list.indexOf(id));
    slide = 0;
    lastFocus = document.activeElement;
    render();
    lb.hidden = false;
    document.documentElement.style.overflow = "hidden";
    onOpen?.();
    if (window.gsap && !document.documentElement.classList.contains("no-motion")) {
      gsap.fromTo($(".lb-backdrop"), { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo($(".lb-inner"), { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "expo.out" });
    }
    $(".lb-close").focus();
  }

  function close() {
    lb.hidden = true;
    document.documentElement.style.overflow = "";
    onClose?.();
    lastFocus?.focus?.({ preventScroll: true });
  }

  function step(d) {
    index = (index + d + list.length) % list.length;
    slide = 0;
    render();
    if (window.gsap && !document.documentElement.classList.contains("no-motion")) {
      gsap.fromTo(media, { opacity: 0, x: 24 * d }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" });
    }
  }

  lb.addEventListener("click", (e) => {
    if (e.target.closest("[data-lb-close]")) return close();
    if (e.target.closest("[data-lb-prev]")) return step(-1);
    if (e.target.closest("[data-lb-next]")) return step(1);
    const dot = e.target.closest("[data-slide]");
    if (dot) {
      slide = Number(dot.dataset.slide);
      render();
      lb.querySelector(`[data-slide="${slide}"]`)?.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") return close();
    if (e.key === "ArrowRight") return step(1);
    if (e.key === "ArrowLeft") return step(-1);
    if (e.key === "Tab") {
      const f = [...lb.querySelectorAll("button:not([hidden]), [href]")].filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Any element with data-open="<work id>" opens the lightbox.
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (t && !lb.contains(t)) {
      e.preventDefault();
      open(t.dataset.open);
    }
  });

  return { open, close };
}
