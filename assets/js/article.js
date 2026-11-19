(() => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  const anchor = document.querySelector(".footer-anchor");
  if (!anchor) return;

  const fallback = () => {
    anchor.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-inner">
          <span>© Portal do Motorista</span>
          <nav class="footer-nav" aria-label="Rodapé">
            <a href="https://t.me/oppmotorista" target="_blank" rel="noopener noreferrer">Suporte</a>
          </nav>
        </div>
      </footer>
    `;
  };

  fetch("https://raw.githubusercontent.com/euoryan/euoryan.github.io/refs/heads/main/assets/pages/footer.html")
    .then((r) => (r.ok ? r.text() : Promise.reject()))
    .then((html) => {
      const temp = document.createElement("div");
      temp.innerHTML = html.trim();
      const footer = temp.querySelector("footer");
      if (footer) {
        anchor.appendChild(footer);
      } else {
        fallback();
      }
    })
    .catch(fallback);
})();
