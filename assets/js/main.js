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
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

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
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

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
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
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

/**
 * Smart Sticky Header + Anchor Scroll Fix - 修复版
 */

// 全局初始化函数
window.initStickyHeader = function() {
  const header = document.querySelector("#header");
  if (!header) return;

  // 清除旧的监听器
  if (window._stickyScrollHandler) {
    window.removeEventListener("scroll", window._stickyScrollHandler);
  }

  // 重置滚动记录
  window._lastScrollY = window.scrollY;

  // 新的滚动处理函数
  window._stickyScrollHandler = function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY === 0) {
      // 在顶部时显示header
      header.classList.remove("hidden");
    } else if (currentScrollY > window._lastScrollY && currentScrollY > 100) {
      // 向下滚动超过100px时隐藏
      header.classList.add("hidden");
    } else if (currentScrollY < window._lastScrollY) {
      // 向上滚动时显示
      header.classList.remove("hidden");
    }
    
    window._lastScrollY = currentScrollY;
  };

  // 添加滚动监听
  window.addEventListener("scroll", window._stickyScrollHandler, { passive: true });

  // 🔥 关键修复：根据当前滚动位置立即设置header状态
  if (window.scrollY === 0) {
    header.classList.remove("hidden");
  } else {
    // 如果不在顶部，根据滚动方向决定显示/隐藏
    header.classList.add("hidden"); // 默认先隐藏
  }

  console.log("Sticky header initialized, scrollY:", window.scrollY);
};

// 强制显示header
window.forceShowHeader = function() {
  const header = document.querySelector("#header");
  if (!header) return;

  header.classList.remove("hidden");
  console.log("Header forced to show");
};

document.addEventListener("DOMContentLoaded", function() {
  // 初始初始化
  window.initStickyHeader();

  const header = document.querySelector("#header");
  if (!header) return;

  // 设置scroll-padding
  const offset = header.offsetHeight;
  document.documentElement.style.scrollPaddingTop = offset + "px";

  const contactEl = document.querySelector("#contact");
  if (contactEl) {
    contactEl.style.scrollMarginTop = (offset + 20) + "px";
  }
});

// 🔥 关键修复：处理页面跳转回来的情况
window.addEventListener("pageshow", function(e) {
  console.log("pageshow event, persisted:", e.persisted, "scrollY:", window.scrollY);
  
  // 立即强制显示header
  window.forceShowHeader();
  
  // 短暂延迟后重新初始化并模拟滚动事件
  setTimeout(() => {
    window.initStickyHeader();
    
    // 🔥 关键：手动触发滚动事件来激活sticky逻辑
    if (window.scrollY > 0) {
      // 保存当前滚动位置
      const currentScroll = window.scrollY;
      
      // 轻微滚动1像素来触发事件
      window.scrollTo(window.scrollX, currentScroll + 1);
      
      // 立即滚回原位置（用户不会察觉）
      setTimeout(() => {
        window.scrollTo(window.scrollX, currentScroll);
        console.log("Scroll event simulated");
      }, 10);
    }
  }, 100);
});

// 其他事件监听
window.addEventListener("focus", function() {
  setTimeout(() => {
    window.initStickyHeader();
  }, 30);
});

window.addEventListener("popstate", function() {
  window.forceShowHeader();
  setTimeout(() => {
    window.initStickyHeader();
  }, 100);
});

// 添加手动重置函数（用于调试）
window.resetStickyHeader = function() {
  window.forceShowHeader();
  window.initStickyHeader();
  console.log("Sticky header manually reset");
};

})(); // 结束 IIFE
