import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Chat from "@/components/shared/Chat";
import SearchBar from "@/components/shared/SearchBar";
import { useToast } from "@/components/shared/Toast";
import { useSocketCore } from "@/contexts/socket";
import { useUI } from "@/contexts/ui";
import useChat from "@/hooks/useChat";
import { cn } from "@/lib/utils";

type SocketConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

const SocketStatusIndicator = ({
  status,
}: {
  status: SocketConnectionStatus;
}) => {
  let bgColor = "bg-gray-400";
  let statusText = "連線中";

  switch (status) {
    case "connected":
      bgColor = "bg-green-500";
      statusText = "已連線";
      break;
    case "disconnected":
      bgColor = "bg-red-500";
      statusText = "已斷線";
      break;
    case "error":
      bgColor = "bg-yellow-500";
      statusText = "連線錯誤";
      break;
  }

  return (
    <div
      className="flex items-center space-x-2"
      aria-label={`Socket 狀態: ${statusText}`}
    >
      <div className={`w-3 h-3 rounded-full ${bgColor}`} />
      <span className="text-sm text-gray-300 hidden md:inline">
        {statusText}
      </span>
    </div>
  );
};

function AppLayout({ children }: React.PropsWithChildren) {
  const toast = useToast();
  const router = useRouter();
  const {
    isChatVisible,
    isSearchBarVisible,
    isSidebarVisible,
    isHeaderVisible,
    isUIVisible,
    toggleChat,
  } = useUI();

  const { roomId, messageList, sendChatMessage } = useChat();

  const { socketService } = useSocketCore();
  const [socketStatus, setSocketStatus] =
    useState<SocketConnectionStatus>("connecting");

  const roomPathname = "/rooms/[roomId]";

  useEffect(() => {
    const socketInstance = socketService.getSocket();

    if (socketInstance) {
      setSocketStatus(socketInstance.connected ? "connected" : "connecting");

      const handleConnect = () => setSocketStatus("connected");
      const handleDisconnect = () => setSocketStatus("disconnected");
      const handleConnectError = () => setSocketStatus("error");

      socketInstance.on("connect", handleConnect);
      socketInstance.on("disconnect", handleDisconnect);
      socketInstance.on("connect_error", handleConnectError);

      return () => {
        socketInstance.off("connect", handleConnect);
        socketInstance.off("disconnect", handleDisconnect);
        socketInstance.off("connect_error", handleConnectError);
      };
    } else {
      setSocketStatus("disconnected");
    }
  }, [socketService]);

  return (
    <>
      <Head>
        <title>遊戲微服務大平台</title>
      </Head>

      {/* 只在非全螢幕且 UI 可見時顯示 Header */}
      <Header
        className={cn(
          "fixed top-0 inset-x-0 z-40 opacity-0 transition-opacity",
          isUIVisible && isHeaderVisible && "opacity-100"
        )}
        isChatVisible={isChatVisible}
        onClickChatButton={toggleChat}
        socketStatusIndicator={<SocketStatusIndicator status={socketStatus} />}
      />

      <div className="pl-2 pt-20 flex grow">
        {/* 只在非全螢幕且 UI 可見時顯示 Sidebar */}
        <div
          className={cn(
            "shrink-0 basis-0 transition-[flex-basis]",
            isUIVisible && isSidebarVisible && "basis-[72px]"
          )}
        >
          <Sidebar
            className={cn(
              "fixed top-20 bottom-6 z-30 -translate-x-20 transition-transform",
              isUIVisible && isSidebarVisible && "translate-x-0"
            )}
          />
        </div>

        <main className="grow pb-4">
          {/* 只在非全螢幕且 UI 可見時顯示 SearchBar */}
          {isUIVisible && isSearchBarVisible && (
            <div className="flex justify-center mb-6">
              <SearchBar
                onSubmit={() =>
                  toast(
                    { children: "此功能暫未實現", state: "warning" },
                    { position: "top" }
                  )
                }
                leftSlot={
                  <button
                    type="button"
                    className="pl-5 pr-2.5 px-4 text-primary-300"
                  >
                    類型
                  </button>
                }
              />
            </div>
          )}
          {children}
        </main>

        {/* 只在非全螢幕且 UI 可見且 Chat 開啟時顯示 */}
        <div
          className={cn(
            "shrink-0 basis-0 mr-0 transition-[flex-basis]",
            isChatVisible && "basis-80 mr-4"
          )}
        >
          <Chat
            className={cn(
              "fixed top-20 bottom-6 z-30 translate-x-4 transition-transform",
              isChatVisible && "translate-x-0"
            )}
            roomId={roomId}
            friendList={[]}
            lobbyMessages={[]}
            roomMessages={messageList}
            defaultTarget={router.pathname === roomPathname ? "room" : "lobby"}
            onSubmit={sendChatMessage}
          />
        </div>
      </div>
    </>
  );
}

export default function getAppLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>;
}
