// Interactions that work with or without GSAP: nav, menu, filters, story player, form, clock, cursor.
import { profile, workSection, contact } from "../data/content.js";

/* Nav: solid after scrolling, hides on scroll down, returns on scroll up. */
export function initNav() {
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 20);
    nav.classList.toggle("is-hidden", y > 400 && y > lastY && document.getElementById("menu").hidden);
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active link highlighting
  const links = [...nav.querySelectorAll(".nav-links a")];
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((a) => { const s = document.querySelector(a.getAttribute("href")); if (s) io.observe(s); });

  // Mobile menu
  const menu = document.getElementById("menu");
  const burger = nav.querySelector(".nav-burger");
  const setOpen = (open) => {
    menu.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) menu.querySelector(".menu-close").focus();
    else burger.focus({ preventScroll: true });
  };
  burger.addEventListener("click", () => setOpen(true));
  menu.addEventListener("click", (e) => {
    if (e.target.closest(".menu-close")) setOpen(false);
    else if (e.target.closest("a")) { menu.hidden = true; burger.setAttribute("aria-expanded", "false"); document.documentElement.style.overflow = ""; }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) setOpen(false); });
}

/* Filter chips + "Load more". Uses GSAP Flip when available. */
export function initFilters({ motion }) {
  const grid = document.getElementById("work-grid");
  const cards = [...grid.querySelectorAll(".pcard")];
  const buttons = [...document.querySelectorAll(".filter")];
  const more = document.getElementById("load-more");
  let filter = "All";
  let expanded = false;

  const matches = (c) => filter === "All" || c.dataset.cat === filter;

  function apply({ animate = true } = {}) {
    const useFlip = animate && motion && window.Flip;
    const state = useFlip ? Flip.getState(cards) : null;
    let shown = 0;
    const total = cards.filter(matches).length;
    cards.forEach((c) => {
      const visible = matches(c) && (expanded || shown < workSection.initialCount);
      if (visible) shown++;
      c.classList.toggle("is-hidden", !visible);
    });
    more.hidden = expanded || total <= workSection.initialCount;
    if (useFlip) {
      Flip.from(state, {
        duration: 0.7,
        ease: "expo.out",
        absolute: true,
        scale: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, rotate: 0, duration: 0.7, ease: "expo.out", stagger: 0.04 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.3 }),
        onComplete: () => window.ScrollTrigger?.refresh(),
      });
    } else {
      cards.filter((c) => !c.classList.contains("is-hidden")).forEach((c) => { c.style.opacity = ""; c.style.transform = ""; });
      window.ScrollTrigger?.refresh();
    }
  }

  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      filter = b.dataset.filter;
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      apply();
    })
  );
  more.addEventListener("click", () => {
    expanded = true;
    apply();
    cards.find((c) => !c.classList.contains("is-hidden") && Number(c.dataset.index) >= workSection.initialCount)?.querySelector("button")?.focus({ preventScroll: true });
  });
  apply({ animate: false });

  return { getVisibleIds: () => cards.filter((c) => !c.classList.contains("is-hidden")).map((c) => c.dataset.id) };
}

/* Auto-advancing story in the centre phone. Click/Enter advances; pauses on hover, off-screen or reduced motion. */
export function initStory({ motion }) {
  const story = document.querySelector("[data-story]");
  if (!story) return;
  const slides = [...story.querySelectorAll(".story-slide")];
  const bars = [...story.querySelectorAll(".story-bars span")];
  const MS = 3200;
  story.style.setProperty("--story-ms", `${MS}ms`);
  let i = 0;
  let timer = null;
  let inView = false;
  let hovered = false;

  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    bars.forEach((b, k) => {
      b.classList.remove("is-active");
      b.classList.toggle("is-done", k < i);
    });
    void bars[i].offsetWidth; // restart CSS animation
    bars[i].classList.add("is-active");
    schedule();
  };
  const schedule = () => {
    clearTimeout(timer);
    const playing = motion && inView && !hovered;
    story.classList.toggle("is-paused", !playing);
    if (playing) timer = setTimeout(() => show(i + 1), MS);
  };

  story.addEventListener("click", () => show(i + 1));
  story.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(i + 1); } });
  story.addEventListener("pointerenter", () => { hovered = true; schedule(); });
  story.addEventListener("pointerleave", () => { hovered = false; show(i); });
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; show(i); }, { threshold: 0.4 }).observe(story);
  show(0);
}

/* Live Colombo clock in the footer. */
export function initClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const tick = () => { el.textContent = fmt.format(new Date()); el.dateTime = new Date().toISOString(); };
  tick();
  setInterval(tick, 1000);
}

/* Contact form: posts to Formspree/Web3Forms if configured, otherwise opens the visitor's email app. */
export function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = form.querySelector(".form-status");
  const btn = form.querySelector('button[type="submit"]');
  const label = btn.innerHTML;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const ok = f.value.trim() && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value));
      f.setAttribute("aria-invalid", String(!ok));
      if (!ok && valid) { f.focus(); valid = false; }
    });
    if (!valid) { status.textContent = "Please fill in your name, a valid email and a message."; return; }
    if (form._gotcha.value) return; // bot

    const data = Object.fromEntries(new FormData(form));
    if (!profile.formEndpoint) {
      const body = `${data.message}\n\n— ${data.name}${data.company ? `, ${data.company}` : ""}\n${data.email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${data.name}`)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email app…";
      return;
    }
    btn.disabled = true;
    btn.textContent = contact.form.sending;
    try {
      const res = await fetch(profile.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = contact.form.success;
    } catch {
      status.textContent = contact.form.error;
    } finally {
      btn.disabled = false;
      btn.innerHTML = label;
    }
  });
}

/* Custom cursor: maroon dot + lagging ring with VIEW / DRAG / CHAT labels. Fine pointers only. */
export function initCursor() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const root = document.documentElement;
  const cur = document.querySelector(".cursor");
  const dot = cur.querySelector(".cursor-dot");
  const ring = cur.querySelector(".cursor-ring");
  const lab = cur.querySelector(".cursor-label");
  root.classList.add("has-cursor");
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;

  addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    const ctx = e.target.closest?.("[data-cursor]");
    const link = e.target.closest?.("a, button, label");
    cur.classList.toggle("is-label", !!ctx);
    cur.classList.toggle("is-link", !ctx && !!link);
    if (ctx) lab.textContent = ctx.dataset.cursor.toUpperCase();
  }, { passive: true });
  document.addEventListener("pointerleave", () => cur.classList.add("is-hidden"));
  document.addEventListener("pointerenter", () => cur.classList.remove("is-hidden"));

  const loop = () => {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();
}
