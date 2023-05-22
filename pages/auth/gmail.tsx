import { ReactElement, useEffect } from "react"
import { useRouter } from "next/router"
import { login, LoginType } from "@/requests/auth/auth"
import useRequest from "@/shared/hooks/useRequest"
import { NextPageWithProps } from "../_app"
import useCookie from "@/shared/hooks/useCookie"
import useAuth from "@/shared/hooks/context/useAuth"

const Gmail: NextPageWithProps = () => {
  const { fetch } = useRequest()
  const {
    query: { code, state },
    push,
  } = useRouter()
  const { token } = useCookie()
  const { setToken } = useAuth()

  useEffect(() => {
    let isFetching: boolean = true

    ;(async function () {
      const result = await fetch(
        login({
          code: code as string,
          state: state as string,
          type: LoginType.GMAIL,
        })
      )
      if (isFetching) {
        token.set(result.token)
        setToken(result.token)
        push("/")
      }
    })()

    return () => {
      isFetching = false
    }
  }, [code, state, push, token, fetch, setToken])

  return <>Loading</>
}

Gmail.getLayout = (page: ReactElement) => page

export default Gmail
