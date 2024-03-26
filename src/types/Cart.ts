import { ProductDTO } from "./Product"

export type CartItemDTO = {
  id: number
  updatedAt: string
  productId: number
  product: ProductDTO
  quantity: number
}

export type CartDTO = {
  totalPrice: number
  cartItems: CartItemDTO[]
}

export type Cart = CartDTO
export type CartItem = CartItemDTO
