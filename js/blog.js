class BlogActions {
  constructor() {
    this.init();
    this.blogLists = [];
    this.container = document.querySelector('[data-blog-container]');
    this.closeBtn = document.querySelector('[data-blog-close-btn]');
    this.overlay = document.querySelector('[data-blog-overlay]');
    this.title = document.querySelector('[data-blog-title]');
    this.desc = document.querySelector('[data-blog-desc]');
    this.img = document.querySelector('[data-blog-img]');
    this.details = document.querySelector('[data-blog-details]');
    this.time = document.querySelector('[data-blog-time]');
  }

  async init() {
    try {
      let data = [];
      data = await fetch('./mocks/blogs.json')
        .then((res) => res.json())
        .catch((err) => []);

      this.blogLists = data;
      this.renderBlogs(data);

      if (location.hash === '#blog' && location.search) {
        // open modal blog detail if exist
        const article = data.find((item) => location.search.includes(this.convertSlug(item.title)));
        if (!article) return;

        setTimeout(() => {
          const articleSlug = this.convertSlug(article.title);
          const newUrl = `?article=${articleSlug}#blog`;
          history.pushState(null, null, newUrl);

          this.displayArticleContent(article);
        }, 500);
      }

      // register event click to close modal
      this.closeArticle();
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  renderBlogs(data) {
    const blogContainer = document.querySelector('.blog-posts-list');
    if (data.length) {
      data.forEach((blog) => {
        const blogHtml = `
          <li class="blog-post-item">
            <figure class="blog-banner-box">
              <img src="${blog.imageUrl}" alt="${blog.title}" loading="lazy" />
            </figure>
            <div class="blog-content">
              <div class="blog-meta">
                <p class="blog-category">${blog.tag.toUpperCase()}</p>
                <span class="dot"></span>
                <time datetime="${blog.createAt}">${blog.createAt}</time>
              </div>
              <h3 class="h3 blog-item-title">${blog.title}</h3>
              <p class="blog-text">${blog.description}</p>
            </div>
          </li>
        `;
        blogContainer.innerHTML += blogHtml;
      });

      const blogItems = document.querySelectorAll('.blog-post-item');
      blogItems &&
        blogItems.forEach((element, index) => {
          element.addEventListener('click', () => this.loadArticle(index));
        });
    } else {
      blogContainer.innerHTML += '<h3 class="h3 blog-item-title">No Blog Here</h3>';
    }
  }

  convertSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }

  toggleArticle() {
    this.container.classList.toggle('active');
    this.overlay.classList.toggle('active');
  }

  closeArticle() {
    this.closeBtn.addEventListener('click', () => {
      this.toggleArticle();
      this.clearSearchParams();
    });
    this.overlay.addEventListener('click', () => {
      this.toggleArticle();
      this.clearSearchParams();
    });
  }

  displayArticleContent(article) {
    this.toggleArticle();

    // handle render content in modal
    this.title.textContent = article.title;
    this.desc.textContent = article.description;
    this.details.textContent = article.content;
    this.img.src = article.imageUrl;
    this.img.alt = article.title;
    this.img.alt = article.title;
    this.time.textContent = article.createAt;
  }

  loadArticle(indexData) {
    const article = this.blogLists.find((_, index) => index === indexData) || {};
    if (!article) return null;

    const articleSlug = this.convertSlug(article.title);
    const newUrl = `?article=${articleSlug}#blog`;
    history.pushState(null, null, newUrl);

    this.displayArticleContent(article);
  }

  clearSearchParams() {
    const url = new URL(window.location);
    url.search = '';
    history.replaceState(null, '', url);
  }
}

/**
 * handle more action
 */
document.addEventListener('DOMContentLoaded', () => {
  new BlogActions();
});
