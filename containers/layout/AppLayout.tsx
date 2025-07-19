import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Chat from "@/components/shared/Chat";
import useChat from "@/hooks/useChat";
import Head from "next/head";
import SearchBar from "@/components/shared/SearchBar";
import { useToast } from "@/components/shared/Toast";
import { GameListProvider } from "@/contexts/game";
import { useSocketCore } from "@/contexts/socket";

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
    roomId,
    messageList,
    isChatVisible,
    openChat,
    toggleChatVisibility,
    sendChatMessage,
  } = useChat();
  const roomPathname = "/rooms/[roomId]";
  const isSearchBarVisible = ["/", "/rooms"].includes(router.pathname);
  const { socketService } = useSocketCore();

  const [socketStatus, setSocketStatus] =
    useState<SocketConnectionStatus>("connecting");

  useEffect(() => {
    if (router.pathname === roomPathname) {
      openChat();
    }
  }, [router.pathname, openChat]);

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
    <GameListProvider>
      <Head>
        <title>遊戲微服務大平台</title>
      </Head>
      <Header
        className="fixed top-0 inset-x-0 z-40"
        isChatVisible={isChatVisible}
        onClickChatButton={toggleChatVisibility}
        socketStatusIndicator={<SocketStatusIndicator status={socketStatus} />}
      />
      <div className="pl-2 pt-20 flex grow">
        <div className="shrink-0 w-18">
          <Sidebar className="fixed top-20 bottom-6 z-30" />
        </div>
        <main className="grow pb-4 overflow-x-hidden">
          {isSearchBarVisible && (
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
        {isChatVisible && (
          <div className="shrink-0 w-80 mr-4">
            <Chat
              className="fixed top-20 bottom-6 z-30"
              roomId={roomId}
              friendList={[]}
              lobbyMessages={[]}
              roomMessages={messageList}
              defaultTarget={
                router.pathname === roomPathname ? "room" : "lobby"
              }
              onSubmit={sendChatMessage}
            />
          </div>
        )}
      </div>
    </GameListProvider>
  );
}

export default function getAppLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>;
}
