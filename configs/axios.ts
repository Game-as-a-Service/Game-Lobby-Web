import { CreateAxiosDefaults } from "axios"

const HALF_MINUTES = 1000 * 30

export const axios: CreateAxiosDefaults = {
  timeout: HALF_MINUTES,
  headers: { "Content-type": "application/json" },
}
