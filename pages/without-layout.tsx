import { ReactElement } from "react";
import { NextPageWithProps } from "./_app";
import Button from "@/shared/components/Button";
import Link from "next/link";

const WithoutLayout: NextPageWithProps = () => {
  return (
    <>
      <h1>這頁沒Layout</h1>
      <Button component={Link} href={"/"}>
        to Index
      </Button>
    </>
  );
};

WithoutLayout.getLayout = (page: ReactElement) => page;
WithoutLayout.Anonymous = true;

export default WithoutLayout;
