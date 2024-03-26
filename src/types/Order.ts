import { ProductDTO } from "./Product"

export type OrderDTO = {
  id: number
  status: "PENDING" | "CANCELED" | "COMPLETED"
  totalPrice: number
  orderItems: {
    id: number
    productId: number
    product: ProductDTO
    quantity: number
    price: number
    orderId: number
  }[]
  paymentIntentClientSecret: string
}

export type Order = OrderDTO
export type Orders = Order[]
