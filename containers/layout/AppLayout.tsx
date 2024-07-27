import { PropsWithChildren, useReducer } from "react";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Chat from "@/components/shared/Chat/v2/Chat";

export default function Layout({ children }: PropsWithChildren) {
  const [isChatVisible, toggleChatVisibility] = useReducer(
    (preState) => !preState,
    false
  );

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
              friendList={[]}
              lobbyMessages={[]}
              roomMessages={[]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
