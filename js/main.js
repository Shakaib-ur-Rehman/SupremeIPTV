(function () {
  const C = window.CONFIG;
  const SYMBOL = { GBP: "£", USD: "$", EUR: "€" };
  let currency = "GBP";

  const waLink = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
  const fmt = (n) => (Number.isInteger(n) ? n.toString() : n.toFixed(2));

  // Brand, contact links
  document.querySelectorAll("[data-brand]").forEach((el) => (el.textContent = C.brand));
  document.title = document.title.replace("Supreme IPTV", C.brand);

  function bindLinks(root = document) {
    root.querySelectorAll("[data-wa]").forEach((a) => {
      a.href = waLink(a.dataset.wa.replace("Supreme IPTV", C.brand));
      a.target = "_blank";
      a.rel = "noopener";
    });
    root.querySelectorAll("[data-email]").forEach((a) => {
      a.href = `mailto:${C.email}?subject=${encodeURIComponent(a.dataset.email)}`;
      if (a.hasAttribute("data-email-text")) a.textContent = C.email;
    });
    root.querySelectorAll("[data-telegram]").forEach((a) => {
      a.href = C.telegram;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  // Pricing
  const plansEl = document.getElementById("plans");
  function renderPlans() {
    if (!plansEl) return;
    const s = SYMBOL[currency];
    plansEl.innerHTML = C.plans
      .map((p) => {
        const price = p.price[currency];
        const per = p.months ? `${s}${(price / p.months).toFixed(2)}/month` : "Pay once, watch forever";
        const msg = `Hi! I'd like to order the ${p.name} plan (${p.term}, ${s}${fmt(price)}).`;
        return `
        <article class="plan${p.featured ? " plan--featured" : ""}">
          ${p.badge ? `<span class="plan__badge">${p.badge}</span>` : ""}
          <h3>${p.name}</h3>
          <p class="plan__term">${p.term} · ${p.screens} screens</p>
          <p class="plan__price">${s}${fmt(price)}</p>
          <p class="plan__per">${per}</p>
          <ul>
            ${p.features.map((f) => `<li>${f}</li>`).join("")}
            ${p.excluded.map((f) => `<li class="no">${f}</li>`).join("")}
          </ul>
          <a class="btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block" data-wa="${msg.replace(/"/g, "&quot;")}" href="#">Get started</a>
        </article>`;
      })
      .join("");
    bindLinks(plansEl);
  }

  document.querySelectorAll("[data-cur]").forEach((b) =>
    b.addEventListener("click", () => {
      currency = b.dataset.cur;
      document.querySelectorAll("[data-cur]").forEach((x) => x.classList.toggle("active", x === b));
      renderPlans();
    })
  );

  // Mobile nav
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("nav");
  burger?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  nav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  // Header shadow on scroll
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
        const start = performance.now();
        const tick = (t) => {
          const k = Math.min((t - start) / 1200, 1);
          el.textContent = Math.floor(target * (1 - Math.pow(1 - k, 3))).toLocaleString() + suffix;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    });
    counters.forEach((c) => io.observe(c));
  }

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  renderPlans();
  bindLinks();
})();
