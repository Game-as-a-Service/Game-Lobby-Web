import { ReactElement } from "react";
import { NextPageWithProps } from "./_app";

const Home: NextPageWithProps = () => {
  return <h1>這頁沒Layout</h1>;
};

Home.getLayout = (page: ReactElement) => page;

export default Home;
