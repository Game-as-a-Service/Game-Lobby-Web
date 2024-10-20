import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Chat from "@/components/shared/Chat/v2/Chat";
import useChat from "@/hooks/useChat";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const {
    roomId,
    messageList,
    isChatVisible,
    openChat,
    toggleChatVisibility,
    handleSubmitText,
  } = useChat();
  const roomPathname = "/rooms/[roomId]";

  useEffect(() => {
    if (router.pathname === roomPathname) {
      openChat();
    }
  }, [router.pathname, openChat]);

  return (
    <>
      <Header
        className="fixed top-0 inset-x-0 z-40"
        onClickChatButton={toggleChatVisibility}
      />
      <div className="pl-2 pt-20 flex grow">
        <div className="shrink-0 w-18">
          <Sidebar className="fixed top-20 bottom-6 z-30" />
        </div>
        <main className="grow overflow-x-hidden">{children}</main>
        {isChatVisible && (
          <div className="shrink-0 w-80 mr-4">
            <Chat
              className="fixed top-20 bottom-6 z-30"
              userId=""
              roomId={roomId}
              friendList={[]}
              lobbyMessages={[]}
              roomMessages={messageList}
              defaultTarget={
                router.pathname === roomPathname ? "room" : "lobby"
              }
              onSubmit={handleSubmitText}
            />
          </div>
        )}
      </div>
    </>
  );
}
