/* =========================================================
   IP Checker — shared static site JS
   Powers header/footer, theme, mobile nav, and page features.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Theme ---------- */
  const THEME_KEY = "ipc-theme";
  function applyTheme(theme) {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }
  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
  }
  applyTheme(getTheme());

  /* ---------- SVG Icons ---------- */
  const ICONS = {
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  };
  window.ICONS = ICONS;

  /* ---------- Header & Footer Injection ---------- */
  const NAV_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "IP Lookup", href: "ip-lookup.html" },
    { label: "Privacy & VPN", href: "privacy.html" },
    { label: "Tools", href: "tools.html" },
    { label: "Blog", href: "blog.html" },
  ];

  function currentPage() {
    const path = location.pathname.split("/").pop() || "index.html";
    return path;
  }

  function renderHeader() {
    const container = document.getElementById("site-header");
    if (!container) return;
    const current = currentPage();
    const isActive = (href) =>
      href === current || (current === "" && href === "index.html");

    const desktopNav = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${isActive(l.href) ? "active" : ""}">${l.label}</a>`
    ).join("");

    const mobileNav = NAV_LINKS.map(
      (l) =>
        `<a href="${l.href}" class="${isActive(l.href) ? "active" : ""}">${l.label}</a>`
    ).join("");

    const isDark = getTheme() === "dark";
    container.innerHTML = `
      <header class="header">
        <div class="header-inner">
          <a href="index.html" class="logo" aria-label="IP Checker home">
            ${ICONS.wifi}
            <span>IP Checker</span>
          </a>
          <nav class="nav desktop-controls" aria-label="Main">
            ${desktopNav}
            <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme" style="margin-left:0.5rem">
              ${isDark ? ICONS.sun : ICONS.moon}
            </button>
          </nav>
          <div class="mobile-controls">
            <button class="icon-btn" id="theme-toggle-mobile" aria-label="Toggle theme">
              ${isDark ? ICONS.sun : ICONS.moon}
            </button>
            <button class="icon-btn" id="mobile-menu-btn" aria-label="Menu" aria-expanded="false">
              ${ICONS.menu}
            </button>
          </div>
        </div>
        <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
          ${mobileNav}
        </nav>
      </header>
    `;

    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileNavEl = document.getElementById("mobile-nav");
    menuBtn.addEventListener("click", () => {
      const open = mobileNavEl.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.innerHTML = open ? ICONS.x : ICONS.menu;
    });

    function toggleTheme() {
      const next = getTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      renderHeader();
    }
    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
    document.getElementById("theme-toggle-mobile")?.addEventListener("click", toggleTheme);
  }

  function renderFooter() {
    const container = document.getElementById("site-footer");
    if (!container) return;
    const year = new Date().getFullYear();
    container.innerHTML = `
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-grid">
            <div class="col">
              <a href="index.html" class="logo" style="margin-bottom:0.75rem">
                ${ICONS.wifi}<span>IP Checker</span>
              </a>
              <p>Free tools to check your IP address, lookup any IP, and learn about online privacy.</p>
            </div>
            <div class="col">
              <h3>Tools</h3>
              <div class="links">
                <a href="index.html">What Is My IP</a>
                <a href="ip-lookup.html">IP Address Lookup</a>
                <a href="tools.html">All Network Tools</a>
              </div>
            </div>
            <div class="col">
              <h3>Resources</h3>
              <div class="links">
                <a href="privacy.html">Privacy &amp; VPN Guide</a>
                <a href="blog.html">Blog</a>
                <a href="blog-post.html?slug=ipv4-vs-ipv6">IPv4 vs IPv6</a>
              </div>
            </div>
            <div class="col">
              <h3>Pages</h3>
              <div class="links">
                ${NAV_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${year} What Is My IP Address. All rights reserved.</p>
            <div class="foot-links">
              <a href="privacy.html">Privacy</a>
              <a href="tools.html">Tools</a>
              <a href="blog.html">Blog</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    let box = document.getElementById("toast-box");
    if (!box) {
      box = document.createElement("div");
      box.id = "toast-box";
      box.style.cssText =
        "position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:100;display:flex;flex-direction:column;gap:0.5rem;";
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText =
      "background:var(--card);color:var(--foreground);border:1px solid var(--border);border-radius:0.75rem;padding:0.75rem 1.25rem;font-size:0.875rem;box-shadow:var(--shadow-xl);animation:toast-in 0.2s ease-out;";
    box.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transition = "opacity 0.3s";
      setTimeout(() => t.remove(), 300);
    }, 2000);
  }
  window.toast = toast;

  /* ---------- InfoCard renderer ---------- */
  function infoCardHTML(icon, label, value) {
    return `
      <div class="info-card">
        <div class="info-label">${icon}<span>${label}</span></div>
        <div class="info-value">${value}</div>
      </div>`;
  }
  window.infoCardHTML = infoCardHTML;

  /* ---------- FAQ renderer ---------- */
  function renderFaqs(containerId, faqs) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <section class="faq container">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-list">
          ${faqs
            .map(
              (f) => `
            <details class="faq-item">
              <summary>${f.q}</summary>
              <div class="faq-body">${f.a}</div>
            </details>`
            )
            .join("")}
        </div>
      </section>`;
  }
  window.renderFaqs = renderFaqs;

  /* ---------- IP fetch helpers ---------- */
  function fetchMyIp() {
    return fetch("https://ipinfo.io/json")
      .then((r) => {
        if (!r.ok) throw new Error("bad");
        return r.json();
      })
      .catch(() =>
        fetch("https://api.ipify.org?format=json")
          .then((r) => r.json())
          .then((d) => ({ ip: d.ip }))
      );
  }
  function lookupIp(ip) {
    return fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`).then((r) => {
      if (!r.ok) throw new Error("Invalid IP");
      return r.json();
    });
  }
  window.fetchMyIp = fetchMyIp;
  window.lookupIp = lookupIp;

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    if (typeof window.initPage === "function") window.initPage();
  });
})();
