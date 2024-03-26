import { HTTPError } from "ky"

import { CartDTO } from "@/types/Cart"
import { Products } from "@/types/Product"
import { Order, Orders } from "@/types/Order"
import { api } from "./api"

export async function fetchCart() {
  const response = api.get("cart", { credentials: "include" })
  return await (<Promise<CartDTO>>response.json())
}

export async function fetchProducts(search?: string) {
  console.log("fetchProducts", search)
  const response = await api.get("products", { ...(!!search && { searchParams: { search } }) })
  return await (<Promise<Products>>response.json())
}

// export async function searchProduct(search: string) {
//   try {
//     const response = await api.get("products", { searchParams: search })
//   } catch (e) {
//     console.log(e)
//     throw e
//   }
// }

export async function editCart({ productId, quantity }: { productId: number; quantity?: number }) {
  const response = api.post("cart", { json: { productId, quantity }, credentials: "include" })
  return await (<Promise<CartDTO>>response.json())
}

export async function checkout() {
  try {
    const response = await api.post("cart/checkout")
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

export async function fetchCurrentOrder() {
  try {
    const response = await api.get("orders/current")
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

export async function fetchOrders() {
  try {
    const response = await api.get("orders")
    return await (<Promise<Orders>>response.json())
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
