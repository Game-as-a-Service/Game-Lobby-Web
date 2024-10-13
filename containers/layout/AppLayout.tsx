import { PropsWithChildren } from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Chat from "@/components/shared/Chat/v2/Chat";
import useChat from "@/hooks/useChat";

export default function Layout({ children }: PropsWithChildren) {
  const {
    roomId,
    messageList,
    isChatVisible,
    toggleChatVisibility,
    handleSubmitText,
  } = useChat();

  return (
    <>
      <Header
        className="sticky top-0 z-40"
        onClickChatButton={toggleChatVisibility}
      />
      <div className="ml-2 mr-4 my-6 flex grow">
        <div className="shrink-0">
          <Sidebar className="sticky top-20 z-30 h-main-height" />
        </div>
        <main className="grow overflow-x-hidden">{children}</main>
        {isChatVisible && (
          <div className="shrink-0">
            <Chat
              className="sticky top-20 z-30 h-main-height"
              userId=""
              roomId={roomId}
              friendList={[]}
              lobbyMessages={[]}
              roomMessages={messageList}
              onSubmit={handleSubmitText}
            />
          </div>
        )}
      </div>
    </>
  );
}
