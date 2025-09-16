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

  /**
   * Skills animation with staggered delay
   */
document.addEventListener("DOMContentLoaded", function() {
  let skillSection = document.querySelector(".skills-content");
  if (skillSection) {
    let progressBars = document.querySelectorAll(".progress-bar");
    let progressContainers = document.querySelectorAll(".progress");
    let progressNotes = document.querySelectorAll(".progress-note");

progressBars.forEach((bar, index) => {
  let value = bar.getAttribute("aria-valuenow");
  setTimeout(() => {
    bar.style.width = value + "%";
    progressContainers[index].classList.add("visible");
    if (progressNotes[index]) {
      progressNotes[index].classList.add("visible");
    }
  }, index * 400); // 每个延迟 0.4 秒
});

    function checkScroll() {
      let sectionPos = skillSection.getBoundingClientRect().top;
      let screenPos = window.innerHeight;

      if (sectionPos < screenPos - 100) {
        showProgress();
        window.removeEventListener("scroll", checkScroll);
      }
    }

    window.addEventListener("scroll", checkScroll);
  }
});

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
            console.warn('Carousel reset failed:', err);
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
    speed: 400,
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

// ⭐ Portfolio 部分进入视口时隐藏 navbar  
document.addEventListener("scroll", function () {
  const navbar = document.querySelector("#navbar");
  const portfolio = document.querySelector("#portfolio");

  if (!navbar || !portfolio) return;

  const portfolioRect = portfolio.getBoundingClientRect();

  // 判断是否有任何部分进入视口
  const inViewport = portfolioRect.top < window.innerHeight && portfolioRect.bottom > 0;

  if (inViewport) {
    navbar.classList.add("hidden"); // 隐藏
  } else {
    navbar.classList.remove("hidden"); // 显示
  }
});

})(); 

