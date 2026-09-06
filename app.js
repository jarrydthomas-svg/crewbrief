(function () {
  "use strict";

  const videos = Array.isArray(window.CREWBRIEF_VIDEOS) ? window.CREWBRIEF_VIDEOS : [];
  const documents = Array.isArray(window.CREWBRIEF_DOCUMENTS) ? window.CREWBRIEF_DOCUMENTS : [];
  const dialog = document.querySelector("#video-dialog");
  const player = document.querySelector("#youtube-player");
  const search = document.querySelector("#document-search");
  const categoryList = document.querySelector("#document-categories");
  const allDocuments = "All documents";
  let activeDocumentCategory = allDocuments;

  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"></path></svg>';

  function safeText(value) { return String(value ?? ""); }
  function thumbnailUrl(id) { return `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`; }

  function openVideo(video) {
    document.querySelector("#dialog-title").textContent = safeText(video.title);
    document.querySelector("#dialog-category").textContent = safeText(video.category);
    document.querySelector("#dialog-description").textContent = safeText(video.description);
    player.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?autoplay=1&rel=0`;
    dialog.showModal();
  }

  function closeVideo() {
    player.src = "";
    if (dialog.open) dialog.close();
  }

  function buildVideoCard(video) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "video-card";
    card.setAttribute("aria-label", `Play ${safeText(video.title)}`);
    card.innerHTML = `
      <span class="thumbnail">
        <img src="${thumbnailUrl(video.youtubeId)}" alt="" loading="lazy">
        <span class="play-icon">${playIcon}</span>
        <span class="duration">${safeText(video.duration)}</span>
      </span>
      <span class="card-copy">
        <span class="card-category">${safeText(video.category)}</span>
        <h3>${safeText(video.title)}</h3>
        <p>${safeText(video.description)}</p>
        <span class="watch-label">Watch briefing →</span>
      </span>`;
    card.addEventListener("click", () => openVideo(video));
    return card;
  }

  function renderVideoGroup(category, gridId, countId, emptyId) {
    const items = videos.filter((video) => video.category === category);
    const grid = document.querySelector(gridId);
    grid.replaceChildren(...items.map(buildVideoCard));
    document.querySelector(countId).textContent = `${items.length} ${items.length === 1 ? "video" : "videos"}`;
    document.querySelector(emptyId).hidden = items.length !== 0;
  }

  function documentBadge(category) {
    if (category === "Hazard Assessments") return "HA";
    if (category === "Policies & Guidelines") return "POL";
    if (category === "Competencies") return "COMP";
    if (category === "Safety Resources") return "INFO";
    return "SOP";
  }

  function buildDocumentLink(item) {
    const link = document.createElement("a");
    link.className = "document-link";
    // GitHub's browser uploader places the supplied PDFs at the repository root.
    // Strip the original package folder so the live links match their published location.
    link.href = encodeURI(item.file.replace(/^documents\//, ""));
    link.target = "_blank";
    link.rel = "noopener";

    const badge = document.createElement("span");
    badge.className = "document-badge";
    badge.textContent = documentBadge(item.category);

    const copy = document.createElement("span");
    const title = document.createElement("span");
    title.className = "document-title";
    title.textContent = item.title;
    const type = document.createElement("small");
    type.className = "document-type";
    type.textContent = item.category;
    copy.append(title, type);

    const arrow = document.createElement("span");
    arrow.className = "document-open";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(badge, copy, arrow);
    return link;
  }

  function renderFixedDocuments(category, listId, countId) {
    const items = documents.filter((document) => document.category === category)
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
    document.querySelector(listId).replaceChildren(...items.map(buildDocumentLink));
    document.querySelector(countId).textContent = `${items.length} ${items.length === 1 ? "document" : "documents"}`;
  }

  function libraryDocuments() {
    return documents.filter((document) => !["Policies & Guidelines", "Competencies"].includes(document.category));
  }

  function renderDocumentCategories() {
    const categories = [allDocuments, ...new Set(libraryDocuments().map((document) => document.category))];
    categoryList.replaceChildren(...categories.map((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `category-button${category === activeDocumentCategory ? " active" : ""}`;
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === activeDocumentCategory));
      button.addEventListener("click", () => {
        activeDocumentCategory = category;
        renderDocumentCategories();
        renderDocuments();
      });
      return button;
    }));
  }

  function renderDocuments() {
    const query = search.value.trim().toLowerCase();
    const items = libraryDocuments()
      .filter((document) => activeDocumentCategory === allDocuments || document.category === activeDocumentCategory)
      .filter((document) => `${document.title} ${document.category}`.toLowerCase().includes(query))
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
    document.querySelector("#document-list").replaceChildren(...items.map(buildDocumentLink));
    document.querySelector("#document-count").textContent = `${items.length} ${items.length === 1 ? "document" : "documents"}`;
    document.querySelector("#document-empty").hidden = items.length !== 0;
  }

  document.querySelector("#close-dialog").addEventListener("click", closeVideo);
  dialog.addEventListener("click", (event) => { if (event.target === dialog) closeVideo(); });
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeVideo(); });
  search.addEventListener("input", renderDocuments);

  renderVideoGroup("Safety Bulletins", "#bulletin-grid", "#bulletin-count", "#bulletin-empty");
  renderVideoGroup("Training Videos", "#training-grid", "#training-count", "#training-empty");
  renderFixedDocuments("Policies & Guidelines", "#policy-list", "#policy-count");
  renderFixedDocuments("Competencies", "#competency-list", "#competency-count");
  renderDocumentCategories();
  renderDocuments();
}());
