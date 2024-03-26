import ky from "ky"
import { apiUrl } from "@/consts"

export const api = ky.create({ prefixUrl: apiUrl, credentials: "include" })
