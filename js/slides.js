const S=(title,chapter,body,opts={})=>({title,chapter,body,...opts});
const card=(title,detail,more='')=>`<div class="card"><h3>${title}</h3><p>${detail}</p>${more?`<span class="small">${more}</span>`:''}</div>`;
const cards=(items,cls='cols3')=>`<div class="grid ${cls}">${items.map(x=>card(...x)).join('')}</div>`;
const panel=(head,body,cls='')=>`<div class="panel ${cls}"><h3>${head}</h3><p>${body}</p></div>`;
const fig=(label,filename,hint='')=>`<figure class="figure" data-image="${filename}"><img src="assets/maps/${filename}" alt="${label}" loading="eager" width="3840" height="2160"><div class="fallback"><span class="mapmark">⌖</span><b>${label}</b>${hint?`<small>${hint}</small>`:''}</div></figure>`;
const mapSlide=(label,filename,items)=>`<div class="mapframe">${fig(label,filename)}<div class="mapcaption">${items.map(x=>`<span><b>${x[0]}</b> ${x[1]}</span>`).join('')}</div></div>`;
const mapPair=(maps,caption)=>`<div class="mapframe"><div class="maptabs" role="group" aria-label="지도 선택">${maps.map((m,i)=>`<button type="button" data-map="${i}" aria-pressed="${i===0}">${m[0]}</button>`).join('')}</div><div class="mapviews">${maps.map((m,i)=>`<div class="mapview" ${i?'hidden':''}>${fig(m[0],m[1])}</div>`).join('')}</div><div class="mapcaption">${caption}</div></div>`;
const metric=(v,caption)=>`<div class="card"><div class="value">${v}</div><p>${caption}</p></div>`;
const q=(items)=>`<div>${items.map((x,i)=>`<div class="question"><b>0${i+1}</b><span>${x}</span></div>`).join('')}</div>`;
const steps=(items)=>`<div class="steps">${items.map((x,i)=>`${i?'<span class="step-arrow">→</span>':''}<div class="card"><span class="small">0${i+1}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div>`;
const graph=`<div class="graph"><svg viewBox="0 0 1150 485" role="img" aria-label="탄소부채 회복 속도 개념 그래프"><line class="axis" x1="100" y1="35" x2="100" y2="400"/><line class="axis" x1="100" y1="400" x2="1090" y2="400"/><line class="gridline" x1="100" y1="120" x2="1090" y2="120"/><line class="gridline" x1="100" y1="260" x2="1090" y2="260"/><path class="line1" d="M100 60 C320 90 410 160 600 220 S850 295 1090 365"/><path class="line2" d="M100 60 C250 180 300 310 500 390 S850 400 1090 400"/><text x="100" y="445">벌채 시점</text><text x="850" y="445">경과 시간 →</text><text x="20" y="30">탄소부채</text><text x="760" y="240" fill="#bf7251">느린 회복</text><text x="500" y="370" fill="#2f8873">빠른 회복</text></svg></div>`;
window.slides=[
S('바이오매스 발전의 편익과 산림 훼손의 공간적 분포','표지',`<div class="cover"><div class="eyebrow">BIOMASS SHADOW ATLAS</div><h1>바이오매스 발전의 편익과<br><span style="color:#aacfb5">산림 훼손의 공간적 분포</span></h1><p>인도네시아 고론탈로에서 한국과 일본까지</p></div>`,{dark:true,source:'3308 여은수'}),
S('친환경 에너지의 역설','문제 제기',`<div class="compare">${panel('재생에너지','전력을 생산하는 소비국','white')}<div class="versus">↔</div>${panel('산림 훼손','연료를 공급하는 생산지','white')}</div>`),
S('재생 가능성과 탄소중립','문제 제기',`<div class="cycle"><div>광합성<small>대기 중 CO₂ 흡수</small></div><div>나무 성장<small>탄소 저장</small></div><div>연료 생산<small>벌채와 가공</small></div><div>연소<small>CO₂ 배출</small></div></div><div class="ribbon" style="margin-top:40px">다시 자랄 수 있다는 사실만으로 탄소중립이 보장되지는 않는다.</div>`),
S('어디까지 살펴봐야 할까?','문제 제기',`<div class="two">${panel('발전소만 보는 평가','연소 단계에서의 에너지 생산','white')}${panel('공급망 전체를 보는 평가','벌채 → 가공 → 운송 → 발전 → 산림의 회복','darkpanel')}</div>`),
S('세 가지 연구 질문','문제 제기',q(['목재펠릿은 어디에서 생산되는가?','산림 변화는 어디에서 발생하는가?','발전의 편익과 환경 부담은 누구에게 돌아가는가?'])),
S('바이오매스의 종류','바이오매스의 구조',cards([['목질계 바이오매스','목재, 목재펠릿, 목재 부산물'],['농업 잔재','볏짚, 왕겨, 작물 부산물'],['유기성 폐기물','음식물 폐기물, 바이오가스']], 'cols3')),
S('목재펠릿 생산 과정','바이오매스의 구조',steps([['원료 확보','벌채와 수집'],['가공','파쇄와 건조'],['압축','펠릿 제조'],['발전','연소와 전력 생산']])),
S('한국의 목재펠릿 수입 구조','바이오매스의 구조',`<div class="grid cols2">${metric('340만 t','2023년 원목 유래 목재펠릿 사용량')}${metric('98%','해당 원료의 해외 수입 비율')}</div>`,{source:'산업통상자원부, 2024'}),
S('국경을 넘는 공급망','바이오매스의 구조',`<div class="route"><span>고론탈로 산림</span><i></i><span>목재펠릿</span><i></i><span>한국과 일본</span></div><div class="ribbon" style="margin-top:56px">연료는 이동하지만 산림 변화는 생산지에 남는다.</div>`),
S('사례 지역, 고론탈로','바이오매스의 구조',mapSlide('인도네시아 술라웨시섬과 고론탈로','s13a_landcover.png',[['연구 지역','인도네시아 술라웨시섬 북부'],['핵심 사례','포후와토 지역 목재펠릿 공급망']])),
S('국제 목재펠릿 무역','그림자지도의 분석',mapPair([['세계 교역','s11a_world_trade.png'],['동아시아 확대','s11b_east_asia_trade.png']],'<span><b>공급국</b> 초록</span><span><b>소비국</b> 파랑</span><span>2023년 한국과 일본의 주요 수입국</span>'),{source:'UN Comtrade, 2023 HS440131'}),
S('고론탈로에서 한국과 일본까지','그림자지도의 분석',mapSlide('목재펠릿 공급망 지도','s12_supply_chain.png',[['99% 이상','2021~2023년 인도네시아 펠릿 수출의 한국과 일본 비중'],['물류 거점','고론탈로와 랄라페항']]),{source:'Unheeded Warnings, 2024'}),
S('고론탈로의 산림과 지형','그림자지도의 분석',mapPair([['산림 피복','s13a_landcover.png'],['지형','s13b_terrain.png']],'<span><b>고론탈로주</b> 술라웨시섬 북부</span><span><b>포후와토군</b> 빨간 경계</span>'),{source:'ESA WorldCover 2021 / Copernicus DEM'}),
S('1,032ha의 산림 벌채','그림자지도의 분석',`<div class="two"><div class="panel white"><div class="numline">1,032<span style="font-size:44px"> ha</span></div><p>10.32 km²</p></div>${panel('2024년 1월~8월','고론탈로 두 업체의 목재펠릿 생산 관련 벌채 조사','white')}</div>`,{source:'Auriga Nusantara 조사 인용, 2024'}),
S('위성에서 본 산림 변화','그림자지도의 분석',mapSlide('2020년과 2024년 Sentinel-2 위성영상 비교','s15_satellite_comparison.png',[['왼쪽','2020-02-24'],['오른쪽','2024-08-11']]),{source:'Copernicus Sentinel-2 / Element 84'}),
S('산림 손실의 시간적 분포','그림자지도의 분석',mapSlide('연도별 산림 손실 지도','s16_forest_loss.png',[['분석 연도','2021~2025년'],['핵심 지표','연도별 산림 피복 손실 면적']])),
S('산림 면적과 생태계의 차이','그림자지도의 분석',`<div class="compare">${panel('자연림','다양한 수종과 서식지 구조','white')}<div class="versus">≠</div>${panel('단일 수종 조림지','단순화된 수종 구성과 서식지 구조','white')}</div>`),
S('편익과 부담의 그림자지도','그림자지도의 분석',mapSlide('종합 그림자지도','s18_shadow_atlas.png',[['소비 지역','전력 공급과 에너지 전환'],['생산 지역','산림 변화와 지역 생활환경']]),{dark:false}),
S('목재 연소와 탄소 순환','탄소중립과 환경 불평등',`${cards([['01','벌채'],['02','목재 연소'],['03','CO₂ 방출'],['04','산림 재성장']], 'cols4')}<div class="ribbon" style="margin-top:48px">탄소는 빠르게 방출되지만 재흡수에는 시간이 필요하다.</div>`),
S('탄소부채와 회복 시간','탄소중립과 환경 불평등',graph,{source:'탄소부채 개념 모델'}),
S('전 과정으로 평가하기','탄소중립과 환경 불평등',steps([['원료 생산','산림과 토지 이용'],['가공','건조와 압축'],['수송','육상과 해상 운송'],['발전','연소와 전력 공급']])),
S('비교 기준에 따라 달라지는 결과','탄소중립과 환경 불평등',`<div class="timebar"><div class="label">자연림 유지</div><div class="bar">산림 탄소 저장과 생태계 보전</div></div><div class="timebar"><div class="label">목재펠릿 생산</div><div class="bar">연료 생산과 발전 편익</div></div><div class="timebar"><div class="label">잔재 활용</div><div class="bar">기존 부산물의 에너지 활용</div></div>`),
S('탄소는 어느 부문에 기록되는가?','탄소중립과 환경 불평등',`<div class="two">${panel('발전 부문','바이오매스 연소의 생물기원 CO₂ 별도 보고','white')}${panel('토지 이용 부문','산림과 토지 탄소 저장량의 변화 기록','white')}</div>`,{source:'IPCC 국가 온실가스 인벤토리 지침'}),
S('편익과 부담의 분배','탄소중립과 환경 불평등',`<div class="table"><div class="head">이해관계자</div><div class="head">편익</div><div class="head">부담</div><div class="key">소비국</div><div>전력 공급</div><div>수입 의존</div><div class="key">생산기업</div><div>수출 수익</div><div>원료 확보 비용</div><div class="key">지역 주민</div><div>일부 고용과 투자</div><div>도로와 생활환경 변화</div><div class="key">산림 생태계</div><div>—</div><div>서식지 손실</div></div>`),
S('원료에 따라 달라지는 지속가능성','대안과 결론',cards([['폐목재와 잔재','기존 자원의 활용'],['전용 조림지','토지 이용과 생장 관리'],['자연림 유래 목재','산림 전환과 탄소 저장량 변화']], 'cols3')),
S('지속 가능한 공급망의 조건','대안과 결론',steps([['위치 확인','벌채 위치와 시기'],['원료 추적','생산과 가공 이력'],['현장 검증','위성자료와 실사'],['주민 참여','의사결정과 부담 분담']])),
S('한국의 정책 변화','대안과 결론',`<div class="policy"><b>01</b><span>신규 목질계 설비의 REC 지원 제한</span></div><div class="policy"><b>02</b><span>기존 설비 지원의 단계적 조정</span></div><div class="policy"><b>03</b><span>원료 관리와 수입의존도 개선</span></div>`,{source:'산업통상자원부, 2024년 개선안'}),
S('세 가지 결론','대안과 결론',q(['연료의 생산지와 소비지는 분리되어 있다.','탄소중립은 원료와 산림의 변화에 달려 있다.','지속가능성을 판단하려면 공급망 전체를 추적해야 한다.'])),
S('재생에너지의 기준','대안과 결론',`<div class="big">자연림을 제거해 만든 목재펠릿을<br><span class="orange">재생에너지로 지원해야 할까?</span></div>`,{dark:true}),
S('에너지 전환의 진짜 성과','결론',`<div class="ending"><div class="eyebrow">CONCLUSION</div><div class="big">전력의 생산량뿐 아니라<br><span class="orange">원료가 떠나온 숲의 변화</span>까지<br>살펴봐야 한다.</div></div>`,{dark:true,source:'3308 여은수'})
];
