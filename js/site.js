// arpadherbut.com: small progressive enhancements (the site works without JS).
(function () {
  document.documentElement.classList.add("js");

  // Mobile menu
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.hasAttribute("data-open");
      if (open) header.removeAttribute("data-open");
      else header.setAttribute("data-open", "");
      toggle.setAttribute("aria-expanded", String(!open));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.hasAttribute("data-open")) {
        header.removeAttribute("data-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Detail dialogs (portfolio)
  function openDialog(id) {
    var d = document.getElementById(id);
    if (d && typeof d.showModal === "function" && !d.open) d.showModal();
  }
  document.querySelectorAll("[data-dialog]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openDialog(btn.getAttribute("data-dialog"));
      history.replaceState(null, "", "#" + btn.getAttribute("data-dialog"));
    });
  });
  document.querySelectorAll("dialog.detail").forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target === d) d.close(); // click on the backdrop
    });
    d.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", function () {
        d.close();
      });
    });
    d.addEventListener("close", function () {
      if (location.hash === "#" + d.id) history.replaceState(null, "", location.pathname);
    });
  });
  // Deep link: /portfolio#joby opens that role
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target && target.tagName === "DIALOG") openDialog(target.id);
  }

  // Fade sections in as they scroll into view
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
