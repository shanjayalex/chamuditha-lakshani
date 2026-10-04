// GSAP + ScrollTrigger + Lenis motion layer. Only runs when motion is allowed and GSAP loaded.

export function initMotion() {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger, ...(window.Flip ? [window.Flip] : []));
  gsap.defaults({ ease: "expo.out" });

  /* ── Lenis smooth scroll synced to the GSAP ticker ── */
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.closest("#lightbox")) return;
      const target = a.getAttribute("href") === "#top" ? 0 : document.querySelector(a.getAttribute("href"));
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.4 });
      history.replaceState(null, "", a.getAttribute("href"));
    });
  }

  /* ── Generic line reveals for section titles ── */
  gsap.utils.toArray('[data-reveal="lines"]').forEach((el) => {
    const inner = el.querySelectorAll(".line-in");
    const accent = el.querySelectorAll(".accent");
    const row = el.closest(".sh")?.querySelector(".sh-line") || el.parentElement.querySelector(".sh-line");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    if (row) tl.from(row, { scaleX: 0, duration: 1.2 }, 0);
    tl.from(inner, { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0);
    if (accent.length) tl.from(accent, { scale: 0.9, opacity: 0, duration: 1, transformOrigin: "left bottom" }, 0.35);
  });

  /* ── Poster cards: stagger in + 3D tilt ── */
  const cards = gsap.utils.toArray(".pcard");
  gsap.set(cards, { opacity: 0, y: 60, rotate: 2 });
  ScrollTrigger.batch(cards, {
    start: "top 92%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, rotate: 0, duration: 1.1, stagger: 0.09, overwrite: true }),
  });
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".pcard-media").forEach((m) => {
      const rx = gsap.quickTo(m, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(m, "rotationY", { duration: 0.6, ease: "power3.out" });
      gsap.set(m, { transformPerspective: 900 });
      m.addEventListener("pointermove", (e) => {
        const r = m.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
      });
      m.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });
  }

  /* ── Hero: mouse parallax on floaters + chips, scroll drift ── */
  const depthEls = gsap.utils.toArray(".hero [data-depth]");
  if (matchMedia("(min-width: 901px) and (pointer: fine)").matches) {
    const movers = depthEls.map((el) => ({ el, d: Number(el.dataset.depth) || 1, x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }) }));
    document.getElementById("top").addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      movers.forEach((m) => { m.x(nx * 24 * m.d * 0.5); m.y(ny * 24 * m.d * 0.5); }); // max ≈ 12px
    });
    gsap.utils.toArray(".floater-card").forEach((el, i) => {
      gsap.to(el, { yPercent: [-18, -30, -12][i] ?? -20, ease: "none", scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } });
    });
  }

  /* ── Marquees: constant drift, speed reacts to scroll velocity ── */
  document.querySelectorAll("[data-marquee]").forEach((mq) => {
    mq.classList.add("is-js");
    const track = mq.querySelector(".marquee-track");
    const speed = Number(mq.dataset.speed) || 30;
    const tween = gsap.to(track, { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
    tween.totalTime(speed * 200); // head-room so reversing on scroll-up never hits time 0
    let dir = 1;
    ScrollTrigger.create({
      trigger: mq,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction;
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 5);
        gsap.to(tween, { timeScale: boost * dir, duration: 0.2, overwrite: true, onComplete: () => gsap.to(tween, { timeScale: dir, duration: 1.2, ease: "power2.out" }) });
      },
    });
  });

  /* ── Featured: phones rise in sequence and tilt; stat counters ── */
  const phones = gsap.utils.toArray(".phones > .phone");
  if (phones.length === 3 && matchMedia("(min-width: 761px)").matches) {
    gsap.set(".phones", { transformStyle: "preserve-3d" });
    gsap.set(phones[0], { rotationY: 8 });
    gsap.set(phones[2], { rotationY: -8 });
    gsap.from(phones, {
      y: 160,
      opacity: 0,
      rotationY: (i) => [24, 0, -24][i],
      duration: 1.4,
      stagger: 0.15,
      scrollTrigger: { trigger: ".phones", start: "top 85%", once: true },
    });
  }
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    if (!Number.isFinite(end)) return;
    const obj = { v: 0 };
    el.textContent = "0";
    gsap.to(obj, { v: end, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => (el.textContent = Math.round(obj.v)) });
  });

  /* ── Case studies: pinned horizontal scroll on desktop ── */
  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const section = document.querySelector(".cases-pin");
    const viewport = section.querySelector(".cases-viewport");
    const track = section.querySelector(".cases-track");
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    section.classList.add("is-pinned");
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    gsap.utils.toArray(".case").forEach((c, i) => gsap.from(c, { opacity: 0, x: 80, duration: 1, delay: i * 0.08, scrollTrigger: { trigger: section, start: "top 70%", once: true } }));
    return () => { section.classList.remove("is-pinned"); tween.scrollTrigger?.kill(); gsap.set(track, { x: 0 }); viewport.scrollLeft = 0; };
  });

  /* ── Services cards ── */
  ScrollTrigger.batch(".svc", { start: "top 90%", once: true, onEnter: (b) => gsap.from(b, { y: 50, opacity: 0, duration: 1, stagger: 0.08 }) });

  /* ── About: polaroid drop, skill lines draw in ── */
  gsap.from(".polaroid", { y: 80, rotate: -10, opacity: 0, duration: 1.4, scrollTrigger: { trigger: ".about", start: "top 75%", once: true } });
  gsap.utils.toArray(".skill").forEach((s) => {
    gsap.fromTo(s, { "--draw": 0 }, { "--draw": 1, duration: 1.4, ease: "power3.inOut", scrollTrigger: { trigger: s, start: "top 92%", once: true } });
  });

  /* ── Journey: outlined years fill with maroon ── */
  gsap.utils.toArray(".tl-item").forEach((item) => {
    ScrollTrigger.create({ trigger: item, start: "top 75%", once: true, onEnter: () => item.classList.add("is-in") });
    gsap.from(item.querySelector(".tl-body"), { y: 40, opacity: 0, duration: 1, scrollTrigger: { trigger: item, start: "top 85%", once: true } });
  });

  /* ── Contact rows + footer wordmark ── */
  ScrollTrigger.batch(".contact-row", { start: "top 92%", once: true, onEnter: (b) => gsap.from(b, { y: 40, opacity: 0, duration: 1, stagger: 0.07 }) });
  gsap.from(".ft-word", { yPercent: 40, duration: 1.6, scrollTrigger: { trigger: ".footer", start: "top 85%", once: true } });
  gsap.from(".ft-sig", { opacity: 0, rotate: -16, x: -30, duration: 1.4, delay: 0.3, scrollTrigger: { trigger: ".footer", start: "top 85%", once: true } });

  // Images load late in a masonry layout; refresh trigger positions once they have.
  window.addEventListener("load", () => ScrollTrigger.refresh());

  return {
    lenis,
    stop: () => lenis?.stop(),
    start: () => lenis?.start(),
  };
}

/* Preloader (once per session) → hero intro timeline. */
export function playIntro({ motion }) {
  const root = document.documentElement;
  const pre = document.getElementById("preloader");
  let seen = root.classList.contains("pre-done");
  try { sessionStorage.setItem("cl-seen", "1"); } catch {}

  if (!motion || !window.gsap) {
    root.classList.add("pre-done");
    return;
  }
  const gsap = window.gsap;
  const heroLines = document.querySelectorAll(".hero-title .line-in");
  const tl = gsap.timeline();

  if (!seen) {
    tl.to(pre.querySelectorAll(".pre-bars i"), { scaleX: 1, duration: 0.32, ease: "none", stagger: 0.32 }, 0)
      .from(pre.querySelector(".pre-word"), { yPercent: 60, opacity: 0, duration: 0.6 }, 0)
      .to(pre.querySelector(".pre-sig"), { clipPath: "inset(0 0% 0 0)", duration: 0.75, ease: "power2.inOut" }, 0.2)
      .to(pre, { yPercent: -100, duration: 0.6, ease: "expo.inOut" }, 1.0)
      .add(() => root.classList.add("pre-done"));
  }

  const start = seen ? 0 : 1.15;
  tl.from(heroLines, { yPercent: 110, duration: 1.2, stagger: 0.08 }, start)
    .from(".hero-title .accent", { scale: 0.9, opacity: 0, duration: 1, transformOrigin: "left bottom" }, start + 0.4)
    .from(".hero-meta", { opacity: 0, y: -10, duration: 0.8 }, start)
    .fromTo("[data-hero-photo]", { clipPath: "inset(100% -30% -30% -30%)", y: 40 }, { clipPath: "inset(0% -30% -30% -30%)", y: 0, duration: 1.4, ease: "expo.inOut", clearProps: "clipPath" }, Math.max(0, start - 0.1))
    .from(".floater", { opacity: 0, y: 60, scale: 0.9, duration: 1.1, stagger: 0.1 }, start + 0.45)
    .from(".chip", { opacity: 0, scale: 0.6, duration: 0.8, stagger: 0.08, ease: "back.out(2)" }, start + 0.7)
    .from("[data-hero-fade]", { opacity: 0, y: 20, duration: 0.9, stagger: 0.08 }, start + 0.5)
    .from(".hero .marquee", { opacity: 0, duration: 1 }, start + 0.8)
    .from(".wa-float", { scale: 0, duration: 0.8, ease: "back.out(2)" }, start + 1);
}
