# Game-Lobby

The frontend of the Game as a Service lobby.

## Prerequisites

- **Node.js**: >= 20.19.4
- **Yarn**: >= 1.22.0

### 使用 nvm 管理 Node.js 版本（推薦）

```bash
# 安裝指定的 Node.js 版本
nvm install

# 使用指定的 Node.js 版本
nvm use
```

## Commands

```bash
# Host by Yarn
1. yarn
2. yarn dev

# Host by Docker
1. Install Docker and Docker compose
2. docker compose build
3. docker compose up

# Lint
yarn pre-commit

# Runs All Test
yarn test

## Unit Test
yarn unit-test
### Test single files/folder
yarn jest $PATH

## E2E Test
yarn e2e-test

# Storybook
yarn storybook
```

### Starting the Project

如何在自己的本地跑前端專案，並連接 webSocket

```yaml
# 調整 .env.development file
# 後端 RESTful API 的 url
NEXT_PUBLIC_INTERNAL_ENDPOINT=
# 後端 Socket 的 url
NEXT_PUBLIC_INTERNAL_SOCKET_ENDPOINT=
# 取消前端 Mock Data
NEXT_PUBLIC_MOCK=false
```

```bash
# 使用 yarn install dependencies
# 如果出現 Error 可以改成使用 yarn install 下載
yarn
# 啟動專案
yarn dev
```

## Git Cooperation

- Branch Name: `feature/ticket-name`
  - `git checkout -b feature/[ticket-name]`
- Commit: `feat: ticket-name`

## Naming Convention

- Route: snake-case
- Components: PascalCase

## Components DoD

1. Test
2. Implementation
3. Doc(Storybook)

## Things to Know

1. Atomic Design
2. MVVM
3. Storybook Reference
   1. [Material UI](https://mui.com/material-ui/react-button/)
   2. Demo: Playground + Props (Size, color, ...)
4. mocks/：放 mock 資料，提供給 pages/api/mock 使用

## Directory Structure - By Type

- 根據類型（如：requests, components）來分類
- 而不是根據功能（如： auth, lobby）來分類

## Github Projects

1. 原訂要做的直接開 Issues （Story Points, AC, Assignee, API）
2. 未捕捉到的：開 PR 時綁 Github Projects
   > 這樣在 Github Projects 就能看到原本的 User Story 跟 Sprint 過程中多做的 bugs，如果這週沒辦法完成的就開 Issues 在下次開會時納入討論

## Contributor

<a href="https://github.com/Game-as-a-Service/Game-Lobby/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Game-as-a-Service/Game-Lobby" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
