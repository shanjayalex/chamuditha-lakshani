// Renders every section from src/data/content.js into the shells in index.html.
import * as C from "../data/content.js";
import { icon } from "../lib/icons.js";
import { posterImg, ratioClass, workById, placeholder } from "../lib/images.js";

const { profile } = C;

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
/** Escapes text and turns *word* into the italic maroon accent. */
export const rich = (s) => esc(s).replace(/\*(.+?)\*/g, '<em class="accent">$1</em>');

const isExternal = (url) => /^https?:/.test(url);
const extAttrs = (url) => (isExternal(url) ? ' target="_blank" rel="noopener"' : "");
const resolveHref = (h) => (h === "whatsapp" ? profile.whatsapp : h);
const pad = (n) => String(n).padStart(2, "0");
const brands = () => [...new Set(C.work.map((w) => w.brand))];

const lines = (arr) => arr.map((l) => `<span class="line"><span class="line-in">${rich(l)}</span></span>`).join("");

function sectionHeader({ num, label, title }, tag = "h2") {
  return `<header class="sh">
    <div class="sh-row mono"><span>${esc(num)}</span><span class="sh-line" aria-hidden="true"></span><span>${esc(label)}</span></div>
    <${tag} class="sh-title display" data-reveal="lines">${lines(title)}</${tag}>
  </header>`;
}

/* ── Nav + mobile menu ─────────────────────────────────────── */
function renderNav() {
  const links = C.nav.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("");
  document.getElementById("nav").innerHTML = `
    <nav class="nav-bar container" aria-label="Primary">
      <a class="monogram" href="#top" aria-label="${esc(profile.name)} — back to top">${esc(profile.monogram)}</a>
      <ul class="nav-links mono">${links}</ul>
      <a class="btn btn-primary btn-sm nav-hire" href="#contact">Hire me</a>
      <button class="nav-burger mono" type="button" aria-expanded="false" aria-controls="menu">${icon("menu")}<span>Menu</span></button>
    </nav>`;
  document.getElementById("menu").innerHTML = `
    <div class="menu-inner container">
      <button class="menu-close mono" type="button" aria-label="Close menu">${icon("close")} Close</button>
      <ul class="menu-links display">${C.nav.map((n, i) => `<li><a href="${n.href}"><span class="mono">${pad(i + 1)}</span>${esc(n.label)}</a></li>`).join("")}</ul>
      <div class="menu-foot mono">
        <a href="${profile.whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a>
        <a href="mailto:${profile.email}">Email ↗</a>
        <a href="${profile.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </div>`;
}

/* ── Preloader ─────────────────────────────────────────────── */
function renderPreloader() {
  document.getElementById("preloader").innerHTML = `
    <div class="pre-bars" aria-hidden="true"><span><i></i></span><span><i></i></span><span><i></i></span></div>
    <div class="pre-center" aria-hidden="true">
      <p class="pre-word display">${esc(C.preloader.word)}</p>
      <p class="pre-sig script">${esc(C.preloader.signature)}</p>
    </div>`;
}

/* ── Hero ──────────────────────────────────────────────────── */
function renderHero() {
  const h = C.hero;
  const floaters = h.floating
    .map((id, i) => {
      const w = workById(id);
      if (!w) return "";
      return `<button class="floater floater-${i + 1}" type="button" data-open="${w.id}" data-cursor="view" data-depth="${[1.2, 0.8, 1][i] ?? 1}" aria-label="Open poster: ${esc(w.brand)}">
        <span class="floater-card">${posterImg(w.images[0], { ratio: w.ratio, alt: "", sizes: "220px" })}</span>
        <span class="floater-like mono">${icon("heart")} ${esc(w.brand)}</span>
      </button>`;
    })
    .join("");
  const chips = h.chips.map((c, i) => `<li class="chip chip-${i + 1}" data-depth="${[0.6, 1.4, 0.9][i] ?? 1}">${icon(c.icon)}${esc(c.label)}</li>`).join("");
  const marquee = h.marquee.map((m) => `<span>${esc(m)}</span><span class="dot" aria-hidden="true">·</span>`).join("");

  document.getElementById("top").innerHTML = `
    <div class="container">
      <div class="hero-meta mono"><span>${esc(h.meta[0])}</span><span class="hair" aria-hidden="true"></span><span>${esc(h.meta[1])}</span></div>
      <div class="hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title display"><span class="sr-only">${esc(profile.name)} — </span>${lines(h.headline)}</h1>
          <p class="hero-sub" data-hero-fade>${esc(h.sub)}</p>
          <div class="hero-ctas" data-hero-fade>
            <a class="btn btn-primary" href="${h.ctaPrimary.href}">${esc(h.ctaPrimary.label)} ${icon("arrowDown")}</a>
            <a class="btn btn-outline" href="${resolveHref(h.ctaSecondary.href)}" target="_blank" rel="noopener" data-cursor="chat">${esc(h.ctaSecondary.label)} ${icon("arrowUpRight")}</a>
          </div>
          <a class="text-link mono" href="${profile.cv}" download data-hero-fade>${icon("download")} ${esc(h.ctaCv)}</a>
        </div>
        <div class="hero-visual">
          <div class="arch-wrap" data-hero-photo>
            <span class="arch-back" aria-hidden="true"></span>
            <div class="arch"><img src="${profile.photo}" width="1023" height="1537" alt="${esc(profile.photoAlt)}" fetchpriority="high" decoding="async" style="background-image:url(${placeholder("chamu")})"></div>
            <span class="arch-sig script" aria-hidden="true">${esc(profile.short)}</span>
          </div>
          <ul class="chips" aria-label="Focus areas">${chips}</ul>
          <div class="floaters">${floaters}</div>
        </div>
      </div>
    </div>
    <div class="marquee mono" data-marquee aria-label="${esc(h.marquee.join(", "))}">
      <div class="marquee-track" aria-hidden="true"><div class="marquee-group">${marquee}</div><div class="marquee-group">${marquee}</div></div>
    </div>`;
}

/* ── Selected work ─────────────────────────────────────────── */
export function posterCard(w, i) {
  const badge =
    w.type === "story" ? `<span class="pcard-badge mono">Story</span>` : w.type === "carousel" ? `<span class="pcard-badge mono">1/${w.images.length}</span>` : w.ratio === "a4" ? `<span class="pcard-badge mono">Print</span>` : "";
  return `<article class="pcard" data-cat="${esc(w.category)}" data-id="${w.id}" data-index="${i}">
    <button class="pcard-media ${ratioClass(w.ratio)}" type="button" data-open="${w.id}" data-cursor="view" aria-label="View ${esc(w.brand)} poster: ${esc(w.idea)}">
      ${posterImg(w.images[0], { ratio: w.ratio, alt: w.alt, sizes: "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw" })}
      ${badge}
      <span class="pcard-over" aria-hidden="true">
        <span class="pcard-view display">View ${icon("arrowUpRight")}</span>
        <span class="pcard-icons">${icon("heart")}${icon("comment")}${icon("send")}<span class="spacer"></span>${icon("save")}</span>
      </span>
    </button>
    <div class="pcard-cap">
      <div class="pcard-head">
        <span class="ava" aria-hidden="true">${esc(w.brand.charAt(0))}</span>
        <strong>${esc(w.brand)}</strong>
        <span class="status status-${esc(w.status.toLowerCase())}">${esc(w.status)}</span>
        <span class="mono pcard-year">${esc(w.year)}</span>
      </div>
      <p class="pcard-idea">${esc(w.idea)}</p>
      <p class="pcard-meta mono"><span class="tag">${esc(w.category)}</span>${w.tools.map(esc).join(" · ")}</p>
    </div>
  </article>`;
}

function renderWork() {
  const s = C.workSection;
  const present = new Set(C.work.map((w) => w.category));
  const filters = s.filters
    .filter((f) => f === "All" || present.has(f))
    .map((f, i) => `<button class="filter mono" type="button" data-filter="${esc(f)}" aria-pressed="${i === 0}">${esc(f)}<sup>${f === "All" ? C.work.length : C.work.filter((w) => w.category === f).length}</sup></button>`)
    .join("");
  document.getElementById("work").innerHTML = `
    <div class="container">
      <div class="work-head">
        ${sectionHeader(s)}
        <p class="section-intro">${esc(s.intro)}</p>
      </div>
      <div class="filters" role="group" aria-label="Filter work by category">${filters}</div>
      <div class="grid" id="work-grid">${C.work.map(posterCard).join("")}</div>
      <div class="work-foot">
        <button class="btn btn-outline" type="button" id="load-more">${esc(s.loadMore)} ${icon("arrowDown")}</button>
        <p class="disclaimer mono">${esc(s.disclaimer)}</p>
      </div>
    </div>`;
}

/* ── Featured campaign ─────────────────────────────────────── */
function phone(inner, cls = "") {
  return `<div class="phone ${cls}"><div class="phone-screen">${inner}</div><span class="phone-notch" aria-hidden="true"></span></div>`;
}

function renderFeatured() {
  const f = C.featured;
  const statusBar = `<div class="ph-status mono" aria-hidden="true"><span>9:41</span><span>●●● ▮</span></div>`;
  const feedGrid = f.feed
    .map((id) => {
      const w = workById(id);
      return w ? `<button type="button" class="feed-cell" data-open="${w.id}" aria-label="Open ${esc(w.brand)} poster">${posterImg(w.images[0], { ratio: w.ratio, alt: "", sizes: "90px" })}</button>` : "";
    })
    .join("");
  const feed = `${statusBar}
    <div class="ph-appbar"><strong>${esc(f.handle)}</strong>${icon("more")}</div>
    <div class="ph-profile"><span class="ph-ava">V</span><div><strong>VIEC Sri Lanka</strong><p>Better Education Better Life · Study in Australia</p></div></div>
    <div class="feed-grid">${feedGrid}</div>`;

  const storySlides = f.story
    .map((id, i) => {
      const w = workById(id);
      return w ? `<div class="story-slide${i === 0 ? " is-active" : ""}">${posterImg(w.images[0], { ratio: w.ratio, alt: i === 0 ? w.alt : "", sizes: "300px" })}</div>` : "";
    })
    .join("");
  const story = `<div class="story" data-story tabindex="0" aria-label="Story preview — press to advance">
      ${storySlides}
      <div class="story-bars" aria-hidden="true">${f.story.map(() => `<span><i></i></span>`).join("")}</div>
      <div class="story-user"><span class="ph-ava sm">V</span><strong>${esc(f.handle)}</strong><span class="mono">2h</span></div>
      <div class="story-reply" aria-hidden="true"><span>Send message</span>${icon("heart")}${icon("send")}</div>
    </div>`;

  const adW = workById(f.ad.id);
  const ad = `${statusBar}
    <div class="ad-head"><span class="ph-ava sm">V</span><div><strong>${esc(f.handle)}</strong><span>Sponsored</span></div>${icon("more")}</div>
    <div class="ad-media">${adW ? posterImg(adW.images[0], { ratio: adW.ratio, alt: "", sizes: "300px" }) : ""}</div>
    <div class="ad-cta"><span>${esc(f.ad.cta)}</span>${icon("arrowRight")}</div>
    <div class="ad-icons">${icon("heart")}${icon("comment")}${icon("send")}<span class="spacer"></span>${icon("save")}</div>
    <p class="ad-cap"><strong>${esc(f.handle)}</strong> ${esc(f.ad.caption)}</p>`;

  const statValue = (v) => (v === "workCount" ? C.work.length : v === "brandCount" ? brands().length : v);
  const stats = f.stats
    .map((s) => {
      const v = statValue(s.value);
      return `<div class="stat"><p class="stat-num display"><span data-count="${v}">${v}</span>${esc(s.suffix)}</p><p class="stat-label mono">${esc(s.label)}</p></div>`;
    })
    .join("");

  document.getElementById("featured").innerHTML = `
    <div class="feat-glow" aria-hidden="true"></div>
    <div class="container">
      <div class="feat-head">
        ${sectionHeader(f)}
        <div class="feat-copy">
          <p class="mono feat-brand">${esc(f.brand)}</p>
          <p>${esc(f.text)}</p>
        </div>
      </div>
      <div class="phones" aria-label="Campaign shown as an Instagram feed, a story and a sponsored post">
        ${phone(feed, "phone-feed")}
        ${phone(story, "phone-story")}
        ${phone(ad, "phone-ad")}
      </div>
      <div class="stats">${stats}</div>
    </div>`;
}

/* ── Case studies ──────────────────────────────────────────── */
function renderCases() {
  const s = C.casesSection;
  const row = (label, body) => (body ? `<div class="case-row"><dt class="mono">${esc(label)}</dt><dd>${body}</dd></div>` : "");
  const cards = C.cases
    .map((c, i) => {
      const thumbs = c.made
        .map((id) => {
          const w = workById(id);
          return w ? `<button type="button" class="case-thumb ${ratioClass("4:5")}" data-open="${w.id}" aria-label="Open ${esc(w.brand)} poster">${posterImg(w.images[0], { ratio: w.ratio, alt: "", sizes: "160px" })}</button>` : "";
        })
        .join("");
      const process = c.process ? `<ol class="process">${c.process.map((p, j) => `<li><span class="mono">${pad(j + 1)}</span>${esc(p)}</li>`).join("")}</ol>` : "";
      return `<article class="case${c.process ? " case-process" : ""}">
        <header class="case-top">
          <span class="mono case-idx">${pad(i + 1)} / ${pad(C.cases.length)}</span>
          <h3 class="display">${esc(c.brand)}</h3>
          <span class="tag">${esc(c.tag)}</span>
        </header>
        <dl class="case-rows">
          ${row("Goal", esc(c.goal))}
          ${row(c.process ? "Workflow" : "Idea", c.process ? process : esc(c.idea))}
          ${c.process ? row("Approach", esc(c.idea)) : ""}
          ${thumbs ? row("What I made", `<div class="case-thumbs">${thumbs}</div>`) : ""}
          ${row("Result", esc(c.result))}
        </dl>
      </article>`;
    })
    .join("");
  document.getElementById("cases").innerHTML = `
    <div class="cases-pin">
      <div class="container cases-head">
        ${sectionHeader(s)}
        <p class="section-intro">${esc(s.intro)}</p>
      </div>
      <div class="cases-viewport" data-cursor="drag">
        <div class="cases-track">${cards}</div>
      </div>
    </div>`;
}

/* ── Services ──────────────────────────────────────────────── */
function renderServices() {
  const s = C.servicesSection;
  document.getElementById("services").innerHTML = `
    <div class="container">
      ${sectionHeader(s)}
      <div class="svc-grid">
        ${C.services.map((v, i) => `<article class="svc"><span class="svc-num mono">${pad(i + 1)}</span><h3 class="display">${esc(v.title)}</h3><p>${esc(v.text)}</p></article>`).join("")}
      </div>
      <div class="svc-foot">
        <p class="display">${esc(s.availability)}</p>
        <a class="btn btn-primary" href="#contact">${esc(s.cta)} ${icon("arrowUpRight")}</a>
      </div>
    </div>`;
}

/* ── About ─────────────────────────────────────────────────── */
function renderAbout() {
  const a = C.about;
  const tools = a.tools.map((t) => `<span>${esc(t)}</span><span class="dot" aria-hidden="true">✦</span>`).join("");
  document.getElementById("about").innerHTML = `
    <div class="container about-grid">
      <figure class="polaroid">
        <span class="tape" aria-hidden="true"></span>
        <img src="${profile.photo}" width="1023" height="1537" alt="${esc(profile.photoAlt)}" loading="lazy" decoding="async">
        <figcaption class="script">${esc(a.polaroidCaption)}</figcaption>
      </figure>
      <div class="about-copy">
        ${sectionHeader(a)}
        <div class="bio">${a.bio.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <h3 class="mono sub-label">${esc(a.skillsLabel)}</h3>
        <ul class="skills">${a.skills.map((s) => `<li class="skill"><span class="display">${esc(s.name)}</span><span class="mono">${esc(s.level)}</span></li>`).join("")}</ul>
        <h3 class="mono sub-label">${esc(a.languagesLabel)}</h3>
        <ul class="langs">${profile.languages.map((l) => `<li class="tag">${esc(l)}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="about-tools">
      <h3 class="mono sub-label container">${esc(a.toolsLabel)}</h3>
      <div class="marquee marquee-tools mono" data-marquee data-speed="40" aria-label="${esc(a.tools.join(", "))}">
        <div class="marquee-track" aria-hidden="true"><div class="marquee-group">${tools}</div><div class="marquee-group">${tools}</div></div>
      </div>
    </div>`;
}

/* ── Journey ───────────────────────────────────────────────── */
function renderJourney() {
  document.getElementById("journey").innerHTML = `
    <div class="container">
      ${sectionHeader(C.journeySection)}
      <ol class="timeline">
        ${C.journey
          .map(
            (j) => `<li class="tl-item">
              <span class="tl-year display" aria-hidden="true">${esc(j.year)}</span>
              <div class="tl-body">
                <p class="mono"><span class="sr-only">${esc(j.year)} · </span>${esc(j.org)}</p>
                <h3 class="display">${esc(j.title)}</h3>
                ${j.text ? `<p>${esc(j.text)}</p>` : ""}
              </div>
            </li>`
          )
          .join("")}
      </ol>
    </div>`;
}

/* ── Contact ───────────────────────────────────────────────── */
function renderContact() {
  const c = C.contact;
  const rows = [
    { key: "WhatsApp", value: profile.phone, href: profile.whatsapp, icon: "whatsapp", cls: "is-primary", cursor: "chat" },
    { key: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
    { key: "LinkedIn", value: "Chamuditha Lakshani", href: profile.linkedin, icon: "linkedin" },
    profile.instagram ? { key: "Instagram", value: profile.instagramHandle || "Instagram", href: profile.instagram, icon: "instagram" } : null,
    { key: "GitHub", value: "chamu19", href: profile.github, icon: "github", cls: "is-small" },
  ].filter(Boolean);
  const f = c.form.fields;
  document.getElementById("contact").innerHTML = `
    <div class="container">
      <div class="sh-row mono"><span>${esc(c.num)}</span><span class="sh-line" aria-hidden="true"></span><span>${esc(c.label)}</span></div>
      <h2 class="contact-title display" data-reveal="lines">${lines(c.title)}</h2>
      <ul class="contact-rows">
        ${rows
          .map(
            (r) => `<li><a class="contact-row ${r.cls || ""}" href="${r.href}"${extAttrs(r.href)}${r.cursor ? ` data-cursor="${r.cursor}"` : ""}>
              <span class="mono cr-key">${icon(r.icon)}${esc(r.key)}</span>
              <span class="cr-val display">${esc(r.value)}</span>
              <span class="cr-arrow">${icon("arrowUpRight")}</span>
            </a></li>`
          )
          .join("")}
      </ul>
      <div class="contact-grid">
        <form class="form" id="contact-form" novalidate>
          <h3 class="mono sub-label">${esc(c.form.title)}</h3>
          <div class="form-row">
            <label><span class="mono">${esc(f.name)}</span><input name="name" autocomplete="name" required></label>
            <label><span class="mono">${esc(f.email)}</span><input name="email" type="email" autocomplete="email" required></label>
          </div>
          <label><span class="mono">${esc(f.company)}</span><input name="company" autocomplete="organization"></label>
          <label><span class="mono">${esc(f.message)}</span><textarea name="message" rows="4" required></textarea></label>
          <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="form-foot">
            <button class="btn btn-primary" type="submit">${esc(c.form.submit)} ${icon("send")}</button>
            <p class="form-status" role="status" aria-live="polite"></p>
          </div>
        </form>
        <aside class="contact-aside">
          <a class="btn btn-outline btn-lg" href="${profile.cv}" download>${icon("download")} ${esc(c.cv)}</a>
          <p class="mono loc">${icon("pin")} ${esc(c.location)}</p>
          <p class="script contact-sig" aria-hidden="true">${esc(profile.short)}</p>
        </aside>
      </div>
    </div>`;
}

/* ── Footer ────────────────────────────────────────────────── */
function renderFooter() {
  const ft = C.footer;
  const socials = [
    ["WhatsApp", profile.whatsapp],
    ["Email", `mailto:${profile.email}`],
    ["LinkedIn", profile.linkedin],
    profile.instagram ? ["Instagram", profile.instagram] : null,
    ["GitHub", profile.github],
  ].filter(Boolean);
  document.getElementById("footer").innerHTML = `
    <div class="container ft-top">
      <p class="mono ft-clock">${esc(ft.clockLabel)} <time id="clock">--:--:--</time> <span class="ft-dot" aria-hidden="true"></span></p>
      <ul class="ft-socials mono">${socials.map(([k, v]) => `<li><a href="${v}"${extAttrs(v)}>${esc(k)}</a></li>`).join("")}</ul>
      <a class="mono ft-top-link" href="#top">${esc(ft.backToTop)} ${icon("arrowUp")}</a>
    </div>
    <div class="ft-mark" aria-hidden="true">
      <span class="ft-word display">${esc(ft.wordmark)}</span>
      <span class="ft-sig script">${esc(profile.short)}</span>
    </div>
    <div class="container ft-bottom mono">
      <span>© ${esc(ft.year)} ${esc(profile.name)}</span>
      <span>${esc(profile.role)} · ${esc(profile.location)}</span>
    </div>`;
}

function renderFloatingWA() {
  const a = document.getElementById("wa-float");
  a.href = profile.whatsapp;
  a.innerHTML = `${icon("whatsapp")}<span class="sr-only">Chat on WhatsApp</span>`;
}

export function renderAll() {
  renderPreloader();
  renderNav();
  renderHero();
  renderWork();
  renderFeatured();
  renderCases();
  renderServices();
  renderAbout();
  renderJourney();
  renderContact();
  renderFooter();
  renderFloatingWA();
}
