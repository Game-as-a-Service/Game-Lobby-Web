import Link from "next/link";
import Button from "@/components/shared/Button";
import { NextPageWithProps } from "./_app";

const WithoutLayout: NextPageWithProps = () => {
  return (
    <>
      <h1>這頁沒Layout</h1>
      <Button asChild>
        <Link href={"/"}>to Index</Link>
      </Button>
    </>
  );
};

WithoutLayout.getLayout = (page) => page;
WithoutLayout.Anonymous = true;

export default WithoutLayout;
