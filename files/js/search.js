function initSearch() {

  const searchToggle = document.querySelector(".search-toggle");
  const searchBar = document.querySelector(".header-search");
  const searchInput = document.getElementById("siteSearch");

  if (!searchToggle || !searchBar || !searchInput) return;

  searchToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBar.classList.toggle("active");

    if (searchBar.classList.contains("active")) {
      searchInput.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) &&
        !searchToggle.contains(e.target)) {
      searchBar.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchBar.classList.remove("active");
    }
  });


  const resultsBox = document.createElement("div");
  resultsBox.classList.add("search-results");
  searchBar.appendChild(resultsBox);

  searchInput.addEventListener("input", function () {
  console.log("Typing:", this.value);
    const query = this.value.toLowerCase().trim();
    resultsBox.innerHTML = "";

    if (query.length < 2) return;

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsBox.innerHTML =
        `<div class="search-no-result">No results found</div>`;
      return;
    }

    matches.forEach(match => {
      const resultItem = document.createElement("a");
      resultItem.href = match.url;
      resultItem.classList.add("search-result-item");
      resultItem.innerHTML = `
        <strong>${match.title}</strong>
        <span>${match.type}</span>
      `;
      resultsBox.appendChild(resultItem);
    });
  });

}
