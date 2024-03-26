import { HTTPError } from "ky"

import { Order } from "@/types/Order"
import { api } from "./api"

export async function confirmOrder({ paymentMethodId, orderId }: { paymentMethodId: string; orderId: number }) {
  try {
    const response = await api.post(`orders/${orderId}/confirm`, { json: { paymentMethodId } })
    return await (<Promise<Order>>response.json())
  } catch (e) {
    console.log(e)
    if (e instanceof HTTPError) {
      const errorMessage = await (e satisfies HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}
