function initSearch() {

  const input = document.getElementById("siteSearch");
  if (!input) return;

  const resultsBox = document.createElement("div");
  resultsBox.classList.add("search-results");
  input.parentElement.appendChild(resultsBox);

  input.addEventListener("input", function () {

    const query = this.value.toLowerCase().trim();
    resultsBox.innerHTML = "";

    if (query.length < 2) return;

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div class="search-no-result">No results found</div>`;
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

  document.addEventListener("click", function (e) {
    if (!input.contains(e.target)) {
      resultsBox.innerHTML = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", initSearch);
