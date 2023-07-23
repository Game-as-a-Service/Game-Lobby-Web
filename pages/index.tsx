import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";

import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";
import Input from "@/components/shared/Input";
import {
  SOCKET_EVENT,
  useSocketCore,
} from "@/containers/provider/SocketProvider";
import { getEnv } from "@/lib/env";

export default function Home() {
  const { internalEndpoint } = getEnv();
  const [domain, setDomain] = useState(internalEndpoint);
  const [message, setMessage] = useState("");
  const [echoList, setEchoList] = useState<[string, string][]>([]);
  const { socket, emit } = useSocketCore();

  useEffect(() => {
    const linstener = (event: SOCKET_EVENT, response: any) => {
      setEchoList((preEchoList) => [
        ...preEchoList,
        [response.timestamp, response.content],
      ]);
    };
    if (domain) socket?.offAny(linstener);
    socket?.onAny(linstener);
    return () => {
      socket?.offAny(linstener);
    };
  }, [socket, domain]);

  useEffect(() => {
    document.cookie = `_domain=${domain}`;
  }, [domain]);

  const sendMessage = () => {
    emit?.(SOCKET_EVENT.CHAT_MESSAGE, {
      from: "SYSTEM",
      timestamp: new Date().toISOString(),
      content: message,
      to: "all",
    });
  };

  return (
    <>
      <h1 className="text-white">遊戲大廳！</h1>
      <div
        className="px-[18px] mt-[12px] mb-[22px]"
        style={{ width: "calc(100vw - 71px)" }}
      >
        <Carousel
          itemWidth={332}
          itemHeight={158}
          items={mockCarouselItems}
          itemsToSlide={2}
          autoplay
        />
      </div>
      <div className="p-2 m-2 w-2/3 flex flex-col gap-2 bg-gray-900">
        <Input label="Domain" value={domain} onChange={setDomain} />
        <Input
          label="Message"
          value={message}
          onChange={setMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          suffix={
            <Button className="text-xs" onClick={sendMessage}>
              送出
            </Button>
          }
        />
        <ul className="text-white">
          {echoList.map(([time, echo]) => (
            <li key={`${time}${echo}`}>{echo}</li>
          ))}
        </ul>
      </div>
      <CreateRoomModal />
      <Button component={Link} href="/rooms">
        查看房間列表
      </Button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
