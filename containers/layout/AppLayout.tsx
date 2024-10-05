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
    <div className="inset-0 flex flex-col w-full h-full">
      <Header onClickChatButton={toggleChatVisibility} />
      <div className="ml-2 mr-4 my-6 flex grow max-w-[100vw]">
        <div className="shrink-0">
          <Sidebar />
        </div>
        <main className="grow overflow-x-hidden">{children}</main>
        {isChatVisible && (
          <div className="shrink-0">
            <Chat
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
    </div>
  );
}
