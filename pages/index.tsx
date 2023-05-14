import { GetStaticProps } from "next";
import Cover from "@/shared/components/Cover";

export default function Home() {

  const cover1 = {
    src: "https://images.unsplash.com/photo-1683125695370-1c7fc9ff1315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160",
    alt: "Cover1",
  }

  const cover2 = {
    src: "http://localhost:3030/images/oc-gonzalez-xg8z_KhSorQ-unsplash.jpg",
    alt: "Cover2",
  }

  const cover3 = {
    src: "https://images.unsplash.com/photo-1682687218608-5e2522b04673?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550",
    alt: "Cover3",
  }

  return (
    <>
      <h1>遊戲大廳！</h1>
      {/* 使用className改變cover尺寸 */}
      {/* fill的啟用(true)會影響object-fit的屬性，如果為false的話，object-center不會顯示置中 */}
      <h3 className="text-2xl font-bold">Cover1自訂尺寸</h3>
      <Cover {...cover1} className="w-[220px] h-[123px]" fill={true} />
      <br></br>

      <h3 className="text-2xl font-bold">Cover2自訂螢幕大小變更圖片寬度</h3>
      <Cover {...cover3} className="w-full sm:w-[400px] md:w-[320px] lg:w-[150px]" fill={false} />
      <br></br>

      {/* 圖片預設尺寸 */}
      <h3 className="text-2xl font-bold">Cover3 圖片預設尺寸，fill預設為false，圖片會自動伸展</h3>
      <Cover {...cover2}  />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
