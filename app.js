(function () {
  "use strict";

  const videos = Array.isArray(window.CREWBRIEF_VIDEOS) ? window.CREWBRIEF_VIDEOS : [];
  const grid = document.querySelector("#video-grid");
  const categoryList = document.querySelector("#category-list");
  const count = document.querySelector("#video-count");
  const emptyState = document.querySelector("#empty-state");
  const dialog = document.querySelector("#video-dialog");
  const player = document.querySelector("#youtube-player");
  const closeButton = document.querySelector("#close-dialog");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogCategory = document.querySelector("#dialog-category");
  const dialogDescription = document.querySelector("#dialog-description");
  const allCategory = "All training";
  let activeCategory = allCategory;

  const playIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7z"></path>
    </svg>`;

  function safeText(value) {
    return String(value ?? "");
  }

  function thumbnailUrl(videoId) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
  }

  function categories() {
    return [allCategory, ...new Set(videos.map((video) => video.category).filter(Boolean))];
  }

  function renderCategories() {
    categoryList.replaceChildren();

    categories().forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `category-button${category === activeCategory ? " active" : ""}`;
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === activeCategory));
      button.addEventListener("click", () => {
        activeCategory = category;
        renderCategories();
        renderVideos();
      });
      categoryList.append(button);
    });
  }

  function openVideo(video) {
    const id = encodeURIComponent(video.youtubeId);
    dialogTitle.textContent = safeText(video.title);
    dialogCategory.textContent = safeText(video.category);
    dialogDescription.textContent = safeText(video.description);
    player.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    dialog.showModal();
  }

  function closeVideo() {
    player.src = "";
    dialog.close();
  }

  function buildCard(video) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "video-card";
    card.setAttribute("aria-label", `Play ${safeText(video.title)}`);

    const thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";

    const image = document.createElement("img");
    image.src = thumbnailUrl(video.youtubeId);
    image.alt = "";
    image.loading = "lazy";

    const play = document.createElement("span");
    play.className = "play-icon";
    play.innerHTML = playIcon;

    const duration = document.createElement("span");
    duration.className = "duration";
    duration.textContent = safeText(video.duration);

    const copy = document.createElement("span");
    copy.className = "card-copy";

    const category = document.createElement("span");
    category.className = "card-category";
    category.textContent = safeText(video.category);

    const title = document.createElement("h3");
    title.textContent = safeText(video.title);

    const description = document.createElement("p");
    description.textContent = safeText(video.description);

    const watch = document.createElement("span");
    watch.className = "watch-label";
    watch.textContent = "Watch briefing →";

    thumbnail.append(image, play, duration);
    copy.append(category, title, description, watch);
    card.append(thumbnail, copy);
    card.addEventListener("click", () => openVideo(video));
    return card;
  }

  function renderVideos() {
    const visible = activeCategory === allCategory
      ? videos
      : videos.filter((video) => video.category === activeCategory);

    grid.replaceChildren(...visible.map(buildCard));
    count.textContent = `${visible.length} ${visible.length === 1 ? "video" : "videos"}`;
    emptyState.hidden = visible.length !== 0;
  }

  closeButton.addEventListener("click", closeVideo);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeVideo();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeVideo();
  });

  renderCategories();
  renderVideos();
}());
