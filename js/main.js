/* =========================================================================
   창성씨앤씨건설 — 메인 페이지 시안 JS
   anime.js v4.5.0 전역 API 확인 결과(번들 직접 검증):
     animate, createTimeline, stagger, svg.createDrawable, onScroll, utils, set, eases
   ========================================================================= */
(function () {
  "use strict";

  var anime = window.anime;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var animate = anime.animate;
  var createTimeline = anime.createTimeline;
  var stagger = anime.stagger;
  var createDrawable = anime.svg.createDrawable;
  var onScroll = anime.onScroll;
  var setNow = anime.set;

  /* -----------------------------------------------------------------------
     헤더 / 모바일 메뉴
     ----------------------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  var hamburger = document.getElementById("hamburgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");

  function setHeaderTone(tone) {
    if (tone === "light") header.classList.add("tone-light");
    else header.classList.remove("tone-light");
  }

  function openMobileMenu() {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "메뉴 닫기");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "메뉴 열기");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", function () {
    if (mobileMenu.classList.contains("is-open")) closeMobileMenu();
    else openMobileMenu();
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMobileMenu);
  });

  /* -----------------------------------------------------------------------
     스크롤 진행 눈금자
     ----------------------------------------------------------------------- */
  var TICK_COUNT = 48;
  var rulerTicksEl = document.getElementById("rulerTicks");
  var ticks = [];
  for (var i = 0; i < TICK_COUNT; i++) {
    var t = document.createElement("div");
    t.className = "ruler-tick";
    rulerTicksEl.appendChild(t);
    ticks.push(t);
  }

  /* -----------------------------------------------------------------------
     통합 스크롤 감시 루프 (rAF 스로틀, 읽기→쓰기 분리)
     헤더 톤 + 눈금자 활성 눈금을 매 프레임 한 번씩만 계산한다.
     ----------------------------------------------------------------------- */
  var toneSections = Array.prototype.slice.call(document.querySelectorAll(".section")).map(function (s) {
    return { el: s, dark: s.classList.contains("section--dark") };
  });
  var servicesEl = document.getElementById("services");
  var servicesProgress = 0; // services 섹션 자체 배경 전환에 사용(아래 onScroll 콜백이 갱신)

  var scrollTicking = false;
  function onScrollFrame() {
    scrollTicking = false;
    var headerH = header.offsetHeight;
    var refY = headerH + 2;

    // 읽기
    var current = null;
    for (var i = 0; i < toneSections.length; i++) {
      var rect = toneSections[i].el.getBoundingClientRect();
      if (rect.top <= refY && rect.bottom > refY) {
        current = toneSections[i];
        break;
      }
    }
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var scrollFrac = docH > 0 ? window.scrollY / docH : 0;

    // 쓰기
    if (current) {
      if (current.el === servicesEl) {
        setHeaderTone(servicesProgress > 0.5 ? "light" : "dark");
      } else {
        setHeaderTone(current.dark ? "dark" : "light");
      }
    }
    var activeIdx = Math.round(scrollFrac * (TICK_COUNT - 1));
    for (var j = 0; j < TICK_COUNT; j++) {
      ticks[j].classList.toggle("is-active", j === activeIdx);
    }
  }
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });
  onScrollFrame();

  /* =========================================================================
     3.1 히어로 — 도면 그리기 타임라인
     ========================================================================= */
  (function heroInit() {
    var heroSvg = document.getElementById("heroSvg");
    var scanGroup = heroSvg.querySelector(".hero-scan");
    var scanCaption = document.getElementById("scanCaption");
    var defectMarkers = Array.prototype.slice.call(heroSvg.querySelectorAll(".defect-marker"));
    var crackPath = heroSvg.querySelector(".defect-crack");

    // 스캔 이동 범위(도면 좌표 기준): 옥상(238) → 1층 바닥 부근(650)
    var SCAN_TOP = 238, SCAN_BOTTOM = 650;
    var SWEEP = SCAN_BOTTOM - SCAN_TOP;

    if (prefersReduced) {
      // 최종 프레임으로 즉시 고정: 모든 선이 그려진 상태, 마커 표시, 스캔 정지
      setNow(createDrawable("#heroSvg .hero-structure line"), { draw: "0 1" });
      setNow(createDrawable("#heroSvg .hero-windows rect, #heroSvg .hero-windows line"), { draw: "0 1" });
      setNow(createDrawable("#heroSvg .hero-pilotis rect, #heroSvg .hero-pilotis line"), { draw: "0 1" });
      setNow(createDrawable("#heroSvg .hero-hatch line"), { draw: "0 1" });
      setNow(createDrawable("#heroSvg .hero-dimension line"), { draw: "0 1" });
      if (crackPath) setNow(createDrawable(crackPath), { draw: "0 1" });
      defectMarkers.forEach(function (m) { m.style.opacity = 1; });
      scanGroup.style.opacity = 0;
      scanCaption.classList.add("is-visible");
      return;
    }

    var tl = createTimeline({ defaults: { ease: "inOutQuad" } });
    tl.add(createDrawable("#heroSvg .hero-structure line"), {
      draw: ["0 0", "0 1"], duration: 650, delay: stagger(28)
    }, 0);
    tl.add(createDrawable("#heroSvg .hero-windows rect, #heroSvg .hero-windows line"), {
      draw: ["0 0", "0 1"], duration: 450, delay: stagger(12)
    }, 480);
    tl.add(createDrawable("#heroSvg .hero-pilotis rect, #heroSvg .hero-pilotis line"), {
      draw: ["0 0", "0 1"], duration: 400, delay: stagger(15)
    }, 620);
    tl.add(createDrawable("#heroSvg .hero-dimension line"), {
      draw: ["0 0", "0 1"], duration: 350, delay: stagger(8)
    }, 780);
    tl.add(createDrawable("#heroSvg .hero-hatch line"), {
      draw: ["0 0", "0 1"], duration: 550, delay: stagger(2), ease: "linear"
    }, 700);

    var markersRevealed = false;

    tl.then(function () {
      setTimeout(function () { startScanCycle(true); }, 150); // 구조 드로잉 마무리 후 여백
    });

    function startScanCycle(loop) {
      setNow(scanGroup, { opacity: 1, translateY: 0 });
      var firstRun = !markersRevealed;

      if (firstRun) {
        markersRevealed = true;
        defectMarkers.forEach(function (m) {
          var y = parseFloat(m.querySelector(".defect-dot").getAttribute("cy"));
          var frac = Math.min(Math.max((y - SCAN_TOP) / SWEEP, 0), 1);
          var delayMs = frac * 1100;
          setTimeout(function () {
            animate(m, { opacity: [0, 1], duration: 250, ease: "outQuad" });
            if (m.id === "defect-02") {
              animate(createDrawable("#heroSvg .defect-crack"), {
                draw: ["0 0", "0 1"], duration: 350, ease: "outQuad"
              });
            }
          }, delayMs);
        });
      }

      animate(scanGroup, {
        translateY: [0, SWEEP],
        duration: 1300,
        ease: "inOutQuad",
        onComplete: function () {
          animate(scanGroup, {
            opacity: [1, 0],
            duration: 300,
            onComplete: function () {
              if (firstRun) {
                scanCaption.classList.add("is-visible");
              }
              if (loop) setTimeout(function () { startScanCycle(true); }, 8000);
            }
          });
        }
      });
    }
  })();

  /* =========================================================================
     3.2 분해 도해 — 시공분야 (스크롤 연동: anime.onScroll sync)
     ========================================================================= */
  (function servicesInit() {
    var wrap = document.getElementById("servicesStickyWrap");
    var svg = document.getElementById("explodedSvg");
    var head = document.querySelector(".services__head");
    if (!wrap || !svg) return;
    // 지오메트리와 라벨은 별도 그룹(같은 data-id)으로 분리돼 있다 — 지오메트리를 전부
    // 먼저 그린 뒤 라벨을 맨 위에 그려서, 뒤 부품의 불투명한 면이 앞 부품의 라벨 글자를
    // 가리는 문제를 막는다. 부품마다 분해 방향(dx,dy,dz, 평면 좌표계)이 다르므로
    // 화면 이동 벡터는 아이소 투영식으로 직접 계산한다(§H1).
    var geoParts = Array.prototype.slice.call(svg.querySelectorAll(".iso-part-geo"));
    var labelParts = Array.prototype.slice.call(svg.querySelectorAll(".iso-part-label"));
    var EXPLODE_MAG = 150; // 대지 좌표 단위 — exploded_svg3.py 의 GAP 문서화 값과 맞춘다
    var COS30 = Math.cos(Math.PI / 6), SIN30 = Math.sin(Math.PI / 6);

    function isoVec(dx, dy, dz) {
      return { x: (dx - dy) * COS30, y: (dx + dy) * SIN30 - dz };
    }

    // 지시선 길이 캐시 + 초기 은닉
    var leadData = labelParts.map(function (layer) {
      var leads = Array.prototype.slice.call(layer.querySelectorAll(".iso-lead"));
      var no = layer.querySelector(".iso-label-no");
      var name = layer.querySelector(".iso-label-name");
      var bg = layer.querySelector(".iso-label-bg");
      var lens = leads.map(function (l) {
        var len = l.getTotalLength ? l.getTotalLength() : 40;
        l.style.strokeDasharray = len;
        l.style.strokeDashoffset = len;
        return len;
      });
      var vec = isoVec(
        parseFloat(layer.dataset.ex) || 0,
        parseFloat(layer.dataset.ey) || 0,
        parseFloat(layer.dataset.ez) || 0
      );
      return { leads: leads, lens: lens, no: no, name: name, bg: bg, vec: vec };
    });
    var geoVecs = geoParts.map(function (layer) {
      return isoVec(
        parseFloat(layer.dataset.ex) || 0,
        parseFloat(layer.dataset.ey) || 0,
        parseFloat(layer.dataset.ez) || 0
      );
    });

    function lerpColor(hexA, hexB, t) {
      var a = parseInt(hexA.slice(1), 16), b = parseInt(hexB.slice(1), 16);
      var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
      var br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
      var r = Math.round(ar + (br - ar) * t);
      var g = Math.round(ag + (bg - ag) * t);
      var bl = Math.round(ab + (bb - ab) * t);
      return "rgb(" + r + "," + g + "," + bl + ")";
    }

    // §A4: 다크→라이트 배경 전환은 섹션 스크롤의 첫 15% 안에 끝낸다. 나머지 85%는
    // 라이트 배경에서 부품 분해(explodeProgress)만 진행한다.
    var BG_END = 0.15;

    function applyProgress(p) {
      var bgP = Math.min(Math.max(p / BG_END, 0), 1);
      var explodeP = Math.min(Math.max((p - BG_END) / (1 - BG_END), 0), 1);
      servicesProgress = bgP; // 헤더 톤 전환도 이 시점(첫 15%)에 맞춰 함께 끝난다

      var bgColor = lerpColor("#1b1d20", "#e6e4df", bgP);
      wrap.style.setProperty("--sv-bg", bgColor);
      // 텍스트/보조선 색은 배경 중간 회색 구간에서 대비가 무너지는 것을 막기 위해
      // 중간값을 거치지 않고 스냅 전환한다(전환 자체는 CSS transition으로 부드럽게 보인다).
      var darkPhase = bgP < 0.5;
      wrap.style.setProperty("--sv-text", darkPhase ? "#eceae5" : "#1b1d20");
      wrap.style.setProperty("--sv-muted", darkPhase ? "#9ea2a8" : "#6b6a66");
      wrap.style.setProperty("--sv-line", darkPhase ? "#4a4e54" : "#9a9892");

      geoParts.forEach(function (layer, idx) {
        var v = geoVecs[idx];
        var dx = v.x * EXPLODE_MAG * explodeP, dy = v.y * EXPLODE_MAG * explodeP;
        layer.setAttribute("transform", "translate(" + dx.toFixed(2) + "," + dy.toFixed(2) + ")");
      });

      labelParts.forEach(function (layer, idx) {
        var ld = leadData[idx];
        var dx = ld.vec.x * EXPLODE_MAG * explodeP, dy = ld.vec.y * EXPLODE_MAG * explodeP;
        layer.setAttribute("transform", "translate(" + dx.toFixed(2) + "," + dy.toFixed(2) + ")");

        ld.leads.forEach(function (l, li) {
          var len = ld.lens[li];
          l.style.strokeDashoffset = String(len * (1 - explodeP));
        });
        // 라벨은 부품이 충분히 분리된 뒤에야 나타난다(§A3). 05(코어)는 이동량이 0이라
        // explodeP 자체로 동일하게 게이트한다.
        var visible = explodeP > 0.32;
        if (ld.no) ld.no.classList.toggle("is-visible", visible);
        if (ld.name) ld.name.classList.toggle("is-visible", visible);
        if (ld.bg) ld.bg.classList.toggle("is-visible", visible);
      });

      // §E2: 그림이 화면을 채우기 시작하면(분해 시작) 제목 아래 설명 문단을 페이드아웃해
      // 라벨과 겹치지 않게 한다. 라벨(모노 라벨+H2)은 계속 보인다.
      // 모바일은 도해가 헤드 아래 별도 블록이라 겹칠 일이 없으므로 항상 펼쳐 보여준다.
      if (head) head.classList.toggle("is-compact", explodeP > 0.1 && !isMobile);
    }

    var isMobile = window.matchMedia("(max-width: 899px)").matches;

    if (prefersReduced || isMobile) {
      // 모바일: sticky 스크롤 연동 대신 정지된 분해 상태 1장, 라벨은 도해에서 숨기고
      // 아래 목록으로만 제공한다(§3.2 모바일 대체 규칙, §A5). CSS 미디어쿼리가 라벨을
      // 숨기므로 여기서는 배경/분해만 최종 상태로 고정하면 된다.
      applyProgress(1);
      return;
    }

    applyProgress(0);
    onScroll({
      target: wrap,
      sync: true,
      enter: "top top",
      leave: "bottom bottom",
      onUpdate: function (self) { applyProgress(self.progress); }
    });
  })();

  /* =========================================================================
     3.3 핵심 업무 3가지 — 진입 시 stagger 페이드업 + 아이콘 드로잉
     ========================================================================= */
  (function diagnosisInit() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".diagnosis-card"));
    if (!cards.length) return;

    function reveal(card) {
      var icons = card.querySelectorAll(".icon-draw");
      if (prefersReduced) {
        setNow(card, { opacity: 1, translateY: 0 });
        setNow(createDrawable(icons), { draw: "0 1" });
        return;
      }
      animate(card, { opacity: [0, 1], translateY: [24, 0], duration: 600, ease: "outExpo" });
      animate(createDrawable(icons), {
        draw: ["0 0", "0 1"], duration: 700, delay: 150, ease: "inOutQuad"
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    cards.forEach(function (c) { io.observe(c); });
  })();

  /* =========================================================================
     3.4 하자담보책임기간 — data.js 렌더 + 막대 애니메이션 + 카운트업
     ========================================================================= */
  (function warrantyInit() {
    var meta = window.CSCON_WARRANTY_META || {};
    var rows = window.CSCON_WARRANTY || [];
    var captionEl = document.getElementById("warrantyCaption");
    var cardsEl = document.getElementById("warrantyCards");
    var tbody = document.getElementById("warrantyTbody");
    var rulerSvg = document.getElementById("warrantyRulerSvg");
    if (!cardsEl || !tbody || !rulerSvg) return;

    if (captionEl) captionEl.textContent = meta.caption || "";

    var AXIS_MAX = 10; // 년
    var X0 = 30, X1 = 970, Y = 24;
    function xFor(year) { return X0 + (year / AXIS_MAX) * (X1 - X0); }

    // ---- 가로 기간자(치수선 스타일) SVG 조립 ----
    var years = rows.map(function (r) { return parseInt(r.period, 10); }).filter(function (n) { return !isNaN(n); });
    var markerYears = years.slice().sort(function (a, b) { return a - b; });
    var svgParts = [];
    svgParts.push('<line class="ruler-axis" id="rulerAxis" x1="' + X0 + '" y1="' + Y + '" x2="' + X1 + '" y2="' + Y + '"/>');
    for (var yr = 0; yr <= AXIS_MAX; yr++) {
      if (markerYears.indexOf(yr) !== -1) continue;
      var xs = xFor(yr);
      svgParts.push('<line class="ruler-tick-sm" x1="' + xs + '" y1="' + (Y - 6) + '" x2="' + xs + '" y2="' + Y + '"/>');
    }
    svgParts.push('<text class="ruler-end-label" x="' + X0 + '" y="' + (Y + 22) + '" text-anchor="middle">0년</text>');
    markerYears.forEach(function (yr) {
      var xm = xFor(yr);
      svgParts.push(
        '<g class="ruler-marker" data-year="' + yr + '">' +
        '<line class="ruler-tick-lg" x1="' + xm + '" y1="' + (Y - 12) + '" x2="' + xm + '" y2="' + Y + '"/>' +
        '<circle class="ruler-marker-dot" cx="' + xm + '" cy="' + Y + '" r="6"/>' +
        '<text class="ruler-marker-label" x="' + xm + '" y="' + (Y + 22) + '" text-anchor="middle">' + yr + '년</text>' +
        '</g>'
      );
    });
    rulerSvg.innerHTML = svgParts.join("");

    var axisLine = document.getElementById("rulerAxis");
    var markerGroups = Array.prototype.slice.call(rulerSvg.querySelectorAll(".ruler-marker"));
    if (axisLine) {
      var axisLen = axisLine.getTotalLength ? axisLine.getTotalLength() : (X1 - X0);
      axisLine.style.strokeDasharray = axisLen;
      axisLine.style.strokeDashoffset = axisLen;
    }

    // ---- 카드 4장 + 표(sr-only) 렌더 ----
    rows.forEach(function (row) {
      var card = document.createElement("article");
      card.className = "warranty-card";
      card.dataset.value = row.percent;
      card.innerHTML =
        '<span class="warranty-card__period">' + row.period + '</span>' +
        '<div class="warranty-card__pct-wrap">' +
          '<span class="warranty-card__pct">0%</span>' +
          '<span class="warranty-card__pct-label">보증금 반환비율</span>' +
        '</div>' +
        '<hr class="warranty-card__divider">' +
        '<p class="warranty-card__items">' + row.items + '</p>';
      cardsEl.appendChild(card);

      var tr = document.createElement("tr");
      tr.innerHTML =
        '<th scope="row">' + row.period + '</th>' +
        '<td>' + row.percent + '%</td>' +
        '<td>' + row.items + '</td>';
      tbody.appendChild(tr);
    });

    var cardEls = Array.prototype.slice.call(cardsEl.querySelectorAll(".warranty-card"));
    if (!cardEls.length) return;

    function revealAll() {
      if (prefersReduced) {
        if (axisLine) axisLine.style.strokeDashoffset = 0;
        markerGroups.forEach(function (g) {
          g.querySelector(".ruler-marker-dot").classList.add("is-active");
          g.querySelector(".ruler-marker-label").classList.add("is-active");
        });
        cardEls.forEach(function (card) {
          card.style.opacity = 1;
          card.style.transform = "none";
          var value = parseFloat(card.dataset.value);
          card.querySelector(".warranty-card__pct").textContent = value + "%";
        });
        return;
      }

      animate(axisLine, { strokeDashoffset: 0, duration: 700, ease: "outQuad" });
      markerGroups.forEach(function (g, i) {
        setTimeout(function () {
          g.querySelector(".ruler-marker-dot").classList.add("is-active");
          g.querySelector(".ruler-marker-label").classList.add("is-active");
        }, 500 + i * 140);
      });

      cardEls.forEach(function (card, i) {
        var value = parseFloat(card.dataset.value);
        var pctEl = card.querySelector(".warranty-card__pct");
        setTimeout(function () {
          animate(card, { opacity: [0, 1], translateY: [28, 0], duration: 550, ease: "outExpo" });
          var counter = { v: 0 };
          animate(counter, {
            v: value, duration: 700, ease: "outExpo", round: 1,
            onUpdate: function () { pctEl.textContent = Math.round(counter.v) + "%"; }
          });
        }, 250 + i * 130);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealAll();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    io.observe(cardsEl);
  })();

  /* =========================================================================
     3.5 청구 절차 — 세로선 채움 + 단계 활성화 (onScroll sync) + 구비서류 토글
     ========================================================================= */
  (function processInit() {
    // id="process" 는 쓰지 않는다 — 브라우저가 id 를 가진 요소를 window.<id> 로 자동 노출하는
    // "named access" 동작 때문에 window.process 가 이 DOM 요소로 덮어써지고, anime.js 번들
    // 내부의 Node 환경 감지 코드(typeof process...)가 오작동해 이 요소를 타깃으로 한
    // anime.onScroll 의 onUpdate 콜백이 전혀 호출되지 않는 실제 버그를 이 프로젝트에서
    // 재현·확인했다. 그래서 HTML 쪽 id 를 "process-section" 으로 바꿨다.
    // §H3: 제목+8단계를 sticky 로 고정하고, 그 안에서 스크롤 진행에 따라 순서대로
    // 낙하 등장시킨다. sticky 구간(250vh)이 끝나면 고정이 풀리고 구비서류 체크리스트로
    // 이어진다(체크리스트는 별도 IntersectionObserver로 등장).
    var stickyWrap = document.getElementById("processStickyWrap");
    var trackFill = document.getElementById("processTrackFill");
    var band = document.getElementById("processBand");
    var timeline = document.getElementById("processTimeline");
    var steps = Array.prototype.slice.call(document.querySelectorAll(".process-step"));
    var checklist = document.getElementById("processChecklist");
    if (!stickyWrap || !trackFill || !band || !timeline) return;

    // §O: 제목(processHead)은 더 이상 사라지지 않고 sticky 패널 위쪽 구역에
    // 항상 고정 표시된다(§J1 폐기). 8단계는 .process__band(overflow:hidden +
    // mask-image) 안에서 #processTimeline 전체를 translateY 로 밀어 올려
    // 두루마리처럼 지나가게 한다 — 진행률의 순수 함수라 위로 스크롤하면
    // 그대로 역재생된다. 이동 거리는 실제 렌더된 높이(reel 전체 높이 - 띠
    // 높이)로 매 프레임 다시 계산해, 폰트 크기·줄바꿈이 달라져도 값을
    // 하드코딩하지 않고 항상 정확히 맞는다.
    function applyProgress(p) {
      trackFill.style.height = (p * 100) + "%";
      steps.forEach(function (step, idx) {
        var threshold = (idx + 1) / steps.length;
        step.classList.toggle("is-active", p >= threshold - 0.02);
      });
      var bandH = band.getBoundingClientRect().height;
      var reelH = timeline.scrollHeight;
      var maxShift = Math.max(0, reelH - bandH);
      timeline.style.transform = "translateY(" + (-p * maxShift).toFixed(1) + "px)";
    }

    if (prefersReduced) {
      applyProgress(1);
    } else {
      applyProgress(0);
      onScroll({
        target: stickyWrap,
        sync: true,
        // "center"를 임계값으로 쓰면 이 anime.js 빌드에서 onUpdate 콜백이 전혀 오지 않는
        // 버그를 검증 중 재현·확인했다(§F3). services 섹션에서 이미 검증된
        // "top top"/"bottom bottom" 조합으로 바꿔, wrap 상단이 뷰포트 상단에 닿을 때
        // 진행률 0, wrap 하단이 뷰포트 하단에 닿을 때 진행률 1이 되게 한다.
        enter: "top top",
        leave: "bottom bottom",
        onUpdate: function (self) { applyProgress(self.progress); }
      });
    }

    // 구비서류 체크리스트: sticky 구간이 끝난 뒤 스크롤에 들어오면 한 번에 페이드+상승.
    if (checklist) {
      if (prefersReduced) {
        checklist.classList.add("is-visible");
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              checklist.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        io.observe(checklist);
      }
    }
  })();

  /* =========================================================================
     3.7 회사소개 — 연혁 숫자 롤링
     ========================================================================= */
  (function aboutInit() {
    var timeline = document.getElementById("historyTimeline");
    if (!timeline) return;
    var nodes = Array.prototype.slice.call(timeline.querySelectorAll(".history-node"));
    var lineFill = document.getElementById("historyLineFill");
    if (!nodes.length) return;

    function rollYear(el) {
      var raw = el.dataset.year;
      if (!raw) return; // "~현재" 노드는 data-year 없음(장식)
      var parts = raw.split(".");
      var startNum = parseInt(parts[0], 10);
      var suffix = parts.length > 1 ? "." + parts[1] : "";
      if (prefersReduced) {
        el.textContent = raw;
        return;
      }
      var counter = { v: startNum - 6 };
      animate(counter, {
        v: startNum, duration: 700, ease: "outExpo", round: 1,
        onUpdate: function () { el.textContent = Math.round(counter.v) + suffix; }
      });
    }

    function reveal() {
      if (prefersReduced) {
        if (lineFill) lineFill.style.width = "100%";
        nodes.forEach(function (n) {
          n.classList.add("is-visible");
          rollYear(n.querySelector(".history-year"));
        });
        return;
      }
      if (lineFill) {
        animate(lineFill, { width: ["0%", "100%"], duration: 900, ease: "outQuad" });
      }
      nodes.forEach(function (node, i) {
        setTimeout(function () {
          node.classList.add("is-visible");
          rollYear(node.querySelector(".history-year"));
        }, i * 160);
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal();
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    io.observe(timeline);
  })();

  /* =========================================================================
     3.8 문의 — 시안 폼(실제 전송 없음)
     ========================================================================= */
  (function contactInit() {
    var btn = document.getElementById("contactSubmit");
    var notice = document.getElementById("contactNotice");
    if (!btn || !notice) return;
    btn.addEventListener("click", function () {
      notice.hidden = false;
    });
  })();

})();
