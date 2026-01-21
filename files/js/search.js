const SEARCH_INDEX = [
  {
    title: "Anxiety Disorders",
    type: "Disorder",
    keywords: ["anxiety", "panic", "worry", "phobia", "stress"],
    url: "/disorders/anxiety/"
  },
  {
    title: "Depression",
    type: "Disorder",
    keywords: ["depression", "sad", "hopeless", "mood"],
    url: "/disorders/depression/"
  },
  {
    title: "PTSD & Trauma",
    type: "Disorder",
    keywords: ["ptsd", "trauma", "flashbacks"],
    url: "/disorders/ptsd/"
  },
  {
    title: "Eating Disorders",
    type: "Disorder",
    keywords: ["eating", "anorexia", "bulimia"],
    url: "/disorders/eating/"
  },
  {
    title: "Schizophrenia",
    type: "Disorder",
    keywords: ["schizo", "psychosis", "hallucinations"],
    url: "/disorders/schizophrenia/"
  },
  {
    title: "Substance Use Disorders",
    type: "Disorder",
    keywords: ["substance", "addiction", "drugs", "alcohol"],
    url: "/disorders/substance/"
  },

  // Articles / resources
  {
    title: "Mental Health Resources",
    type: "Resources",
    keywords: ["resources", "help", "support"],
    url: "/resources/"
  },
  {
    title: "Take Action",
    type: "Action",
    keywords: ["action", "volunteer", "pledge"],
    url: "/action/"
  }
];

function initSearchMenu() {
  const searchToggle = document.querySelector(".search-toggle");
  const searchBar = document.querySelector(".header-search");
  const searchInput = document.getElementById("siteSearch");
  const resultsBox = document.getElementById("searchResults");

  if (!searchToggle || !searchBar || !searchInput || !resultsBox || typeof SEARCH_INDEX === "undefined") {
    return;
  }

  // Toggle open
  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBar.classList.toggle("active");

    if (searchBar.classList.contains("active")) {
      searchInput.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBar.classList.remove("active");
      resultsBox.classList.remove("show");
    }
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchBar.classList.remove("active");
      resultsBox.classList.remove("show");
    }
  });

  // Live search
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    resultsBox.innerHTML = "";

    if (!query) {
      resultsBox.classList.remove("show");
      return;
    }

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.keywords.some(k => k.includes(query))
    );

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div class="no-search-results">No results found</div>`;
    } else {
      matches.slice(0, 6).forEach(item => {
        const result = document.createElement("a");
        result.href = item.url;
        result.className = "search-result";
        result.innerHTML = `
          <span class="result-title">${item.title}</span>
          <span class="result-type">${item.type}</span>
        `;
        resultsBox.appendChild(result);
      });
    }

    resultsBox.classList.add("show");
  });
}

