// 자동 생성 데이터 파일 — assets/photos/manifest.json 기준.
// duplicate_of 가 null 인 사진만, post_title 을 '>' 로 나눠 현장(site)별로 그룹화했다.
// file:// 로 열면 fetch(manifest.json)이 CORS 로 막히므로 정적으로 내장한다(§5 요구사항).
window.CSCON_SITES = [
  {
    site: "인천서부교육지원청",
    work: "옥상방수공사",
    category: "옥상방수공사",
    photos: [{ file: "g01_w10_1.jpg", w: 800, h: 449 }, { file: "g01_w10_2.jpg", w: 800, h: 432 }, { file: "g01_w10_3.jpg", w: 800, h: 473 }, { file: "g01_w10_4.jpg", w: 800, h: 443 }, { file: "g01_w10_5.jpg", w: 800, h: 450 }]
  },
  {
    site: "인성초등학교",
    work: "옥상방수공사",
    category: "옥상방수공사",
    photos: [{ file: "g01_w7_1.jpg", w: 800, h: 450 }, { file: "g01_w7_2.jpg", w: 800, h: 433 }, { file: "g01_w7_3.jpg", w: 800, h: 450 }, { file: "g01_w7_4.jpg", w: 800, h: 450 }, { file: "g01_w7_5.jpg", w: 800, h: 450 }, { file: "g01_w7_6.jpg", w: 800, h: 450 }]
  },
  {
    site: "부인초등학교",
    work: "옥상방수공사",
    category: "옥상방수공사",
    photos: [{ file: "g01_w8_1.jpg", w: 800, h: 417 }, { file: "g01_w8_3.jpg", w: 800, h: 443 }, { file: "g01_w8_4.jpg", w: 800, h: 480 }, { file: "g01_w8_5.jpg", w: 800, h: 450 }, { file: "g01_w8_6.jpg", w: 800, h: 450 }, { file: "g06_w3_1.jpg", w: 800, h: 450 }, { file: "g06_w3_2.jpg", w: 793, h: 446 }, { file: "g06_w3_3.jpg", w: 800, h: 450 }, { file: "g06_w3_4.jpg", w: 800, h: 450 }, { file: "g06_w3_5.jpg", w: 800, h: 450 }, { file: "g06_w3_6.jpg", w: 800, h: 450 }]
  },
  {
    site: "경기경영고등학교",
    work: "옥상방수공사",
    category: "옥상방수공사",
    photos: [{ file: "g01_w9_1.jpg", w: 800, h: 450 }, { file: "g01_w9_2.jpg", w: 800, h: 450 }, { file: "g01_w9_4.jpg", w: 800, h: 450 }, { file: "g01_w9_5.jpg", w: 800, h: 450 }, { file: "g01_w9_6.jpg", w: 800, h: 462 }]
  },
  {
    site: "애풀하우스",
    work: "외벽발수공사",
    category: "외벽발수공사",
    photos: [{ file: "g02_w1_1.jpg", w: 800, h: 533 }, { file: "g02_w1_2.jpg", w: 800, h: 533 }, { file: "g02_w1_3.jpg", w: 800, h: 533 }]
  },
  {
    site: "골드빌",
    work: "옥상싱글방수",
    category: "옥상싱글방수",
    photos: [{ file: "g03_w1_1.jpg", w: 800, h: 600 }, { file: "g03_w1_2.jpg", w: 800, h: 600 }, { file: "g03_w1_4.jpg", w: 800, h: 600 }]
  },
  {
    site: "청솔리더스",
    work: "외벽실링공사",
    category: "외벽실링공사",
    photos: [{ file: "g04_w1_1.jpg", w: 800, h: 600 }]
  },
  {
    site: "엠버스빌",
    work: "외벽실링공사",
    category: "외벽실링공사",
    photos: [{ file: "g04_w2_1.jpg", w: 800, h: 600 }]
  },
  {
    site: "미래하이츠",
    work: "외벽실링공사",
    category: "외벽실링공사",
    photos: [{ file: "g04_w3_1.jpg", w: 800, h: 600 }]
  },
  {
    site: "삼성홈맨션",
    work: "단열도배공사",
    category: "단열도배공사",
    photos: [{ file: "g05_w1_1.jpg", w: 800, h: 600 }, { file: "g05_w1_2.jpg", w: 800, h: 509 }, { file: "g05_w1_3.jpg", w: 800, h: 600 }]
  },
  {
    site: "덕산초 대장분교",
    work: "기타 편의시설",
    category: "실내외 도장공사",
    photos: [{ file: "g06_w1_1.jpg", w: 800, h: 432 }, { file: "g06_w1_2.jpg", w: 800, h: 449 }, { file: "g06_w1_3.jpg", w: 800, h: 450 }]
  },
  {
    site: "덕산초등학교",
    work: "기타 편의시설",
    category: "실내외 도장공사",
    photos: [{ file: "g06_w2_1.jpg", w: 800, h: 450 }, { file: "g06_w2_2.jpg", w: 800, h: 432 }, { file: "g06_w2_4.jpg", w: 800, h: 450 }]
  },
];

// ---------------------------------------------------------------------------
// 하자담보책임기간(§3.4) 데이터 — 사용자 3차 확정본(공동주택관리법 시행령 기준, 2026-09-22 확인).
// 값을 바꿔야 할 때는 이 배열과 META 텍스트만 교체하면 막대그래프·표가 함께 갱신된다(main.js가 렌더링).
// ---------------------------------------------------------------------------
window.CSCON_WARRANTY_META = {
  caption: "공동주택관리법 시행령 기준 (전 주택건설촉진법)"
};

window.CSCON_WARRANTY = [
  { period: "2년",  percent: 15, items: "마감공사 (미장, 수장, 도장, 도배, 타일, 석공(건물내부), 옥내가구, 주방기구, 가전제품)" },
  { period: "3년",  percent: 40, items: "옥외급수·위생, 난방·냉방·환기·공기조화 설비, 급·배수 및 위생설비, 가스설비, 목공, 창호, 조경, 전기 및 전력설비, 신재생에너지 설비, 정보통신, 지능형 홈네트워크 설비, 소방시설, 단열, 잡공사" },
  { period: "5년",  percent: 25, items: "대지조성, 철근콘크리트, 철골, 조적, 지붕, 방수" },
  { period: "10년", percent: 20, items: "내력구조부 (내력벽, 기둥, 바닥, 보, 지붕틀, 주계단) 및 지반공사" }
];
