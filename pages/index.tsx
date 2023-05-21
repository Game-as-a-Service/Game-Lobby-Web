import { GetStaticProps } from "next"

import Button from "@/shared/components/Button"
import Toast from "@/shared/components/Toast"
export default function Home() {
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button></Button>
      <Toast state={"success"} size={"lg"} length={"md"}>
        GG EZ
      </Toast>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
