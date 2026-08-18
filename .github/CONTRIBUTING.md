# Contributing — GitFlow 전략

## 브랜치 구조

```
main          ──────●──────────────────●──────────────●──▶  (production)
                    ↑                  ↑              ↑
                    │  release/1.1.0   │  hotfix/fix  │
develop       ──●───●───────────────●──●──────────●───●──▶  (integration)
                ↑                   ↑              ↑
         feature/gnb-nav     feature/agent    feature/rss
```

## 브랜치 네이밍

| 유형 | 패턴 | 예시 |
|------|------|------|
| 기능 개발 | `feature/<kebab-case>` | `feature/agent-panel` |
| 버그 수정 | `fix/<kebab-case>` | `fix/gnb-dropdown` |
| 릴리즈 | `release/<semver>` | `release/1.2.0` |
| 긴급 수정 | `hotfix/<kebab-case>` | `hotfix/rss-parse-crash` |
| 문서 | `docs/<kebab-case>` | `docs/vitest-setup` |

## 플로우

### 기능 개발 (feature)

```bash
# develop 에서 분기
git switch develop
git pull origin develop
git switch -c feature/my-feature

# 작업 후 PR: feature/* → develop
```

### 릴리즈 (release)

```bash
git switch develop
git switch -c release/1.2.0

# 버전 범프, 최종 QA, 버그만 수정
# PR 1: release/1.2.0 → main  (태그 생성)
# PR 2: release/1.2.0 → develop  (역병합)
git tag -a v1.2.0 -m "Release 1.2.0"
```

### 긴급 수정 (hotfix)

```bash
# main 에서 분기
git switch main
git switch -c hotfix/critical-bug

# 수정 후
# PR 1: hotfix/* → main
# PR 2: hotfix/* → develop  (역병합 필수)
```

## 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 를 따릅니다.

```
<type>(<scope>): <subject>

feat(gnb): add agent panel toggle button
fix(feed): handle CDATA in RSS parser
refactor(theme): extract ThemeProvider to separate file
test(utils): add formatDate unit tests
docs(contributing): add gitflow strategy guide
chore(deps): upgrade next to 16.3.1
```

| type | 설명 |
|------|------|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩터링 |
| `style` | 스타일·포맷 |
| `test` | 테스트 |
| `docs` | 문서 |
| `chore` | 빌드·설정·의존성 |
| `perf` | 성능 개선 |

## PR 규칙

- **feature** → `develop`  
- **release** → `main` + `develop`  
- **hotfix** → `main` + `develop`  
- PR 제목은 커밋 컨벤션과 동일한 형식  
- 최소 1명 리뷰 승인 후 Squash & Merge  
- PR 템플릿: `.github/PULL_REQUEST_TEMPLATE/` 참조

## 로컬 개발

```bash
npm install
npm run dev        # 개발 서버
npm test           # Vitest 테스트
npm run test:run   # CI 모드 (watch 없이)
npx tsc --noEmit   # 타입 체크
```
