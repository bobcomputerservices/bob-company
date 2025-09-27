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
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

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
      console && console.log('Anchor fix -> scrolled to', id, 'finalTop:', finalTop);
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

// AutoCount Swipers
new Swiper('.portfolio-slider', {
  speed: 800,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

// Training Swipers
new Swiper('.training-swiper', {
  speed: 800,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});  

// Events Swipers
new Swiper('.events-swiper', {
  speed: 800,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
}); 

// Our Clients Swipers
new Swiper('.clients-swiper', {
  speed: 800,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});   

document.addEventListener('DOMContentLoaded', () => {
  let blogContainer = document.querySelector('.entries');
  if (blogContainer) {
    let iso = new Isotope(blogContainer, {
      itemSelector: '.entry',
      layoutMode: 'vertical'
    });

    // Categories click
    let categoryLinks = document.querySelectorAll('.categories a');
    categoryLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        categoryLinks.forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        iso.arrange({ filter: this.getAttribute('data-filter') });
      });
    });

    // Count posts per category
    document.querySelectorAll('.categories li a').forEach(link => {
      let filter = link.getAttribute('data-filter');
      let count;
      if (filter === '*') {
        count = blogContainer.querySelectorAll('.entry').length;
      } else {
        count = blogContainer.querySelectorAll(filter).length;
      }
      link.querySelector('.count').textContent = '(' + count + ')';
    });

    // Generate Recent Posts (latest 5 by date)
    let posts = Array.from(blogContainer.querySelectorAll('.entry'));
    posts.sort((a, b) => {
      let dateA = new Date(a.querySelector('time').getAttribute('datetime'));
      let dateB = new Date(b.querySelector('time').getAttribute('datetime'));
      return dateB - dateA; // newest first
    });

    let recentContainer = document.querySelector('.recent-posts');
    if (recentContainer) {
      recentContainer.innerHTML = ''; // clear existing
      posts.slice(0, 5).forEach(post => {
        let img = post.querySelector('.entry-img img').getAttribute('src');
        let title = post.querySelector('.entry-title').textContent;
        let date = post.querySelector('time').textContent;

        let item = document.createElement('div');
        item.classList.add('post-item', 'clearfix');
        item.innerHTML = `
          <img src="${img}" alt="">
          <h4><a href="#">${title}</a></h4>
          <time>${date}</time>
        `;
        recentContainer.appendChild(item);
      });
    }
  }
});

// Load More button
let allPosts = Array.from(blogContainer.querySelectorAll('.entry'));
let visibleCount = 6; // 默认显示前6篇
allPosts.forEach((post, index) => {
  if (index >= visibleCount) {
    post.style.display = "none";
  }
});

let loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    let hiddenPosts = allPosts.filter(post => post.style.display === "none");
    hiddenPosts.slice(0, 6).forEach(post => post.style.display = "block");

    // 触发 Isotope 重新布局
    iso.arrange();

    // 如果没有更多隐藏文章，隐藏按钮
    if (allPosts.every(post => post.style.display === "block")) {
      loadMoreBtn.style.display = "none";
    }
  });
}

})(); // 结束 IIFE
