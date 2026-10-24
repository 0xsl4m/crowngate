/* =========================================================
   CrownGate — site behaviour
   No URL hash writes. No page-wide H1 overrides.
   ========================================================= */

(function () {
  "use strict";

  const WA_NUMBER = "201004717276";
  const LANG_KEY = "cg-lang";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let currentLang = "en";
  let lastGalleryTrigger = null;
  let galleryImages = [];
  let galleryIndex = 0;

  function waLink(message) {
    const base = `https://wa.me/${WA_NUMBER}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  function whatsappMessage(lines) {
    return lines.filter(Boolean).join("\n");
  }

  function openWhatsApp(message) {
    const url = waLink(message);
    const opened = window.open(url, "_blank", "noopener");
    return { url, opened: Boolean(opened) };
  }

  /* Language ------------------------------------------------ */

  function storedLang() {
    return localStorage.getItem(LANG_KEY) || localStorage.getItem("lang") || "en";
  }

  function applyLanguage(lang, persist = true) {
    currentLang = lang === "ar" ? "ar" : "en";

    if (persist) {
      localStorage.setItem(LANG_KEY, currentLang);
      localStorage.setItem("lang", currentLang);
    }

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", currentLang === "ar");

    $$("[data-lang-en]").forEach((el) => {
      const value = el.getAttribute(`data-lang-${currentLang}`);
      if (!value) return;

      if (el.hasAttribute("data-lang-html")) {
        el.innerHTML = value;
      } else if (el.tagName === "OPTION" || el.tagName === "TITLE") {
        el.textContent = value;
      } else if (el.tagName === "META") {
        el.setAttribute("content", value);
      } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        return;
      } else {
        el.textContent = value;
      }
    });

    $$("[data-lang-en-placeholder]").forEach((el) => {
      const value = el.getAttribute(`data-lang-${currentLang}-placeholder`);
      if (value) el.setAttribute("placeholder", value);
    });

    $$("[data-lang-set]").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-lang-set") === currentLang);
    });

    const title = document.querySelector("title[data-lang-en]");
    if (title) document.title = title.textContent;
  }

  function toggleLanguage() {
    applyLanguage(currentLang === "en" ? "ar" : "en");
  }

  /* Header / menu ------------------------------------------- */

  function initHeader() {
    const header = $(".site-header");
    if (!header) return;

    if (!$(".hero") && !$(".page-hero")) header.classList.add("is-solid");

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const nav = $("#primaryNav");
    const toggle = $("#menuToggle");
    if (!nav || !toggle) return;

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const willOpen = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
      document.body.classList.toggle("menu-open", willOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  /* Reveal on scroll --------------------------------------- */

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        fired = true;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));

    // Fail-safe: if the rendering pipeline is paused (background/occluded tab),
    // reveal everything rather than leaving content invisible.
    setTimeout(() => {
      if (fired) return;
      observer.disconnect();
      items.forEach((el) => el.classList.add("is-visible"));
    }, 2500);
  }

  /* Quick request (hero) ----------------------------------- */

  function initQuickRequest() {
    const form = $("#quickRequest");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const service = form.elements.service;
      const date = form.elements.date.value;
      const travellers = form.elements.travellers.value;
      const notes = form.elements.notes.value.trim();
      const serviceLabel = service.selectedOptions[0]
        ? service.selectedOptions[0].textContent.trim()
        : service.value;

      const message =
        currentLang === "ar"
          ? whatsappMessage([
              "مرحبًا كراون جيت، أرغب في ترتيب:",
              `الخدمة: ${serviceLabel}`,
              date ? `التاريخ: ${date}` : "",
              travellers ? `عدد الأفراد: ${travellers}` : "",
              notes ? `ملاحظات: ${notes}` : "",
            ])
          : whatsappMessage([
              "Hello CrownGate, I would like to arrange:",
              `Service: ${serviceLabel}`,
              date ? `Date: ${date}` : "",
              travellers ? `Travellers: ${travellers}` : "",
              notes ? `Notes: ${notes}` : "",
            ]);

      openWhatsApp(message);
    });
  }

  /* Booking form ------------------------------------------- */

  function initBookingForm() {
    const form = $("#bookingForm");
    if (!form) return;

    const errorBox = $("#formErrors");
    const note = $("#formNote");
    const phoneRegex = /^\+?[0-9][0-9\s\-()]{7,18}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showErrors(messages) {
      if (!errorBox) return;
      errorBox.innerHTML = "";
      if (!messages.length) {
        errorBox.classList.remove("is-visible");
        return;
      }
      const list = document.createElement("ul");
      list.style.margin = "0";
      list.style.paddingInlineStart = "18px";
      messages.forEach((message) => {
        const item = document.createElement("li");
        item.textContent = message;
        list.appendChild(item);
      });
      errorBox.appendChild(list);
      errorBox.classList.add("is-visible");
      errorBox.setAttribute("role", "alert");
    }

    function validate() {
      const messages = [];
      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      const email = form.elements.email.value.trim();
      const country = form.elements.country.value.trim();
      const services = $$('input[name="services[]"]:checked', form);
      const arrival = form.elements.arrival.value;
      const departure = form.elements.departure.value;

      if (name.length < 2) messages.push(currentLang === "ar" ? "اكتب الاسم الكامل." : "Please enter your full name.");
      if (!phoneRegex.test(phone)) messages.push(currentLang === "ar" ? "اكتب رقم هاتف صحيح مع كود الدولة." : "Please enter a valid phone number with country code.");
      if (!emailRegex.test(email)) messages.push(currentLang === "ar" ? "اكتب بريدًا إلكترونيًا صحيحًا." : "Please enter a valid email address.");
      if (!country) messages.push(currentLang === "ar" ? "اكتب بلد الإقامة." : "Please enter your country.");
      if (!services.length) messages.push(currentLang === "ar" ? "اختر خدمة واحدة على الأقل." : "Please choose at least one service.");
      if (arrival && departure && departure < arrival) messages.push(currentLang === "ar" ? "تاريخ المغادرة يجب أن يكون بعد الوصول." : "Departure date must be after the arrival date.");

      return messages;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const messages = validate();
      showErrors(messages);

      if (messages.length) {
        const firstInvalid = form.querySelector('[aria-invalid="true"], input, select, textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const services = $$('input[name="services[]"]:checked', form)
        .map((input) => input.getAttribute(`data-label-${currentLang}`) || input.value)
        .join(", ");

      const message =
        currentLang === "ar"
          ? whatsappMessage([
              "طلب جديد من كراون جيت:",
              `الاسم: ${form.elements.name.value.trim()}`,
              `الهاتف: ${form.elements.phone.value.trim()}`,
              `البريد: ${form.elements.email.value.trim()}`,
              `البلد: ${form.elements.country.value.trim()}`,
              `الخدمات: ${services}`,
              form.elements.arrival.value ? `الوصول: ${form.elements.arrival.value}` : "",
              form.elements.departure.value ? `المغادرة: ${form.elements.departure.value}` : "",
              form.elements.details.value.trim() ? `تفاصيل: ${form.elements.details.value.trim()}` : "",
            ])
          : whatsappMessage([
              "New CrownGate request:",
              `Name: ${form.elements.name.value.trim()}`,
              `Phone: ${form.elements.phone.value.trim()}`,
              `Email: ${form.elements.email.value.trim()}`,
              `Country: ${form.elements.country.value.trim()}`,
              `Services: ${services}`,
              form.elements.arrival.value ? `Arrival: ${form.elements.arrival.value}` : "",
              form.elements.departure.value ? `Departure: ${form.elements.departure.value}` : "",
              form.elements.details.value.trim() ? `Details: ${form.elements.details.value.trim()}` : "",
            ]);

      const result = openWhatsApp(message);
      if (note) {
        note.hidden = false;
        note.innerHTML = "";
        const text = document.createElement("p");
        text.className = "micro";
        text.textContent =
          currentLang === "ar"
            ? "لو واتساب مافتحش، اضغط هنا: "
            : "If WhatsApp did not open, tap here: ";
        const link = document.createElement("a");
        link.href = result.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = currentLang === "ar" ? "فتح واتساب" : "Open WhatsApp";
        link.style.color = "var(--gold)";
        text.appendChild(link);
        note.appendChild(text);
      }
    });
  }

  /* Car filters -------------------------------------------- */

  function initFilters() {
    const chips = $$("[data-filter]");
    if (!chips.length) return;
    const cards = $$("[data-category]");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.getAttribute("data-filter");
        chips.forEach((item) => {
          item.classList.toggle("is-active", item === chip);
          item.setAttribute("aria-pressed", String(item === chip));
        });
        cards.forEach((card) => {
          const categories = (card.getAttribute("data-category") || "").split(/\s+/);
          const show = filter === "all" || categories.includes(filter);
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* Gallery ------------------------------------------------ */

  function openGallery(title, images, trigger) {
    const modal = $("#galleryModal");
    if (!modal || !images.length) return;
    lastGalleryTrigger = trigger || null;
    galleryImages = images;
    galleryIndex = 0;

    const heading = $("#galleryTitle", modal);
    if (heading) heading.textContent = title;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    renderGallery();

    const close = $(".modal-close", modal);
    if (close) close.focus();
  }

  function renderGallery() {
    const image = $("#galleryImage");
    const count = $("#galleryCount");
    if (image) {
      image.src = galleryImages[galleryIndex];
      image.alt = "";
    }
    if (count) count.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  }

  function closeGallery() {
    const modal = $("#galleryModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastGalleryTrigger) lastGalleryTrigger.focus();
  }

  function stepGallery(delta) {
    if (!galleryImages.length) return;
    galleryIndex = (galleryIndex + delta + galleryImages.length) % galleryImages.length;
    renderGallery();
  }

  function initGallery() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-images]");
      if (trigger) {
        event.preventDefault();
        const images = (trigger.getAttribute("data-images") || "").split("|").filter(Boolean);
        openGallery(trigger.getAttribute("data-title") || "", images, trigger);
        return;
      }

      const modal = $("#galleryModal");
      if (!modal || !modal.classList.contains("is-open")) return;

      if (event.target.closest("[data-gallery-close]") || event.target === modal) {
        closeGallery();
        return;
      }
      if (event.target.closest("[data-gallery-prev]")) stepGallery(-1);
      if (event.target.closest("[data-gallery-next]")) stepGallery(1);
    });

    document.addEventListener("keydown", (event) => {
      const modal = $("#galleryModal");
      if (!modal || !modal.classList.contains("is-open")) return;
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") stepGallery(-1);
      if (event.key === "ArrowRight") stepGallery(1);
      if (event.key === "Tab") {
        const focusable = $$(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          modal
        ).filter((el) => !el.disabled && el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* Service request buttons -------------------------------- */

  function initRequestButtons() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-request]");
      if (!trigger) return;
      event.preventDefault();

      const item =
        currentLang === "ar"
          ? trigger.getAttribute("data-request-ar") || trigger.getAttribute("data-request")
          : trigger.getAttribute("data-request");

      const message =
        currentLang === "ar"
          ? `مرحبًا كراون جيت، أرغب في طلب ${item}.`
          : `Hello CrownGate, I would like to request ${item}.`;

      openWhatsApp(message);
    });
  }

  /* Booking date limits ------------------------------------ */

  function initDateLimits() {
    const form = $("#bookingForm");
    if (!form) return;

    const today = new Date().toISOString().split("T")[0];
    const arrival = form.elements.arrival;
    const departure = form.elements.departure;

    if (arrival) arrival.min = today;
    if (departure) departure.min = today;

    if (arrival && departure) {
      arrival.addEventListener("change", () => {
        if (arrival.value) departure.min = arrival.value;
      });
    }
  }

  /* Misc --------------------------------------------------- */

  function initYear() {
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function init() {
    applyLanguage(storedLang(), false);
    initHeader();
    initReveal();
    initQuickRequest();
    initBookingForm();
    initRequestButtons();
    initDateLimits();
    initFilters();
    initGallery();
    initYear();

    const switchButton = $(".lang-switch");
    if (switchButton) switchButton.addEventListener("click", toggleLanguage);

    window.__cgReady = true;

    // Compatibility for the dormant noindex pages that still use inline handlers.
    window.toggleLanguage = toggleLanguage;
    window.toggleMenu = function () {
      const nav = $("#primaryNav");
      const toggle = $("#menuToggle");
      if (!nav || !toggle) return;
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
