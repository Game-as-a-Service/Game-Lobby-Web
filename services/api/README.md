# API Services

這個目錄包含了所有與 API 相關的服務和配置。

## 文件結構

- `fetcher.ts` - Orval 自定義 fetcher，處理 JWT 認證和錯誤處理
- `index.ts` - 自動生成的 API hooks（由 Orval 生成）
- `swrConfig.ts` - SWR 全局配置和工具函數
- `README.md` - 這個文件

## SWR 配置使用指南

### 基本使用

項目已經在 `_app.tsx` 中配置了全局 SWRConfig，所以你可以直接使用 Orval 生成的 hooks：

```typescript
import { useGetUser, useGetRooms } from "@/services/api";

const MyComponent = () => {
  // 使用全局配置
  const { data: user, error, isLoading } = useGetUser();

  const { data: rooms } = useGetRooms({
    status: "active",
    page: 1,
    perPage: 10,
  });

  return (
    <div>
      {isLoading && <div>載入中...</div>}
      {error && <div>錯誤: {error.message}</div>}
      {user && <div>歡迎, {user.nickname}</div>}
    </div>
  );
};
```

### 使用特定配置

如果需要為特定的 API 調用使用不同的配置：

```typescript
import { useGetUser } from "@/services/api";
import { swrConfigs } from "@/services/api/swrConfig";

const UserProfile = () => {
  // 使用靜態配置 - 不會自動重新驗證
  const { data: user } = useGetUser({
    swr: swrConfigs.static,
  });

  return <div>{user?.nickname}</div>;
};

const ChatRoom = () => {
  // 使用實時配置 - 快速更新
  const { data: rooms } = useGetRooms(
    { status: "active", page: 1, perPage: 10 },
    { swr: swrConfigs.realtime }
  );

  return <div>房間數量: {rooms?.rooms.length}</div>;
};
```

### 錯誤處理

你可以使用提供的工具函數來處理錯誤：

```typescript
import { useGetUser } from "@/services/api";
import { isApiError, getErrorMessage } from "@/services/api/swrConfig";

const MyComponent = () => {
  const { data, error } = useGetUser();

  if (error) {
    if (isApiError(error)) {
      // API 錯誤 - 有狀態碼和詳細信息
      console.log("API 錯誤狀態:", error.status);
      console.log("錯誤數據:", error.data);
    }

    const message = getErrorMessage(error);
    return <div>發生錯誤: {message}</div>;
  }

  return <div>{data?.nickname}</div>;
};
```

### 自定義配置

創建你自己的配置：

```typescript
import { createConfiguredSWR } from "@/services/api/swrConfig";
import { useGetRooms } from "@/services/api";

const MyComponent = () => {
  // 創建自定義配置
  const customConfig = createConfiguredSWR({
    refreshInterval: 30000, // 30 秒刷新一次
    revalidateOnFocus: false, // 不在聚焦時重新驗證
  });

  const { data } = useGetRooms(
    { status: "active", page: 1, perPage: 10 },
    { swr: customConfig }
  );

  return <div>房間列表</div>;
};
```

## 可用的配置預設

### 1. `swrConfig` (默認)

- 平衡的配置，適合大多數用途
- 包含錯誤重試、去重、焦點重新驗證等

### 2. `swrConfigs.realtime`

- 適用於快速變化的數據（如聊天室狀態）
- 1 秒自動刷新
- 較短的去重間隔

### 3. `swrConfigs.static`

- 適用於靜態數據（如用戶設置）
- 不自動刷新
- 不在焦點時重新驗證

### 4. `swrConfigs.once`

- 適用於一次性數據
- 完全禁用重新驗證

### 5. `swrConfigs.cacheFirst`

- 緩存優先策略
- 只在網絡重連時更新

## 最佳實踐

1. **使用類型安全的錯誤處理**：

   ```typescript
   if (isApiError(error)) {
     // 處理 API 錯誤
   }
   ```

2. **根據數據特性選擇配置**：

   - 用戶資料：`static`
   - 聊天訊息：`realtime`
   - 遊戲列表：`default`

3. **利用 SWR 的緩存機制**：

   ```typescript
   // 相同的 key 會共享緩存
   const { data: user1 } = useGetUser(); // 第一次請求
   const { data: user2 } = useGetUser(); // 使用緩存
   ```

4. **手動重新驗證**：

   ```typescript
   const { data, mutate } = useGetUser();

   // 手動刷新數據
   const handleRefresh = () => {
     mutate();
   };
   ```

## 環境差異

- **開發環境**：更頻繁的重新驗證，詳細的日誌
- **生產環境**：較少的重新驗證，5 分鐘自動刷新

## 故障排除

1. **數據不更新**：檢查是否使用了 `static` 配置
2. **請求過於頻繁**：檢查 `refreshInterval` 設置
3. **錯誤重試過多**：調整 `errorRetryCount` 和 `shouldRetryOnError`
