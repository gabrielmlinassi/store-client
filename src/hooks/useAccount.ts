import { apiUrl } from "@/consts"
import { useQuery } from "@tanstack/react-query"
import ky from "ky"

const fetchAccount = () => {
  ky.get(`${apiUrl}/`)
}

export const useAccount = () => {
  const {} = useQuery({ queryKey: [""], queryFn: fetchAccount })
}
