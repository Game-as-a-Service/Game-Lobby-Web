# API 服務使用指南

## Orval 整合

本專案使用 [Orval](https://orval.dev/) 來自動生成 TypeScript API 客戶端代碼，直接從後端 Swagger API 文檔生成。

### 快速開始

1. **生成 API 代碼**：

   ```bash
   npm run api:generate
   ```

2. **監聽模式生成**（開發時使用）：

   ```bash
   npm run api:generate:watch
   ```

3. **清理生成的代碼**：
   ```bash
   npm run api:clean
   ```

### 配置說明

- **Swagger 來源**：`https://api.gaas.waterballsa.tw/swagger-ui/api-docs`
- **生成模式**：單文件模式，包含所有類型和 hooks
- **生成文件**：`services/api/index.ts`
- **HTTP 客戶端**：使用自定義 fetch（不使用 axios）
- **數據獲取**：整合 SWR hooks
- **類型推斷**：完整的 TypeScript 類型安全，無需手動標註

### 使用範例

```tsx
import { useGetRooms, useCreateRoom, useGetUser } from "@/services/api";

// 1. 獲取房間列表
const RoomsComponent = () => {
  const { data, error, isLoading } = useGetRooms({
    status: "waiting",
    page: 1,
    perPage: 10,
    public: true,
  });

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error.message}</div>;

  return (
    <div>
      {data?.rooms?.map((room) => (
        <div key={room.id}>
          <h3>{room.name}</h3>
          <p>遊戲: {room.game.name}</p>
          <p>
            人數: {room.currentPlayers}/{room.maxPlayers}
          </p>
        </div>
      ))}
    </div>
  );
};

// 2. 創建房間
const CreateRoomComponent = () => {
  const { trigger: createRoom, isMutating } = useCreateRoom();

  const handleCreateRoom = async () => {
    try {
      await createRoom({
        jwt: { tokenValue: "your-jwt-token" },
        request: {
          name: "新房間",
          gameId: "game-123",
          maxPlayers: 4,
          minPlayers: 2,
        },
      });
    } catch (error) {
      console.error("創建失敗:", error);
    }
  };

  return (
    <button onClick={handleCreateRoom} disabled={isMutating}>
      {isMutating ? "創建中..." : "創建房間"}
    </button>
  );
};

// 3. 獲取用戶資訊
const UserComponent = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useGetUser({
    principal: { tokenValue: "your-jwt-token" },
  });

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error.message}</div>;

  return (
    <div>
      <h2>{user?.nickname}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
};
```

### 認證設置

API 客戶端會自動從以下來源獲取認證 token：

1. localStorage 中的 `authToken`
2. localStorage 中的 `token`

JWT token 會自動注入到所有需要認證的 API 請求的 Authorization header 中。

**自動處理的功能**：

- ✅ JWT token 自動注入
- ✅ 查詢參數自動處理
- ✅ 請求/響應錯誤處理
- ✅ Content-Type 自動設置
- ✅ 完整的 TypeScript 類型安全

您可以在 `services/api/fetcher.ts` 中修改認證邏輯。

### 環境變數

確保設置以下環境變數：

```env
# .env.local 或 .env.development
NEXT_PUBLIC_API_BASE_URL=https://api.gaas.waterballsa.tw
```

### 目錄結構

```
services/api/
├── index.ts          # orval 生成的所有 API hooks 和類型（不要手動編輯）
├── fetcher.ts        # 自定義 fetch 客戶端
└── README.md         # 使用文檔
```

### 自定義配置

如需修改 API 生成配置，請編輯 `orval.config.ts`：

- 修改輸出目錄
- 調整操作名稱格式
- 添加自定義 hooks
- 配置錯誤處理

### 生成的 API Hooks

主要的 API hooks 包括：

- `useGetUser` - 獲取用戶資訊
- `useUpdateUser` - 更新用戶資訊
- `useGetRooms` - 獲取房間列表
- `useCreateRoom` - 創建房間
- `useJoinRoom` - 加入房間
- `useStartGame` - 開始遊戲
- `useEndGame` - 結束遊戲
- `useFastJoinRoom` - 快速加入房間
- `useFindGameRegistrations` - 查找遊戲註冊
- `useUpdateGameRegistration` - 更新遊戲註冊

### 常見問題

**Q: 如何添加新的 API endpoint？**
A: 後端更新 Swagger 文檔後，運行 `npm run api:generate` 即可自動生成新的客戶端代碼。

**Q: 生成的代碼可以手動修改嗎？**
A: 不建議。所有生成的代碼都會在下次運行 `api:generate` 時被覆蓋。

**Q: 如何處理認證錯誤？**
A: 檢查錯誤狀態碼，401 表示認證失敗：

```tsx
import { ApiError } from "@/services/api/orval-fetcher";

// 在錯誤處理中
if (error instanceof ApiError && error.status === 401) {
  // 重新導向到登入頁面
  router.push("/login");
}
```

**Q: 如何自動重新生成 API？**
A: 使用監聽模式：`npm run api:generate:watch`，當 swagger 文檔更新時會自動重新生成。
