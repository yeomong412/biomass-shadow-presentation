const S=(title,chapter,body,opts={})=>({title,chapter,body,...opts});
const bullets=(items,cls='')=>`<ul class="bullet-list ${cls}">${items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const ask=text=>`<div class="slide-question">${text}</div>`;
const card=(title,detail,more='')=>`<div class="card"><h3>${title}</h3>${Array.isArray(detail)?bullets(detail,'compact'):`<p>${detail}</p>`}${more?`<span class="small">${more}</span>`:''}</div>`;
const cards=(items,cls='cols3')=>`<div class="grid ${cls}">${items.map(x=>card(...x)).join('')}</div>`;
const panel=(head,body,cls='')=>`<div class="panel ${cls}"><h3>${head}</h3>${Array.isArray(body)?bullets(body,'panel-list'):`<p>${body}</p>`}</div>`;
const fig=(label,filename,hint='')=>`<figure class="figure" data-image="${filename}"><img src="assets/maps/${filename}" alt="${label}" loading="eager" width="3840" height="2160"><div class="fallback"><span class="mapmark">⌖</span><b>${label}</b>${hint?`<small>${hint}</small>`:''}</div></figure>`;
const materialCaption=items=>`<div class="material-caption">${items.map(([label,text])=>`<p><b>${label}</b> ${text}</p>`).join('')}</div>`;
const mapSlide=(label,filename,items)=>`<div class="mapframe">${fig(label,filename)}${materialCaption(items)}</div>`;
const mapPair=(maps,items)=>`<div class="mapframe"><div class="maptabs" role="group" aria-label="지도 선택">${maps.map((m,i)=>`<button type="button" data-map="${i}" aria-pressed="${i===0}">${m[0]}</button>`).join('')}</div><div class="mapviews">${maps.map((m,i)=>`<div class="mapview" ${i?'hidden':''}>${fig(m[0],m[1])}</div>`).join('')}</div>${materialCaption(items)}</div>`;
const referenceList=(title,items)=>`<section class="reference-group"><h3>${title}</h3><ul>${items.map(([label,url,detail])=>`<li><a href="${url}" target="_blank" rel="noopener">${label}</a><span>${detail}</span></li>`).join('')}</ul></section>`;
const metric=(v,caption)=>`<div class="card"><div class="value">${v}</div><p>${caption}</p></div>`;
const q=(items)=>`<div>${items.map((x,i)=>`<div class="question"><b>0${i+1}</b><span>${x}</span></div>`).join('')}</div>`;
const steps=(items)=>`<div class="steps">${items.map((x,i)=>`${i?'<span class="step-arrow">→</span>':''}<div class="card"><span class="small">0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>`;
const graph=`<div class="graph"><svg viewBox="0 0 1150 485" role="img" aria-label="탄소부채 회복 속도 개념 그래프"><line class="axis" x1="100" y1="35" x2="100" y2="400"/><line class="axis" x1="100" y1="400" x2="1090" y2="400"/><line class="gridline" x1="100" y1="120" x2="1090" y2="120"/><line class="gridline" x1="100" y1="260" x2="1090" y2="260"/><path class="line1" d="M100 60 C320 90 410 160 600 220 S850 295 1090 365"/><path class="line2" d="M100 60 C250 180 300 310 500 390 S850 400 1090 400"/><text x="100" y="445">벌채 시점</text><text x="850" y="445">경과 시간 →</text><text x="20" y="30">탄소부채</text><text x="760" y="240" fill="#bf7251">느린 회복</text><text x="500" y="370" fill="#2f8873">빠른 회복</text></svg></div>`;
window.slides=[
S('바이오매스 발전의 편익과 산림 훼손의 공간적 분포','표지',`<div class="cover"><div class="eyebrow">BIOMASS SHADOW ATLAS</div><h1>바이오매스 발전의 편익과<br><span style="color:#aacfb5">산림 훼손의 공간적 분포</span></h1><p>인도네시아 고론탈로에서 한국과 일본까지</p></div>`,{dark:true,source:'3308 여은수'}),
S('친환경 에너지의 역설','문제 제기',`<div class="compare">${panel('소비국의 편익',['재생에너지 전력 확보','발전 실적과 에너지 전환'],'white')}<div class="versus">↔</div>${panel('생산지의 부담',['산림 전환과 생태계 변화','도로와 항만 등 지역 영향'],'white')}</div>`),
S('재생 가능성과 탄소중립','문제 제기',`<div class="cycle"><div>광합성<small>대기 중 CO₂ 흡수</small></div><div>나무 성장<small>탄소 저장</small></div><div>연료 생산<small>벌채와 가공</small></div><div>연소<small>CO₂ 배출</small></div></div><div class="ribbon" style="margin-top:32px">다시 자랄 수 있다는 사실만으로 탄소중립이 보장되지는 않는다.</div>${bullets(['배출과 재흡수 사이의 시간 차이','기존 산림을 유지했을 때와의 차이'],'inline')}`),
S('어디까지 살펴봐야 할까?','문제 제기',`<div class="two">${panel('발전소 중심 평가',['발전량과 연료 사용량','발전 단계의 배출량'],'white')}${panel('공급망 전체 평가',['원료가 생산된 산림','벌채, 가공, 수송 과정','재성장과 토지 이용 변화'],'darkpanel')}</div>`),
S('세 가지 연구 질문','문제 제기',q(['목재펠릿은 어디에서 생산되는가?','산림 변화는 어디에서 발생하는가?','발전의 편익과 환경 부담은 누구에게 돌아가는가?'])),
S('바이오매스의 종류','바이오매스의 구조',`${cards([['목질계 바이오매스',['원목과 목재펠릿','톱밥과 목재 부산물']],['농업 잔재',['볏짚과 왕겨','수확 후 남은 부산물']],['유기성 폐기물',['음식물과 가축 분뇨','바이오가스 생산']]], 'cols3')}${ask('같은 바이오매스라도 원료의 출처가 다르면?')}`),
S('목재펠릿 생산 과정','바이오매스의 구조',`${steps([['원료 확보','원목과 부산물의 구분'],['가공','파쇄, 건조, 에너지 투입'],['압축','펠릿화와 포장'],['발전','연소와 전력 생산']])}${bullets(['원료에 따라 산림 영향이 달라짐','가공과 운송에도 에너지가 필요함'],'inline')}`),
S('한국의 목재펠릿 수입 구조','바이오매스의 구조',`<div class="grid cols2">${metric('340만 t','2023년 원목 유래 목재펠릿 사용량')}${metric('98%','해당 원료의 해외 수입 비율')}</div>${bullets(['98%는 원목 유래 펠릿 340만 t 중 수입분의 비율','소비국의 연료 수요가 해외 생산지와 연결'],'inline')}`,{source:'산업통상자원부, 2024'}),
S('국경을 넘는 공급망','바이오매스의 구조',`<div class="route"><span>고론탈로 산림</span><i></i><span>목재펠릿</span><i></i><span>한국과 일본</span></div><div class="ribbon" style="margin-top:40px">연료는 이동하지만 산림 변화는 생산지에 남는다.</div>${bullets(['산림에서 원료 확보와 가공','인도네시아에서 목재펠릿 수출','한국과 일본에서 발전 연료로 소비'])}`),
S('사례 지역, 고론탈로','바이오매스의 구조',mapSlide('인도네시아 술라웨시섬과 고론탈로','s13a_landcover.png',[['위치','술라웨시섬 북부의 고론탈로주에서 빨간 경계로 표시한 포후와토군을 살펴본다.'],['분석 범위','포후와토군 경계는 16번 슬라이드의 연도별 손실 면적을 집계한 범위다.']]),{source:'ESA WorldCover 2021 / geoBoundaries'}),
S('국제 목재펠릿 무역','그림자지도의 분석',mapPair([['세계 교역','s11a_world_trade.png'],['동아시아 확대','s11b_east_asia_trade.png']],[['세계 교역','2023년 수입 신고의 순중량으로 한국과 일본의 상위 5개 공급국을 각각 골랐다.'],['동아시아 확대','주변 공급국과 인도네시아산 수입량을 확대해 보여 준다. 화살표는 교역 관계를 뜻한다.']]),{source:'UN Comtrade, 2023 HS 440131'}),
S('고론탈로에서 한국과 일본까지','그림자지도의 분석',mapSlide('목재펠릿 공급망 지도','s12_supply_chain.png',[['점과 점선','점은 랄라페항, 점선은 포후와토의 펠릿이 한국과 일본으로 수출되는 관계를 뜻한다.'],['99% 이상','2021~2023년 인도네시아 전체 펠릿 수출에서 한국과 일본이 차지한 비중이다.']]),{source:'Unheeded Warnings, 2024 / 고론탈로주 정부, 2025'}),
S('고론탈로의 산림과 지형','그림자지도의 분석',mapPair([['산림 피복','s13a_landcover.png'],['지형','s13b_terrain.png']],[['산림 피복','2021년 위성 분류 자료로 수목, 경작지 등 지표를 덮는 유형의 분포를 보여 준다.'],['지형','고도 자료의 색으로 지표면 높이(m)를 읽는다. 두 지도 모두 빨간 선은 포후와토군 경계다.']]),{source:'ESA WorldCover 2021 / Copernicus DEM GLO-30'}),
S('1,032ha의 산림 벌채','그림자지도의 분석',`<div class="two"><div class="panel white"><div class="numline">1,032<span style="font-size:44px"> ha</span></div><p>10.32 km²</p><p class="metric-caption">두 업체의 조사 면적 합계</p></div>${panel('2024년 1월~8월',['고론탈로의 BTL과 IGL 두 업체 조사','목재펠릿 생산 관련 벌채','자연림에서 단일 수종 조림지로 전환'],'white')}</div>`,{source:'Auriga Nusantara 조사, Unheeded Warnings (2024), 20쪽'}),
S('위성에서 본 산림 변화','그림자지도의 분석',mapSlide('2020년과 2024년 Sentinel-2 위성영상 비교','s15_satellite_comparison.png',[['두 시점','왼쪽 2020-02-24, 오른쪽 2024-08-11. 포후와토 서부의 같은 구역을 비교했다.'],['비교 방법','두 영상의 RGB에 같은 밝기 보정을 적용해 숲 사이에 열린 구역의 위치와 모양을 비교했다.']]),{source:'Copernicus Sentinel-2 L2A / Element 84'}),
S('산림 손실의 시간적 분포','그림자지도의 분석',mapSlide('연도별 산림 손실 지도와 면적 막대그래프','s16_forest_loss.png',[['읽는 법','지도 색은 2021~2025년 수목 피복이 사라진 해, 막대 높이는 그해의 손실 면적(ha)이다.'],['만든 법','포후와토군에서 2000년 수관율이 30% 이상이던 픽셀을 골라, 손실 연도별로 지표면 면적을 합산했다.']]),{source:'Hansen Global Forest Change v1.13 / geoBoundaries ADM2'}),
S('산림 면적과 생태계의 차이','그림자지도의 분석',`<div class="compare">${panel('자연림',['다양한 수종과 수직 구조','복잡한 서식지와 먹이망','탄소 저장과 생물다양성'],'white')}<div class="versus">≠</div>${panel('단일 수종 조림지',['특정 수종 중심의 식생','상대적으로 단순한 서식지','면적만으로 생태적 가치 비교 곤란'],'white')}</div>`),
S('편익과 부담의 그림자지도','그림자지도의 분석',mapSlide('종합 그림자지도','s18_shadow_atlas.png',[['생산지','포후와토군 전체의 관측 손실과 두 업체의 1,032ha 조사 결과를 각각 표시했다.'],['소비지','수출 연결선을 따라 한국과 일본의 발전 연료 공급과 생산지의 산림 변화를 함께 읽는다.']]),{source:'Hansen Global Forest Change / Unheeded Warnings / 고론탈로주 정부'}),
S('목재 연소와 탄소 순환','탄소중립과 환경 불평등',`${cards([['01 벌채','산림 탄소 저장량 감소'],['02 연소','저장된 탄소의 빠른 방출'],['03 재성장','시간에 따른 탄소 재흡수'],['04 비교','산림 유지 시나리오와 대조']], 'cols4')}<div class="ribbon" style="margin-top:32px">탄소는 빠르게 방출되지만 재흡수에는 시간이 필요하다.</div>${bullets(['연소 배출은 현재 발생','회복에는 장기간이 필요'],'inline')}`),
S('탄소부채와 회복 시간','탄소중립과 환경 불평등',graph+materialCaption([['읽는 법','가로축은 벌채 후 시간, 세로축은 산림을 유지했을 때와 비교한 탄소부채다.'],['만든 법','같은 출발점에서 빠른 회복과 느린 회복을 가정해 SVG 곡선 두 개로 그린 개념도다.']]),{source:'IEA Bioenergy 참고 / 발표용 개념도'}),
S('전 과정으로 평가하기','탄소중립과 환경 불평등',`${steps([['원료 생산','산림과 토지 이용 변화'],['가공','건조와 압축에 쓰인 에너지'],['수송','육상과 해상 운송'],['발전','연소와 전력 공급']])}${bullets(['토지 이용 변화는 연소량만으로 알 수 없음','원료부터 발전까지 같은 기준으로 비교'],'inline')}`),
S('비교 기준에 따라 달라지는 결과','탄소중립과 환경 불평등',`<div class="timebar"><div class="label">자연림 유지</div><div class="bar">산림 탄소 저장과 생태계 보전</div></div><div class="timebar"><div class="label">목재펠릿 생산</div><div class="bar">연료 생산과 발전 편익</div></div><div class="timebar"><div class="label">잔재 활용</div><div class="bar">기존 부산물의 에너지 활용</div></div>${ask('어떤 원료를 사용하고, 무엇과 비교하는가?')}`),
S('탄소는 어느 부문에 기록되는가?','탄소중립과 환경 불평등',`<div class="two">${panel('발전 부문',['연소 시 발생하는 생물기원 CO₂','에너지 부문에서 별도 보고'],'white')}${panel('토지 이용 부문',['산림 탄소 저장량의 변화','토지 이용과 산림 전환 반영'],'white')}</div>`,{source:'IPCC 국가 온실가스 인벤토리 지침'}),
S('편익과 부담의 분배','탄소중립과 환경 불평등',`<div class="table"><div class="head">이해관계자</div><div class="head">편익</div><div class="head">부담</div><div class="key">소비국</div><div>전력 공급</div><div>수입 의존</div><div class="key">생산기업</div><div>수출 수익</div><div>원료 확보 비용</div><div class="key">지역 주민</div><div>일부 고용과 투자</div><div>도로와 생활환경 변화</div><div class="key">산림 생태계</div><div>—</div><div>서식지 손실</div></div>${ask('전력의 편익과 환경 부담은 누구에게 돌아가는가?')}`),
S('원료에 따라 달라지는 지속가능성','대안과 결론',`${cards([['폐목재와 잔재',['기존 부산물의 활용','원료 발생 과정 확인']],['전용 조림지',['생장 기간과 수확 주기','토지 이용의 기회비용']],['자연림 유래 목재',['기존 탄소 저장량 감소','생물다양성에 미치는 영향']]], 'cols3')}${ask('연료의 이름보다 중요한 것은 원료의 출처')}`),
S('지속 가능한 공급망의 조건','대안과 결론',`${steps([['위치 확인','벌채 위치와 시기'],['원료 추적','생산과 가공 이력'],['현장 검증','위성자료와 실사'],['주민 참여','의사결정과 부담 분담']])}${bullets(['산림 변화와 원료 이력을 연결','지역 주민이 겪는 영향까지 평가'],'inline')}`),
S('한국의 정책 변화','대안과 결론',`<div class="policy"><b>01</b><span>신규 목질계 설비의 REC 지원 제한</span></div><div class="policy"><b>02</b><span>기존 설비 지원의 단계적 조정</span></div><div class="policy"><b>03</b><span>원료 관리와 수입의존도 개선</span></div>${ask('발전량뿐 아니라 원료의 지속가능성도 평가해야 할까?')}`,{source:'산업통상자원부, 2024년 개선안'}),
S('세 가지 결론','대안과 결론',q(['연료의 생산지와 소비지는 분리되어 있다.','탄소중립은 원료와 산림의 변화에 달려 있다.','지속가능성을 판단하려면 공급망 전체를 추적해야 한다.'])),
S('재생에너지의 기준','대안과 결론',`<div class="big">자연림을 제거해 만든 목재펠릿을<br><span class="orange">재생에너지로 지원해야 할까?</span></div>`,{dark:true}),
S('에너지 전환의 진짜 성과','결론',`<div class="ending"><div class="eyebrow">CONCLUSION</div><div class="big">전력의 생산량뿐 아니라<br><span class="orange">원료가 떠나온 숲의 변화</span>까지<br>살펴봐야 한다.</div></div>`,{dark:true,source:'3308 여은수'}),
S('참고문헌','출처',`<div class="references">
  ${referenceList('보고서와 정책',[
    ['산업통상자원부 (2024)','https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/169947/view','바이오매스 발전의 수입의존도 완화한다'],
    ['Earth Insight 외 (2024)','https://forourclimate.org/research/538','Unheeded Warnings, 5쪽과 20~22쪽'],
    ['고론탈로주 정부 (2025)','https://berita.gorontaloprov.go.id/2025/05/14/export-to-south-korea-and-japan-wood-pellet-from-gorontalo-on-fire/','랄라페항 목재펠릿 수출 보도'],
    ['IPCC TFI','https://www.ipcc-nggip.iges.or.jp/faq/faq.html','국가 온실가스 인벤토리 FAQ Q2-10'],
    ['IEA Bioenergy','https://www.ieabioenergy.com/iea-publications/faq/woodybiomass/carbon-neutrality/','Carbon neutrality, 산림 탄소의 회복과 비교 기준']
  ])}
  ${referenceList('지도와 그래프 데이터',[
    ['UN Comtrade (2023)','https://comtradeplus.un.org/en/','HS 440131, 한국과 일본의 목재펠릿 수입'],
    ['Hansen Global Forest Change v1.13','https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2025_v1_13','포후와토군 연도별 수목 피복 손실'],
    ['ESA WorldCover 2021 v200','https://esa-worldcover.org/en/data-access','지표 피복 분류'],
    ['Copernicus DEM GLO-30','https://registry.opendata.aws/copernicus-dem/','지표면 고도'],
    ['Copernicus Sentinel-2 L2A','https://registry.opendata.aws/sentinel-2-l2a-cogs/','2020년과 2024년 RGB 영상']
  ])}
  <p class="reference-detail">경계, 항구 좌표, 위성 장면의 세부 출처는 <a href="assets/maps/source_catalog.csv">원자료 목록(CSV)</a>에 정리했다.</p>
</div>`)
];
