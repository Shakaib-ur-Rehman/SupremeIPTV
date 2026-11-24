(function () {
  const C = window.CONFIG;
  const waLink = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;

  // Brand, contact links
  document.querySelectorAll("[data-brand]").forEach((el) => (el.textContent = C.brand));
  document.title = document.title.replace("Supreme IPTV", C.brand);

  document.querySelectorAll("[data-wa-text]").forEach((el) => (el.textContent = C.whatsappDisplay || `+${C.whatsapp}`));
  document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = C.email));

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

  // Reseller packages
  function renderReseller() {
    const R = C.reseller, S = C.superReseller;
    const whole = (n) => `${C.currency}${n.toLocaleString("en-GB")}`;
    const tiersEl = document.getElementById("resellerTiers");
    if (tiersEl && R) {
      tiersEl.innerHTML = R.tiers
        .map((t, i) => `
          <label class="tier">
            <input type="radio" name="reseller-tier" value="${i}" ${t.popular ? "checked" : ""}>
            <span class="tier__box">${t.popular ? '<i class="tier__hot">Popular</i>' : ""}<b>${t.name}</b><span>${whole(t.price)}</span><small>${t.credits} credits</small></span>
          </label>`)
        .join("");
      if (!tiersEl.querySelector("input:checked")) tiersEl.querySelector("input").checked = true;
      const update = () => {
        const t = R.tiers[+tiersEl.querySelector("input:checked").value];
        document.getElementById("resellerPrice").textContent = whole(t.price);
        document.getElementById("resellerTierName").textContent = ` · ${t.name} package`;
        document.getElementById("resellerCredits").innerHTML =
          `<b>${t.credits} credits</b><span>${C.currency}${(t.price / t.credits).toFixed(2)} per credit</span>`;
        document.getElementById("resellerFeatures").innerHTML =
          t.perks.map((f) => `<li class="perk">${f}</li>`).join("") + R.features.map((f) => `<li>${f}</li>`).join("");
        const buy = document.getElementById("resellerBuy");
        buy.textContent = `Get ${t.name} package →`;
        buy.href = waLink(`Hi! I'd like to become a reseller with the ${t.name} package (${whole(t.price)} for ${t.credits} credits). Please send me the details.`);
      };
      tiersEl.querySelectorAll("input").forEach((r) => r.addEventListener("change", update));
      update();
    }
    if (document.getElementById("superPrice") && S) {
      document.getElementById("superPrice").textContent = whole(S.price);
      document.getElementById("superPeriod").textContent = ` / ${S.period}`;
      document.getElementById("superFeatures").innerHTML = S.features.map((f) => `<li>${f}</li>`).join("");
      document.getElementById("superBuy").href = waLink(`Hi! I'd like to join as a Super Reseller (${whole(S.price)}/${S.period}). Please send me the details.`);
    }
  }

  // Pricing with device add-ons
  const plansEl = document.getElementById("plans");
  const money = (n) => `${C.currency}${n.toFixed(2)}`;
  const devLabel = (n) => `${n} device${n > 1 ? "s" : ""}`;

  function renderPlans() {
    if (!plansEl) return;
    plansEl.innerHTML = C.plans
      .map((p) => {
        const options = p.prices
          .map((total, i) => {
            const extra = total - p.prices[0];
            return `
            <label class="addon">
              <input type="radio" name="dev-${p.id}" value="${i}" ${i === 0 ? "checked" : ""}>
              <span class="addon__box">
                <span class="addon__name">${i === 0 ? "1 device <em>included</em>" : `${devLabel(i + 1)} <em>add-on</em>`}</span>
                <span class="addon__price">${i === 0 ? "" : `+${money(extra)}`}</span>
              </span>
            </label>`;
          })
          .join("");
        return `
        <article class="plan${p.featured ? " plan--featured" : ""}" data-plan="${p.id}">
          ${p.badge ? `<span class="plan__badge">${p.badge}</span>` : ""}
          <h3>${p.name}</h3>
          <p class="plan__term">${p.months ? "One payment, no auto-renewal" : "One-time payment"}</p>
          <p class="plan__price" aria-live="polite"></p>
          <p class="plan__per"></p>
          <fieldset class="addons">
            <legend>Choose devices</legend>
            ${options}
          </fieldset>
          <p class="plan__breakdown"></p>
          <ul>${C.features.map((f) => `<li>${f}</li>`).join("")}</ul>
          <a class="btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block plan__buy" href="#" target="_blank" rel="noopener">Get started</a>
        </article>`;
      })
      .join("");

    plansEl.querySelectorAll(".plan").forEach((card) => {
      const p = C.plans.find((x) => x.id === card.dataset.plan);
      const update = () => {
        const i = +card.querySelector("input:checked").value;
        const total = p.prices[i];
        const extra = total - p.prices[0];
        card.querySelector(".plan__price").textContent = money(total);
        card.querySelector(".plan__per").textContent = p.months
          ? `${money(total / p.months)}/month · ${devLabel(i + 1)}`
          : `Lifetime access · ${devLabel(i + 1)}`;
        card.querySelector(".plan__breakdown").innerHTML = i
          ? `${money(p.prices[0])} plan + ${money(extra)} ${i + 1}-device add-on = <b>${money(total)}</b>`
          : "&nbsp;";
        const msg = `Hi! I'd like to order the ${p.name} plan with ${devLabel(i + 1)}. Total: ${money(total)}.`;
        card.querySelector(".plan__buy").href = waLink(msg);
      };
      card.querySelectorAll("input").forEach((r) => r.addEventListener("change", update));
      update();
    });

    renderReseller();

    // "From £x/month" text elsewhere on the page
    const lowest = Math.min(...C.plans.filter((p) => p.months).map((p) => p.prices[0] / p.months));
    document.querySelectorAll("[data-from-price]").forEach((el) => (el.textContent = `From ${money(lowest)}`));
  }

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
