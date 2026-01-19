/**
* Template Name: Arsha - v4.3.0
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  let header = select('#header');
  let offset = header.offsetHeight;

  let elementPos = select(el).offsetTop;
  window.scrollTo({
    top: elementPos - offset,
    behavior: 'smooth'
  });
};

/**
 * Scroll with offset on links with a class name .scrollto
 * Works for both "#section" and "index.html#section"
 */
on('click', '.scrollto', function(e) {
  let targetHash = this.hash;

  // 如果 this.hash 为空，就尝试从 href 解析
  if (!targetHash && this.getAttribute('href')) {
    let href = this.getAttribute('href');
    let parts = href.split('#');
    if (parts.length > 1) {
      targetHash = '#' + parts[1];
    }
  }

  if (targetHash && select(targetHash)) {
    e.preventDefault();

    // 移动端菜单收起
    let navbar = select('#navbar');
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      let navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }

    // 平滑滚动
    scrollto(targetHash);
  }
}, true);

/**
 * Scroll with offset on page load with hash links in the url
 */
window.addEventListener('load', () => {
  if (window.location.hash && select(window.location.hash)) {
    scrollto(window.location.hash);
  }
});

// 动态给 section 设置 scroll-margin-top
window.addEventListener('load', () => {
  const header = document.querySelector('#header');
  if (!header) return;

  const offset = header.offsetHeight;
  document.querySelectorAll('section[id]').forEach(section => {
    section.style.scrollMarginTop = offset + 'px';
  });
});
  
  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   * (this is for same-page anchors)
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)
 
  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  
  /* ======= Skills animation (staggered, auto-trigger on scroll, safe) ======= */
  (function() {
    // wait until DOM parsed
    document.addEventListener('DOMContentLoaded', function() {
      const skillSection = document.querySelector('.skills-content');
      if (!skillSection) return; // 没有 skills section 就退出

      const progressBars = skillSection.querySelectorAll('.progress-bar');
      const progressContainers = skillSection.querySelectorAll('.progress');
      const progressNotes = skillSection.querySelectorAll('.progress-note');

      let animated = false; // 只动画一次

      function showProgress() {
        if (animated) return;
        animated = true;

        progressBars.forEach((bar, index) => {
          const value = bar.getAttribute('aria-valuenow') || bar.dataset.value || 0;
          setTimeout(() => {
            if (bar) bar.style.width = value + '%';
            if (progressContainers[index]) progressContainers[index].classList.add('visible');
            if (progressNotes[index]) progressNotes[index].classList.add('visible');
          }, index * 400);
        });
      }

      function checkScroll() {
        const rect = skillSection.getBoundingClientRect();
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;

        // 当区块有任何部分进入视口时触发
        if (rect.top < screenHeight - 100) {
          showProgress();
          window.removeEventListener('scroll', checkScroll);
          window.removeEventListener('resize', checkScroll);
        }
      }

      // 绑定监听器并立即检查一次（以防页面初始就处于可见位置）
      window.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      checkScroll();
    });
  })();


/**
 * Portfolio isotope and filter
 */
window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      filter: '.filter-autocount' // 默认显示 AutoCount & Customized Plugins
    });

    // 初始化时，确保图片加载完成再布局
    imagesLoaded(portfolioContainer, function() {
      portfolioIsotope.arrange({ filter: '.filter-autocount' });
      portfolioIsotope.layout();
      AOS.refresh();
    });

    let portfolioFilters = select('#portfolio-flters li', true);

    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      const filterValue = this.getAttribute('data-filter');
      portfolioIsotope.arrange({ filter: filterValue });

      // ⭐ 关键：延迟执行 -> 重置 carousel & 等图片加载再强制 layout
      setTimeout(() => {
        // 1. 重置可见的 carousel 到第一张，避免横图导致高度塌陷
        const visibleCarousels = portfolioContainer.querySelectorAll(
          '.portfolio-item:not(.isotope-hidden) .carousel'
        );
        visibleCarousels.forEach(c => {
          let instance = bootstrap.Carousel.getInstance(c);
          if (!instance) {
            instance = new bootstrap.Carousel(c, { interval: 3000, pause: 'hover' });
          }
          try {
            instance.to(0);
          } catch (err) {
            // ignore
          }
        });

        // 2. 等可见图片加载完，再强制 layout
        imagesLoaded(portfolioContainer, { background: true }, function() {
          portfolioIsotope.layout();
          setTimeout(() => {
            portfolioIsotope.layout();
            AOS.refresh();
          }, 150);
        });
      }, 200); // 延迟 200ms 可视情况调大/调小
    }, true);

    // * Navigation menu - Portfolio dropdown menu (放在同一作用域，portfolioIsotope 可用)
    document.querySelectorAll('#navbar .dropdown a[data-filter]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        let filterValue = this.getAttribute('data-filter');

        // Isotope 过滤
        portfolioIsotope.arrange({ filter: filterValue });

        // Tabs highlight 同步
        const filterItems = document.querySelectorAll('#portfolio-flters li');
        filterItems.forEach(el => el.classList.remove('filter-active'));

        const targetItem = document.querySelector(`#portfolio-flters li[data-filter="${filterValue}"]`);
        if (targetItem) targetItem.classList.add('filter-active');

        // 平滑滚动
        document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // 读取 tab 的函数（支持 query string 或 hash 中的 ?tab=...）
    function getTabFromUrl() {
      // 1) 优先读取 ?tab=...（search）
      const params = new URLSearchParams(window.location.search);
      if (params.has('tab')) return params.get('tab');

      // 2) 如果没有，从 hash 中解析（例如 "#portfolio?tab=training" 或 "#?tab=training"）
      if (window.location.hash) {
        const hash = window.location.hash; // e.g. "#portfolio?tab=training"
        const qIndex = hash.indexOf('?');
        if (qIndex !== -1) {
          const queryString = hash.slice(qIndex + 1); // "tab=training"
          const p = new URLSearchParams(queryString);
          if (p.has('tab')) return p.get('tab');
        }
      }

      return null;
    }

    // ====== 支持 ?tab=... 参数 ======
    const tab = getTabFromUrl();
    if (tab) {
      const targetFilter = `.filter-${tab}`;
      const targetItem = document.querySelector(`#portfolio-flters li[data-filter="${targetFilter}"]`);

      if (targetItem) {
        // 延迟执行，确保 isotope 初始化和图片加载完成
        setTimeout(() => {
          // 切换高亮
          document.querySelectorAll('#portfolio-flters li').forEach(el => el.classList.remove('filter-active'));
          targetItem.classList.add('filter-active');

          // 切换 Isotope filter
          portfolioIsotope.arrange({ filter: targetFilter });

          // 等图片加载完成，再强制 layout
          imagesLoaded(portfolioContainer, function() {
            portfolioIsotope.layout();
            AOS.refresh();
            // 平滑滚动到 portfolio
            document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
          });
        }, 400); // 延迟 400ms，可以按需调大/调小
      }
    }


  }
});


  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /* ====== Reliable anchor fix that waits for layout/images (works for child->index hash navigation) ====== */
(function(){
  // use select helper if available
  const $header = (typeof select === 'function') ? select('#header') : document.querySelector('#header');
  if (!$header) return;

  function doScrollToTarget(hash) {
    if (!hash) return;
    const id = hash.split('?')[0];
    const target = document.querySelector(id);
    if (!target) return;

    const offset = $header.offsetHeight || 0;
    const computeAndScroll = () => {
      const rectTop = target.getBoundingClientRect().top + window.scrollY;
      const finalTop = Math.max(0, rectTop - offset - 8); // small buffer
      // use instant jump first to avoid browser auto-anchor glitches, then smooth
      window.scrollTo({ top: finalTop, behavior: 'smooth' });
    };

    // If imagesLoaded available, wait for body images to finish then scroll
    if (typeof imagesLoaded === 'function') {
      imagesLoaded(document.querySelector('body'), { background: true }, function() {
        // give Isotope/AOS a moment
        setTimeout(computeAndScroll, 120);
      });
    } else {
      // fallback: retry loop until layout stabilizes (max attempts)
      let tries = 0;
      const retry = () => {
        tries++;
        // if body height looks reasonable or we've tried enough times, proceed
        if (document.body.clientHeight > 200 || tries > 12) {
          setTimeout(computeAndScroll, 80);
        } else {
          setTimeout(retry, 150);
        }
      };
      retry();
    }
  }

  // Single entry that we call on load/pageshow/hashchange
  function handleAnchorFix() {
    // only if there is a hash
    if (!window.location.hash) return;
    doScrollToTarget(window.location.hash);
  }

  // Run on load/pageshow/hashchange -- these cover child->index navigation, back/forward and manual hash changes
  window.addEventListener('load', handleAnchorFix);
  window.addEventListener('pageshow', handleAnchorFix);
  window.addEventListener('hashchange', handleAnchorFix);

  // Optional: expose for manual debugging
  window.__doAnchorFix = handleAnchorFix;
})();

/* ====== Blog logic (with smart Recent Posts + auto header offset) ====== */
document.addEventListener("DOMContentLoaded", function() {
  const entriesContainer = document.querySelector("#blog-entries");
  if (!entriesContainer) return; // ✅ 防止在 index.html 报错
  
  const allEntries = Array.from(entriesContainer.querySelectorAll("article.entry"));
  const categoriesList = document.querySelector("#categories-list");
  const recentPostsContainer = document.querySelector("#recent-posts");
  const loadMoreBtn = document.querySelector("#load-more");
  const loadMoreWrapper = document.querySelector("#load-more-wrapper");

  let visibleCount = 20;

  // ===== Render entries =====
  function renderEntries() {
    allEntries.forEach((entry, idx) => {
      entry.style.display = idx < visibleCount ? "" : "none";
    });
    loadMoreWrapper.style.display = visibleCount >= allEntries.length ? "none" : "block";
  }

  // ===== Update categories =====
  function updateCategories() {
    const counts = { products: 0, autocount: 0, training: 0, events: 0, clients: 0 };
    allEntries.forEach(e => {
      const cat = e.dataset.category;
      if (cat && counts[cat] !== undefined) counts[cat]++;
    });

    // 更新分类数量
    categoriesList.querySelectorAll("a").forEach(a => {
      const cat = a.dataset.filter;
      if (cat === "all") {
        a.querySelector(".count").textContent = `(${allEntries.length})`;
      } else {
        a.querySelector(".count").textContent = `(${counts[cat] || 0})`;
      }
    });

    // 更新标题后的总数
    const totalCount = allEntries.length;
    const catTitle = document.querySelector(".sidebar-title");
    if (catTitle && catTitle.textContent.includes("Categories")) {
      catTitle.innerHTML = `Categories <span class="count">(${totalCount})</span>`;
    }
  }

  // ===== Render Recent Posts =====
  function renderRecentPosts() {
    const sorted = [...allEntries].sort((a, b) => {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    });
    recentPostsContainer.innerHTML = "";
    sorted.slice(0, 4).forEach(post => {
      // 取得文章缩略图（支持 YouTube iframe 自动转 thumbnail）
      let imgTag = post.querySelector(".entry-img img");
      let iframeTag = post.querySelector(".entry-img iframe");
      let img = "";
      
      if (imgTag) {
        // 文章有图片 → 用图片
        img = imgTag.src;
      } 
      else if (iframeTag) {
        // 文章是视频 → 自动抓 YouTube Thumbnail
        const src = iframeTag.src;
        const match = src.match(/embed\/([^?]+)/);
      
        if (match) {
          const videoId = match[1];
          img = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        } else {
          // fallback（如果未来遇到不是 YouTube 的 iframe）
          img = "assets/img/blog/default.jpg";
        }
      } 
      else {
        // 既不是图片也不是视频 → fallback
        img = "assets/img/blog/default.jpg";
      }

      const title = post.querySelector(".entry-title").textContent;
      const id = post.id || title.trim().toLowerCase().replace(/\s+/g, "-");

      // 确保每篇文章都有 id
      if (!post.id) post.id = id;

      const div = document.createElement("div");
      div.className = "post-item clearfix";
      div.innerHTML = `
        <img src="${img}" alt="">
        <h4><a href="#${id}" class="recent-link">${title}</a></h4>
      `;
      recentPostsContainer.appendChild(div);
    });

    // === Recent Posts 点击事件 ===
    const links = recentPostsContainer.querySelectorAll(".recent-link");
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          const category = target.dataset.category;

          // 自动过滤到对应分类
          allEntries.forEach(entry => {
            entry.style.display = entry.dataset.category === category ? "" : "none";
          });
          loadMoreWrapper.style.display = "none";

          // 高亮分类按钮
          categoriesList.querySelectorAll("a").forEach(a => {
            a.classList.toggle("active", a.dataset.filter === category);
          });

          // 自动检测 header 高度
          const header = document.querySelector(".header");
          const headerOffset = header ? header.clientHeight : 80;

          // 平滑滚动到目标文章（自动补偿 header 高度）
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  // === 🔍 Search filter ===
  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const keyword = this.value.toLowerCase();
      allEntries.forEach(entry => {
        const title = entry.querySelector(".entry-title").textContent.toLowerCase();
        const bodyParagraphs = Array.from(entry.querySelectorAll("p"));
        const bodyText = bodyParagraphs.map(p => p.textContent.toLowerCase()).join(" ");
        entry.style.display = (title.includes(keyword) || bodyText.includes(keyword)) ? "" : "none";
      });
      loadMoreWrapper.style.display = "none";
    });
  }

  // ===== Category filtering =====
  categoriesList.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (link) {
      e.preventDefault();
      const filter = link.dataset.filter;

      categoriesList.querySelectorAll("a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");

      if (filter === "all") {
        allEntries.forEach(entry => entry.style.display = "");
        renderEntries();
      } else {
        allEntries.forEach(entry => {
          entry.style.display = entry.dataset.category === filter ? "" : "none";
        });
        loadMoreWrapper.style.display = "none";
      }
    }
  });

  // ===== Load More =====
  loadMoreBtn.addEventListener("click", e => {
    e.preventDefault();
    visibleCount += 20;
    renderEntries();
  });

  // ===== Init =====
  renderEntries();
  updateCategories();
  renderRecentPosts();
});

/* ===== Auto-generate VideoObject schema for blog videos ===== */
document.addEventListener("DOMContentLoaded", function () {
  const articles = document.querySelectorAll("article.entry");

  articles.forEach(article => {
    const iframe = article.querySelector("iframe[src*='youtube.com/embed']");
    if (!iframe) return;

    const videoIdMatch = iframe.src.match(/embed\/([^\?&]+)/);
    if (!videoIdMatch) return;

    const videoId = videoIdMatch[1];
    const titleEl = article.querySelector(".entry-title");
    const date = article.dataset.date || "2026-01-01";

    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": titleEl ? titleEl.textContent.trim() : "BOB Computer Services Video",
      "description": titleEl ? titleEl.textContent.trim() : "Video by BOB Computer Services",
      "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      "uploadDate": date,
      "embedUrl": `https://www.youtube.com/embed/${videoId}`,
      "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
      "publisher": {
        "@type": "Organization",
        "name": "BOB Computer Services",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bob.com.my/assets/img/logo.png"
        }
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
});
  
})(); // 结束 IIFE
