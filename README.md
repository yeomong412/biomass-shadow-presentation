# 바이오매스 발전의 편익과 산림 훼손의 공간적 분포

45분 분량의 HTML 발표자료입니다. 발표 슬라이드 30장과 참고문헌 1장으로 구성되어 있습니다. `index.html`을 브라우저에서 열면 실행됩니다. 정적 웹사이트이므로 GitHub Pages에 그대로 배포할 수 있습니다.

## 조작

- 오른쪽 방향키, 스페이스바, PageDown: 다음 장
- 왼쪽 방향키, PageUp: 이전 장
- Home / End: 처음 / 마지막
- O: 전체 슬라이드 목록, F: 전체화면
- 화면 좌우 끝 클릭, 모바일 좌우 스와이프 지원
- 브라우저 인쇄: 장별 PDF 출력

## 발표자 도구

1. HDMI를 연결하고 Windows 키 + P에서 **확장**을 선택합니다. 복제 모드는 같은 화면을 두 곳에 표시합니다.
2. Chrome 또는 Edge에서 발표자료를 열고 오른쪽 위의 **발표자 도구**를 누릅니다. 창이 뜨지 않으면 이 사이트의 팝업을 허용합니다.
3. 발표자 창은 노트북에 둡니다. 원래 발표 창을 선택해 Windows 키 + Shift + ← 또는 →로 외부 화면에 옮긴 뒤 F를 눌러 전체 화면을 켭니다. 전체 화면은 Esc로 나옵니다.
4. 발표자 창에서 **대본 파일 열기**로 별도 제공한 `바이오매스_45분_발표대본.md`를 선택합니다. 현재 장의 대본과 목표 시간이 표시됩니다. **시작**을 누르면 45분 타이머가 시작됩니다.
5. 발표자 창의 이전/다음 버튼, 방향키, 스페이스바, Page Up / Down으로 청중 창을 조작합니다. 슬라이드 선택 메뉴로 장을 건너뛸 수 있고, 지도 선택 버튼은 두 창에 함께 적용됩니다.

대본은 발표자 창이 로컬 파일에서 읽습니다. 두 창 사이에는 슬라이드와 지도 선택 상태만 전달됩니다. 발표자 창을 닫고 새로 열면 대본을 다시 선택합니다.

## 이미지

기존 Python 작업의 3840×2160 PNG 8종을 원본 그대로 연결했습니다.

| 슬라이드 | 파일 | 표시 |
|---|---|---|
| 10 | s13a_landcover.png | 고론탈로와 술라웨시 위치 |
| 11 | s11a_world_trade.png / s11b_east_asia_trade.png | 세계 교역 / 동아시아 확대 선택 |
| 12 | s12_supply_chain.png | 포후와토와 소비국 공급망 |
| 13 | s13a_landcover.png / s13b_terrain.png | 산림 피복 / 지형 선택 |
| 15 | s15_satellite_comparison.png | 2020-02-24 / 2024-08-11 비교 원본 |
| 16 | s16_forest_loss.png | 2021~2025 산림 손실과 면적 그래프 |
| 18 | s18_shadow_atlas.png | 산림 손실과 공급망 결합 |

11번과 13번 상단 버튼으로 지도를 바꿉니다. 인쇄에서는 두 지도가 함께 나옵니다.
원본 이미지의 세부 출처와 파일 해시는 `assets/maps/manifest.json`을 참고하세요.

## 수정

- 슬라이드 구성과 내용: `js/slides.js`
- 디자인과 8px 간격 시스템: `css/presentation.css`
- 탐색과 키보드 조작: `js/presentation.js`

## 원본 자료

- 산업통상자원부(2024), 바이오매스 발전의 수입의존도 완화한다
- Tierney 외(2024), Unheeded Warnings: Forest Biomass Threats to Tropical Forests in Indonesia and Southeast Asia
- 포후와토 지방정부(2025), 랄라페항 1만 톤 목재펠릿 수출 보도
- IPCC Task Force on National Greenhouse Gas Inventories, FAQ Q2-10
- IEA 및 IEA Bioenergy, 산림 바이오매스 및 탄소중립 자료

## 배포

GitHub 저장소 `main` 브랜치의 `/ (root)`를 Pages 소스로 지정하면 됩니다. 공개 배포 범위는 저장소 설정에서 확인하세요.
