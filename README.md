# 🏆 Cotopia

<div align="center">
  <img src="https://github.com/user-attachments/assets/e08c58af-7ab1-4164-a711-7a51fdd5947a" alt="cotopia" width="600">
  <h3>코딩테스트 준비를 더 재미있게, 더 효율적으로!</h3>
</div>

## 🎯 프로젝트 소개
Cotopia는 알고리즘 문제 풀이 현황을 자동으로 추적하고, 팀 단위로 경쟁하며 성장할 수 있는 플랫폼입니다.
또한 무제한 클릭을 통해 재미있는 점심 메뉴 결정하는 미니게임도 제공합니다!

## ✨ 주요 기능
### 👨‍💻 알고리즘 트래킹
- LeetCode, 백준(solved.ac) 문제 풀이 현황 자동 추적
- 일일/주간/월간 문제 풀이 통계
- 개인별 성장 그래프 제공

### 🤝 팀 시스템
- 팀 생성 및 가입 기능
- 팀원들과 실시간 순위 경쟁
- 팀별 통계 및 랭킹 시스템

### 🍱 Lunch Battle
- 매일 랜덤한 점심 메뉴 5개 자동 추천
- 무제한 클릭 투표로 즐기는 점심 메뉴 결정
- 실시간 인기 메뉴 확인

## 🛠 기술 스택
### Backend
- Java 17
- Spring Boot 3.3.4
- PostgreSQL
- WebSocket (실시간 투표 시스템)
- Redis (실시간 투표 시스템)

### Infrastructure
- Amazon S3
- Amazon CloudFront
- AWS EC2
- AWS Lambda
- AWS EventBridge

## 🔍 지원하는 코딩 플랫폼
- LeetCode
- 백준 (solved.ac)
- *더 많은 플랫폼 지원 예정*

## 🚀 시작하기
```bash
git clone https://github.com/your-repo/cotopia.git
cd cotopia
./gradlew clean build
```

## 🏃‍♂️실행
```bash
java -jar build/libs/cotopia-0.0.1-SNAPSHOT.jar
```

## 📃 API 문서
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## 🌟 주요 화면
| Screen | Image |
|:---:|:---:|
| Team Interaction | <img src=https://github.com/user-attachments/assets/5a8c6cd8-28bc-409b-921f-d0f578d8ca58 alt="teamInteraction" width="600"/>|
| Algo Stat | <img src="https://github.com/user-attachments/assets/6f5a782c-6798-45d0-8320-045b26089ade" alt="algostat" width="600"/>|
| Lunch Battle |<img src="https://github.com/user-attachments/assets/e08c58af-7ab1-4164-a711-7a51fdd5947a" alt="cotopia" width="600"/>|

## 🤝 기여하기
프로젝트에 기여하고 싶으시다면:
1. 이 저장소를 Fork 하세요
2. 새로운 Branch를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 Commit 하세요 (`git commit -m 'Add amazing feature'`)
4. Branch에 Push 하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 개발자
- [@ampersandor](https://github.com/ampersandor)

## 🔗 링크
- [웹사이트](https://cotopia.dev)
- [Frontend](https://github.com/ampersandor/cotopia-frontend)
- [Backend](https://github.com/ampersandor/cotopia)
