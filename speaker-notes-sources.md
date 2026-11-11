# 키워드 대본 출처와 개정 기록

- 개정일: 2026-11-11
- 원본: 2026-11-09 프로젝트 폴더의 outputs/바이오매스_45분_발표대본.md
- 원본 프로젝트: referenced-chatgpt-conversation-this-is-an-3
- 저장소 main의 전체 파일 목록에서 대본 파일 없음 확인, 로컬 원본을 읽고 개정
- 대조 대상: 저장소 index.html에서 불러오는 js/slides.js, 슬라이드 1~30
- 대조 슬라이드 파일 SHA: a437acabc23e967264e9755895b13823b984e7db
- 유지 내용: 슬라이드별 주제와 논리 순서, 주요 사례와 수치, 집계 범위, 지도와 그래프 해석의 한계
- 제거 내용: 읽는 문장, 구어체, 인사와 감사, 동작과 무대 지시, 청중 응답 대기, 리허설 지시
- 결과: speaker-notes.md, 슬라이드 1~30의 하이픈 목록
- 참고문헌: 기존 HTML 31번 슬라이드 유지, 아래에 원본 대본의 출처 연결 보존
- 발표자 도구: 시간 구간이 없는 번호와 주제 형식 지원, 이전 시간표 형식도 지원

## 주요 수치의 범위

| 슬라이드 | 수치 | 집계 범위 |
|---|---|---|
| 08 | 약 340만t, 수입 98% | 2023년 국내 원목 유래 목재펠릿 사용량, 98%의 분모도 같은 사용량 |
| 08 | 약 740만t | 2023년 전체 목질계 바이오매스 사용량, 수입량과 구분 |
| 11 | 한국 약 48만t, 일본 약 6만 7천t | 2023년 각국이 신고한 인도네시아산 HS 440131 수입 순중량, 고론탈로만의 물량과 구분 |
| 12 | 1만t | 2025-05-13 랄라페항 수출 행사 물량, 연간 총량이나 목적국별 배분량과 구분 |
| 12 | 99% 이상 | 2021~2023년 인도네시아 전체 펠릿 수출 중 한국과 일본행 비중 |
| 14 | 1032ha, 10.32km² | 2024년 1~8월 고론탈로 BTL과 IGL 두 업체의 조사 결과 |
| 16 | 2023년 약 3184ha, 2024년 약 2366ha, 2025년 약 3254ha | 포후와토군 경계 내부, 2000년 수관율 30% 이상인 픽셀의 연도별 수목 피복 손실, 두 업체 조사와 구분 |

## 원본 대본과 HTML의 자료 출처

- 한국 사용량과 2024년 12월 정책 발표안: [산업통상자원부](https://www.motir.go.kr/kor/article/ATCL3f49a5a8c/169947/view)
- 수출 비중과 두 업체 조사: [Unheeded Warnings](https://content.forourclimate.org/files/research/21SMvae.pdf), 5쪽과 20~22쪽, 1032ha는 20쪽
- 교역: [UN Comtrade](https://comtradeplus.un.org/en/), 2023년 연간 수입, HS 440131, 한국과 일본
- 항만 사례: [고론탈로주 정부 2025-05-14 보도](https://berita.gorontaloprov.go.id/2025/05/14/export-to-south-korea-and-japan-wood-pellet-from-gorontalo-on-fire/)
- 피복: [ESA WorldCover 2021 v200](https://esa-worldcover.org/en/data-access)
- 지형: [Copernicus DEM GLO-30](https://registry.opendata.aws/copernicus-dem/)
- 영상: [Sentinel-2 L2A](https://registry.opendata.aws/sentinel-2-l2a-cogs/), 2020-02-24와 2024-08-11
- 손실: [Hansen Global Forest Change v1.13](https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2025_v1_13)
- 탄소 회복과 비교 기준: [IEA Bioenergy](https://www.ieabioenergy.com/iea-publications/faq/woodybiomass/carbon-neutrality/)
- 국가 배출 기록: [IPCC TFI FAQ Q2-10](https://www.ipcc-nggip.iges.or.jp/faq/faq.html)
- 세부 경계와 항구 좌표: 저장소 assets/maps/source_catalog.csv
- 주요 인용 수치: 저장소 assets/maps/quoted_facts.csv

## 해석 범위

- 기존 대본과 저장소 자료를 기준으로 개정, 외부 수치의 신규 계산이나 정책 현황 갱신 없음
- 국가 교역량만으로 고론탈로산 물량 특정 불가
- 위성 손실 분류만으로 개별 손실의 원인 확정 불가
- 수목 피복과 자연림 또는 생물다양성의 구분
- 탄소부채 곡선은 발표용 개념도, 실제 회복 연수나 배출량을 나타내는 관측 그래프와 구분
- 정책 설명은 2024년 12월 발표안 기준


## 2026-11-12 사진과 13번 설명 보강

- 13번: 내륙 산지와 해안 저지대의 지형, 산림의 토양 보호 기능, 벌채 위치에 따른 영향 차이를 연결
- 일반 원리 출처: [FAO Forest and water](https://www.fao.org/sustainable-forest-management-toolbox/modules/forest-and-water)
- 낙엽층과 뿌리의 토양 보호, 벌채와 지표 교란에 따른 침식과 토사 유입 가능성 설명
- 이 지역의 실제 토양 유실량, 수질 피해, 경사도, 유역 흐름을 새로 측정하거나 확정하지 않음
- 고도 자료는 경사도와 유역 분석 자체를 대신하지 않음
- 사진 18장: assets/photos/CREDITS.md와 credits.html에 원문과 이용 조건 기록
- 실제 고론탈로 두 업체의 조사 증거 사진과 설명용 해외 사진을 구분
- 추가 편집 위치: js/photo-layout.js, css/photo-layout.css
