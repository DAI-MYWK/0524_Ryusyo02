// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// ========================================
// 初期設定とローディング
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  setupScrollEffects();
  setupNavigation();
  setupScrollProgress();
  setupParallaxEffects();
  setupFloatingElements();
});

// ========================================
// 初期アニメーション設定
// ========================================
function initializeAnimations() {
  // ヒーローセクションのアニメーション
  const heroTimeline = gsap.timeline();

  heroTimeline
    .to(".hero-badge", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(
      ".title-line1",
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.6"
    )
    .to(
      ".title-line2",
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.8"
    )
    .to(
      ".hero-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.6"
    )
    .to(
      ".hero-stats",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .to(
      ".hero-cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .to(
      ".scroll-indicator",
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.2"
    );

  // 世界地図のアニメーション
  initializeWorldMapAnimations();

  // ナビゲーションの初期状態
  gsap.set(".navbar", { y: -100 });
  gsap.to(".navbar", { y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
}

// ========================================
// 世界地図アニメーション
// ========================================
function initializeWorldMapAnimations() {
  // 地図の地域を順次表示
  gsap.fromTo(
    "#china",
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1.5, delay: 2, ease: "back.out(1.7)" }
  );

  gsap.fromTo(
    "#vietnam",
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1.5, delay: 2.3, ease: "back.out(1.7)" }
  );

  gsap.fromTo(
    "#thailand",
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1.5, delay: 2.6, ease: "back.out(1.7)" }
  );

  gsap.fromTo(
    "#japan",
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 1.5, delay: 2.9, ease: "back.out(1.7)" }
  );

  // 接続線のアニメーション（遅延実行）
  setTimeout(() => {
    animateConnectionLines();
  }, 4000);

  // パーティクルアニメーション
  setTimeout(() => {
    animateParticles();
  }, 5000);
}

function animateConnectionLines() {
  const lines = document.querySelectorAll(".connection-line");

  lines.forEach((line, index) => {
    gsap.to(line, {
      opacity: 1,
      duration: 2,
      delay: index * 0.5,
      ease: "power2.out",
    });

    // 線の描画アニメーション
    const pathLength = line.getTotalLength();
    line.style.strokeDasharray = pathLength + " " + pathLength;
    line.style.strokeDashoffset = pathLength;

    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 2,
      delay: index * 0.5,
      ease: "power2.inOut",
    });
  });
}

function animateParticles() {
  const particles = document.querySelectorAll(".particle");

  particles.forEach((particle, index) => {
    gsap.to(particle, {
      opacity: 1,
      duration: 0.5,
      delay: index * 0.3,
      ease: "power2.out",
    });

    // パーティクルの移動アニメーション
    const particleTimeline = gsap.timeline({ repeat: -1 });

    particleTimeline
      .to(particle, {
        x: "+=50",
        y: "+=20",
        duration: 2,
        ease: "power1.inOut",
      })
      .to(particle, {
        x: "-=50",
        y: "-=20",
        duration: 2,
        ease: "power1.inOut",
      });
  });
}

// ========================================
// スクロールエフェクト - 新セクション対応
// ========================================
function setupScrollEffects() {
  // セクションタイトルのアニメーション
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.fromTo(
      title,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // フェードインアニメーション
  gsap.utils.toArray(".fade-in-up").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // 企業理念セクション（豪華版）のアニメーション
  const philosophyTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".philosophy-section",
      start: "top 85%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
  });

  philosophyTimeline
    .fromTo(
      ".floating-text",
      { opacity: 0, scale: 0.5, y: 50 },
      {
        opacity: 0.7,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      }
    )
    .fromTo(
      ".philosophy-particles .particle",
      { opacity: 0, scale: 0 },
      {
        opacity: 0.6,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      },
      "-=0.6"
    )
    .fromTo(
      ".philosophy-motto",
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(
      ".motto-underline",
      { width: 0 },
      { width: "120px", duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".philosophy-vision, .philosophy-goal",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
      "-=0.5"
    )
    .fromTo(
      ".stat-box",
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      },
      "-=0.4"
    )
    .fromTo(
      ".philosophy-image-enhanced",
      { opacity: 0, scale: 0.8, rotationY: -20 },
      {
        opacity: 1,
        scale: 1,
        rotationY: -5,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.7"
    );

  // 一貫物流システムセクション（ヒーロー風）のアニメーション
  const businessTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".business-section-hero",
      start: "top 85%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
  });

  businessTimeline
    .fromTo(
      ".floating-concept",
      { opacity: 0, scale: 0.5, y: 50 },
      {
        opacity: 0.8,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
      }
    )
    .fromTo(
      ".business-particle",
      { opacity: 0, scale: 0 },
      {
        opacity: 0.7,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    )
    .fromTo(
      ".flow-card",
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.4"
    )
    .fromTo(
      ".bottom-stat-item",
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      },
      "-=0.3"
    );

  // サービスセクション（ヒーロー風）のアニメーション
  const serviceTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".service-section-hero",
      start: "top 85%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
  });

  serviceTimeline
    .fromTo(
      ".floating-service",
      { opacity: 0, scale: 0.5, y: 40 },
      {
        opacity: 0.8,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
      }
    )
    .fromTo(
      ".service-particle",
      { opacity: 0, scale: 0 },
      {
        opacity: 0.6,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    )
    .fromTo(
      ".premium-card",
      { opacity: 0, y: 100, rotationY: 15 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.4"
    );

  // 拠点セクション（モダン版）のアニメーション
  gsap.utils.toArray(".facility-modern-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
        rotationY: index % 2 === 0 ? -15 : 15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // お問い合わせフォーム（フォーム版）のアニメーション
  const contactTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact-section-form",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  contactTimeline
    .fromTo(
      ".contact-intro",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      ".contact-form",
      { opacity: 0, y: 80, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".form-group",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
      "-=0.6"
    )
    .fromTo(
      ".contact-alternative",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

  // 会社概要の詳細アニメーション
  gsap.utils.toArray(".detail-item").forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        x: -60,
        rotationX: -20,
      },
      {
        opacity: 1,
        x: 0,
        rotationX: 0,
        duration: 0.6,
        delay: index * 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // フォーカス効果の追加
  setupFormAnimations();
}

// ========================================
// フォトコラージュアニメーション
// ========================================
function setupPhotoCollageAnimations() {
  // サービスセクションのフォトコラージュ
  gsap.utils.toArray(".collage-item").forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        scale: 0.5,
        rotation: index % 2 === 0 ? -45 : 45,
      },
      {
        opacity: 0.2,
        scale: 1,
        rotation:
          item.style.transform.match(/rotate\(([^)]+)\)/)?.[1] || "0deg",
        duration: 2,
        delay: index * 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ホバー時の透明度変更
    item.addEventListener("mouseenter", () => {
      gsap.to(item, { opacity: 0.4, duration: 0.3 });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, { opacity: 0.2, duration: 0.3 });
    });
  });

  // ミッションセクションの背景画像
  gsap.utils.toArray(".bg-image").forEach((image, index) => {
    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 0.4,
        scale: 1,
        duration: 2.5,
        delay: index * 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// ========================================
// 背景レイヤーアニメーション
// ========================================
function setupBackgroundLayerAnimations() {
  // 拠点セクションの背景レイヤー
  gsap.utils.toArray(".bg-layer").forEach((layer, index) => {
    gsap.fromTo(
      layer,
      {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        rotation: index % 2 === 0 ? -15 : 15,
      },
      {
        opacity: 0.1,
        x: 0,
        rotation:
          layer.style.transform.match(/rotate\(([^)]+)\)/)?.[1] || "0deg",
        duration: 3,
        delay: index * 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".facilities-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// ========================================
// パララックス効果
// ========================================
function setupParallaxEffects() {
  // ヒーロー背景のパララックス
  gsap.to(".hero-bg-image", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // ミッション背景のパララックス
  gsap.to(".mission-bg-image", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".mission-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // セクション間の3D効果
  gsap.utils.toArray("section").forEach((section) => {
    gsap.fromTo(
      section,
      {
        rotationX: 5,
        z: -100,
      },
      {
        rotationX: 0,
        z: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });
}

// ========================================
// ナビゲーション
// ========================================
function setupNavigation() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // スクロール時のナビゲーション背景変更
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: { className: "scrolled", targets: ".navbar" },
  });

  // ハンバーガーメニュー（モバイル対応）
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // メニューリンククリック時にメニューを閉じる
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // メニュー外をクリックした時にメニューを閉じる
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: "power3.inOut",
        });
      }
    });
  });
}

// ========================================
// スクロール進行バー
// ========================================
function setupScrollProgress() {
  // スクロール進行バーの作成
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  // スクロール進行の計算
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      gsap.set(".scroll-progress", {
        width: self.progress * 100 + "%",
      });
    },
  });
}

// ========================================
// ホバーエフェクト - 新セクション対応
// ========================================
document.addEventListener("DOMContentLoaded", function () {
  // CTAボタンのホバーエフェクト
  gsap.utils.toArray(".cta-button").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // 新しいカードのホバーエフェクト
  gsap.utils
    .toArray(".flow-card, .premium-card, .facility-modern-card, .stat-box")
    .forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

  // 拠点カードの特別なホバーエフェクト
  gsap.utils.toArray(".facility-modern-card").forEach((card) => {
    const icon = card.querySelector(".facility-icon-modern");
    const image = card.querySelector(".facility-image-bg img");

    card.addEventListener("mouseenter", () => {
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  });
});

// ========================================
// テキストアニメーション
// ========================================
function setupTextAnimations() {
  // タイピングエフェクト
  gsap.to(".hero-title .title-line1", {
    text: "お客様と共に",
    duration: 2,
    delay: 0.5,
    ease: "none",
  });

  gsap.to(".hero-title .title-line2", {
    text: "成長する企業",
    duration: 2,
    delay: 2.5,
    ease: "none",
  });
}

// ========================================
// 背景アニメーション
// ========================================
function setupBackgroundAnimations() {
  // サービスセクションの背景アニメーション
  gsap.to(".service-background", {
    backgroundPosition: "100% 0%",
    ease: "none",
    scrollTrigger: {
      trigger: ".service-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // 会社概要セクションの背景アニメーション
  gsap.to(".company-background", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".company-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// ========================================
// レスポンシブ対応
// ========================================
function handleResize() {
  ScrollTrigger.refresh();
}

window.addEventListener("resize", handleResize);

// ========================================
// パフォーマンス最適化
// ========================================
function optimizePerformance() {
  // 画像の遅延読み込み
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// 初期化
document.addEventListener("DOMContentLoaded", function () {
  setupTextAnimations();
  setupBackgroundAnimations();
  optimizePerformance();
});

// ========================================
// カスタムカーソル効果（オプション）
// ========================================
function setupCustomCursor() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  // リンクホバー時のカーソル変更
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// デスクトップのみカスタムカーソルを有効化
if (window.innerWidth > 1024) {
  setupCustomCursor();
}

// ========================================
// フローティング要素のアニメーション - 新版
// ========================================
function setupFloatingElements() {
  // ヒーローセクションのフローティング要素
  const floatingBoxes = document.querySelectorAll(".floating-box");
  floatingBoxes.forEach((box, index) => {
    gsap.set(box, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.to(box, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 3 + index * 0.2,
      ease: "back.out(1.7)",
    });

    const speed = parseFloat(box.dataset.speed) || 1;
    gsap.to(box, {
      y: "+=30",
      rotation: "+=5",
      duration: 3 + speed,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  // 企業理念のフローティングテキスト
  const floatingTexts = document.querySelectorAll(".floating-text");
  floatingTexts.forEach((text, index) => {
    gsap.to(text, {
      y: "+=20",
      rotation: "+=2",
      duration: 4 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  // ビジネスセクションのフローティングコンセプト
  const floatingConcepts = document.querySelectorAll(".floating-concept");
  floatingConcepts.forEach((concept, index) => {
    gsap.to(concept, {
      y: "+=25",
      rotation: "+=3",
      duration: 3.5 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  // サービスセクションのフローティングサービス
  const floatingServices = document.querySelectorAll(".floating-service");
  floatingServices.forEach((service, index) => {
    gsap.to(service, {
      y: "+=30",
      rotation: "+=4",
      duration: 4.5 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });
}

// ========================================
// フォームアニメーション
// ========================================
function setupFormAnimations() {
  // フォーム要素のフォーカスアニメーション
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea"
  );

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(input.parentElement, {
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    input.addEventListener("blur", () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(input.parentElement, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // 送信ボタンのエフェクト
  const submitButton = document.querySelector(".submit-button");
  if (submitButton) {
    submitButton.addEventListener("mouseenter", () => {
      gsap.to(submitButton.querySelector("svg"), {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    submitButton.addEventListener("mouseleave", () => {
      gsap.to(submitButton.querySelector("svg"), {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
}
