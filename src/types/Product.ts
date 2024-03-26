export type ProductDTO = {
  id: number
  createdAt: string
  updatedAt: string
  price: number
  name: string
  url?: string
}

export type Product = ProductDTO
export type Products = Product[]
