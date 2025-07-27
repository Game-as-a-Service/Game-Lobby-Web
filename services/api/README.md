# API Module Documentation

API modules refactored according to Swagger specifications, featuring modular design where each business domain has independent type definitions and API functions.

## Directory Structure

```
services/api/
├── fetcher.ts          # Unified API request utility
├── auth/              # Authentication module
│   ├── api.ts         # Auth API functions
│   ├── type.ts        # Auth type definitions
│   └── index.ts       # Auth module entry point
├── users/             # Users module
│   ├── api.ts         # Users API functions
│   ├── type.ts        # Users type definitions
│   └── index.ts       # Users module entry point
├── games/             # Games module
│   ├── api.ts         # Games API functions
│   ├── type.ts        # Games type definitions
│   └── index.ts       # Games module entry point
├── rooms/             # Rooms module
│   ├── api.ts         # Rooms API functions
│   ├── type.ts        # Rooms type definitions
│   └── index.ts       # Rooms module entry point
├── index.ts           # API unified entry point
└── README.md          # Usage documentation
```

## Usage

### 1. Basic Usage

```typescript
import { authApi, usersApi, gamesApi, roomsApi } from "@/api";

// Login
const loginUrl = await authApi.login({ type: "google-oauth2" });

// After getting token, use token for authentication
const token = "your_jwt_token_here";

// Get user information
const user = await usersApi.getCurrentUser(token);

// Get games list (no authentication required)
const games = await gamesApi.getGameRegistrations();

// Get rooms list (no authentication required)
const rooms = await roomsApi.getRooms({
  status: "WAITING",
  page: 1,
  perPage: 10,
});

// Create room (authentication required)
const room = await roomsApi.createRoom(token, {
  name: "My Room",
  gameId: "game-123",
  maxPlayers: 4,
  minPlayers: 2,
});
```

### 2. Type Imports

```typescript
import type {
  LoginRequest,
  AuthenticateResponse,
  User,
  Game,
  Room,
  CreateRoomRequest,
} from "@/api";
```

### 3. Error Handling

```typescript
import { ApiError, isAuthError, isNetworkError } from "@/api";

try {
  const user = await usersApi.getCurrentUser(token);
} catch (error) {
  if (isAuthError(error)) {
    // Handle authentication error
    console.log("Need to re-login");
  } else if (isNetworkError(error)) {
    // Handle network error
    console.log("Network connection issue");
  } else if (error instanceof ApiError) {
    // Handle other API errors
    console.log("API Error:", error.message);
  }
}
```

## API Endpoint Mapping

### Auth Module (No authentication required)

- `GET /login` → `authApi.login(params)`
- `POST /authenticate` → `authApi.authenticate(data)`

### Users Module (Authentication required)

- `GET /users/me` → `usersApi.getCurrentUser(token)`
- `PUT /users/me` → `usersApi.updateCurrentUser(token, data)`
- `POST /users` → `usersApi.createUser(token, data)`

### Games Module

- `GET /games` → `gamesApi.getGameRegistrations(query?)` (No authentication required)
- `POST /games` → `gamesApi.registerGame(data)` (No authentication required)
- `PUT /games/{gameId}` → `gamesApi.updateGameRegistration(gameId, data)` (No authentication required)
- `POST /comments` → `gamesApi.commentGame(token, data)` (Authentication required)
- `POST /comments/games/{gameId}` → `gamesApi.updateGameComment(token, gameId, data)` (Authentication required)
- `POST /collections/games/{gameId}` → `gamesApi.collectGame(token, gameId)` (Authentication required)
- `DELETE /collections/games/{gameId}` → `gamesApi.unCollectGame(token, gameId)` (Authentication required)
- `GET /collections` → `gamesApi.getGameCollections(token)` (Authentication required)

### Rooms Module

- `GET /rooms` → `roomsApi.getRooms(query)` (No authentication required)
- `POST /rooms` → `roomsApi.createRoom(token, data)` (Authentication required)
- `POST /rooms:fastJoin` → `roomsApi.fastJoinRoom(token, data)` (Authentication required)
- `GET /rooms/{roomId}` → `roomsApi.getRoomDetail(token, roomId)` (Authentication required)
- `DELETE /rooms/{roomId}` → `roomsApi.closeRoom(token, roomId)` (Authentication required)
- `POST /rooms/{roomId}:startGame` → `roomsApi.startGame(token, roomId)` (Authentication required)
- `POST /rooms/{roomId}:endGame` → `roomsApi.endGame(token, roomId)` (Authentication required)
- `POST /rooms/{roomId}/players` → `roomsApi.joinRoom(token, roomId, data?)` (Authentication required)
- `DELETE /rooms/{roomId}/players/me` → `roomsApi.leaveRoom(token, roomId)` (Authentication required)
- `DELETE /rooms/{roomId}/players/{playerId}` → `roomsApi.kickPlayer(token, roomId, playerId)` (Authentication required)
- `POST /rooms/{roomId}/players/me:ready` → `roomsApi.playerReady(token, roomId)` (Authentication required)
- `POST /rooms/{roomId}/players/me:cancel` → `roomsApi.playerCancelReady(token, roomId)` (Authentication required)

## Authentication Mechanism

All APIs requiring authentication use `Authorization: Bearer {token}` header:

1. **Get Token**: Obtain JWT token through `authApi.authenticate()`
2. **Use Token**: Pass token as the first parameter to APIs requiring authentication
3. **Auto Handling**: `createAuthenticatedFetcher` automatically adds `Authorization: Bearer {token}` to request headers

## Key Improvements

1. **Unified Authentication**: Uses Authorization header instead of JWT objects in request body
2. **Modular Design**: Each business domain is independently managed
3. **Type Safety**: Complete TypeScript type definitions
4. **Unified Error Handling**: Standardized error handling mechanism
5. **Swagger Compliant**: Fully corresponds to backend API definitions
6. **Easy Maintenance**: Clear directory structure and code organization
