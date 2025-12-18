<br/><br/>
<p align="center">
  <img src="public/icons/logo.png" alt="RECIPiCK 로고" width="120" height="120" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Supabase-3EC9D1?style=for-the-badge&logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
</p>
<br/><br/><br/><br/>


# 🥯 RECIPiCK (레시픽) 

**레시픽**은 홈베이킹 입문자와 숙련자를 위한 **레시피 공유 및 맞춤형 계산 서비스**입니다.

단순한 레시피 나열을 넘어, 사용자가 원하는 분량에 맞춰 재료 비율을 자동으로 계산해주고, 

AI를 통해 개인의 취향(글루텐 프리, 저당 등)에 맞는 레시피 변환 기능을 제공합니다.



## ✨ 주요 기능 (B2C)
- **스마트 레시피 비율 계산**: 메인 재료(밀가루 등)의 용량을 변경하면 나머지 재료 양이 자동으로 계산됩니다.
- **레시피 커뮤니티**: 유저 간 레시피 공유, 직접 만든 결과물 자랑 및 리뷰 작성 기능.
- **AI 레시피 어시스턴트 (Beta)**: "이 레시피를 글루텐 프리로 바꿔줘"와 같은 요청을 처리하는 AI 챗봇 도입 예정.
- **베이킹 행사 정보**: 관련 전시회, 원데이 클래스 등 이벤트 정보 제공.

## 🛠 기술적 특징
- **Next.js **: 최신 버전의 프레임워크를 활용한 고성능 웹 환경 구축.
- **Dynamic Calculation**: `react-hook-form`과 `Zod`를 활용하여 실시간 재료 비율 계산 로직 구현.
- **Editor UI**: `Tiptap` 에디터를 커스텀하여 풍부한 레시피 작성 경험 제공.
- **Drag & Drop**: `dnd-kit`을 활용한 레시피 순서 편집 기능.
- **Monorepo Ready**: Prisma와 패키지 구조 설계를 통해 추후 B2B 확장을 고려한 아키텍처 구성.

## 📱 향후 로드맵
- **하이브리드 앱 전환**: React Native **WebView** 방식을 도입하여 iOS/Android 앱 출시 준비 중.
- **B2B 확장**: 베이킹 원재료 업체 및 클래스 운영자를 위한 비즈니스 솔루션 개발 예정.

- ---

이 프로젝트는 디자이너와 개발자의 긴밀한 협업을 통해 제작되고 있습니다.

| DIN | SSU |
| :---: | :---: |
| <img src="public/admin/din.png" width="100px;"/><br />**Designer** | <img src="public/admin/ssu.png" width="100px;"/><br />**Frontend Dev & ETC** |
| UI/UX 디자인, 디자인 시스템 구축 | 아키텍처 설계, 기능 구현 외 대부분 |
