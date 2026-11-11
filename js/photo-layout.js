(() => {
  'use strict';
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const credits = window.photoCredits;
  const photo = (key, caption, position='50% 50%') => {
    const c = credits[key];
    return `<figure class="slide-photo" data-photo="${key}"><img src="assets/photos/${c.file}" alt="${escape(caption)}" style="object-position:${position}" width="1280" height="850"><figcaption><span>${escape(caption)}</span><small><a href="${escape(c.page)}" target="_blank" rel="noopener" title="${escape(c.author)}">${escape(c.shortAuthor || c.author)}</a> / ${c.license_url ? `<a href="${escape(c.license_url)}" target="_blank" rel="noopener">${escape(c.license)}</a>` : escape(c.license)}</small></figcaption></figure>`;
  };
  function edit(n, change) {
    const t=document.createElement('template');t.innerHTML=window.slides[n-1].body;
    change(t.content);window.slides[n-1].body=t.innerHTML;
  }
  function intoPanels(n,items) {
    edit(n,root=>{
      root.firstElementChild.classList.add('photo-panels');
      root.querySelectorAll('.panel').forEach((panel,i)=>panel.insertAdjacentHTML('afterbegin',photo(...items[i])));
    });
  }
  function intoCards(n,items) {
    edit(n,root=>{
      root.querySelector('.grid').classList.add('photo-cards');
      root.querySelectorAll('.card').forEach((card,i)=>card.insertAdjacentHTML('afterbegin',photo(...items[i])));
    });
  }
  function split(n,key,caption,extra='') {
    const s=window.slides[n-1];
    s.body=`<div class="photo-split ${extra}"><div class="photo-copy">${s.body}</div>${photo(key,caption)}</div>`;
  }
  function backdrop(n,key,caption) {
    const s=window.slides[n-1];
    s.body=`<div class="photo-backdrop">${photo(key,caption)}</div><div class="backdrop-copy">${s.body}</div>`;
  }

  backdrop(1,'sulawesi-coast','술라웨시 탕코코의 숲과 해안, 고론탈로 조사 현장과 구분');
  intoPanels(2,[['power-plant','이탈리아 바이오매스 발전소 예시'],['clearcut','영국 침엽수림 벌채지 예시']]);
  split(4,'pellet-machine','목재펠릿 압축 설비 예시','equipment-split');
  intoCards(6,[['pellets','목질계: 압축한 목재펠릿'],['rice-husk','농업 잔재: 인도네시아 왕겨 이용 현장'],['food-waste','유기성 폐기물: 음식물 잔재 예시']]);
  window.slides[6].body=`<div class="photo-process">${photo('chipping','나미비아의 목재 파쇄 작업 예시','50% 58%')}<div>${window.slides[6].body}</div></div>`;
  split(8,'pellet-storage','스위스 목재펠릿 저장시설 예시','storage-split');
  split(9,'pellet-truck','목재펠릿 운송차량 예시, 고론탈로 운송 현장과 구분','supply-photo');
  intoPanels(17,[['sulawesi-forest','술라웨시 숲의 식생 예시'],['plantation','라틴아메리카의 줄지어 심은 티크 조림지']]);
  split(19,'logs','벌채한 원목의 탄소 저장과 연료 이용','carbon-photo');
  split(22,'forest-residues','핀란드의 벌채 잔재 수집 예시','reference-photo');
  intoCards(25,[['sawdust','목재 가공 과정에서 발생한 톱밥'],['java-plantation','인도네시아 자바의 티크 조림지'],['rainforest-canopy','열대림의 수관과 하층 식생 예시']]);
  backdrop(30,'forest-canopy-top','열대림 수관 예시, 고론탈로 조사 현장과 구분');

  // Turn the geographic context into an explicit analytical step.
  const terrain=`<figure class="terrain-evidence"><svg viewBox="0 350 3840 1300" role="img" aria-label="고론탈로 지표면 고도. 내륙의 산지와 남쪽 해안의 저지대, 검은 고론탈로주 경계와 빨간 포후와토군 경계"><image href="assets/maps/s13b_terrain.png" width="3840" height="2160"/></svg></figure>`;
  const s=window.slides[12];
  s.body=`<div class="mapframe terrain-analysis"><div class="maptabs" role="group" aria-label="지도 선택"><button type="button" data-map="0" aria-pressed="true">산림 피복</button><button type="button" data-map="1" aria-pressed="false">지형</button></div><div class="mapviews"><div class="mapview">${fig('2021년 산림 피복','s13a_landcover.png')}</div><div class="mapview" hidden>${terrain}</div></div><p class="terrain-legend">2021년 피복 / 지표면 고도(m) / 검은 선: 고론탈로주 / 빨간 선: 포후와토군</p><div class="terrain-points"><section><h3>지역의 지형</h3>${bullets(['내륙 산지와 남쪽 해안 저지대','산림 손실의 위치를 해석할 배경'])}</section><section><h3>산림의 토양 보호</h3>${bullets(['낙엽층과 뿌리가 토양을 보호','벌채와 지표 교란 시 토양 유실 가능'])}</section><section><h3>벌채 뒤 확인할 영향</h3>${bullets(['경사지와 하천 주변의 손실 여부','하천 토사 유입과 하류 수질 변화'])}</section></div><p class="terrain-takeaway">같은 벌채 면적이라도 위치에 따라 영향이 달라질 수 있다</p><p class="terrain-limit">토양과 수질 영향은 추가 확인 대상. 이 지도만으로 실제 피해나 경사도, 하천 흐름을 확정할 수 없음.</p></div>`;
  s.source='ESA WorldCover 2021 / Copernicus DEM / 일반 원리: FAO Forest and water';
  window.slides[30].body+=`<p class="photo-source-link"><a href="assets/photos/credits.html" target="_blank" rel="noopener">사진 18장의 원문, 저작자와 이용 조건</a> / <a href="https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-and-water" target="_blank" rel="noopener">13번 산림과 토양 보호의 근거: FAO</a></p>`;
})();
