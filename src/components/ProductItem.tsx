import Image from "next/image"
import { BuyButton } from "./BuyButton"
import { Product } from "@/types/Product"
import { formatPrice } from "@/utils/cart"

type ProductProps = {
  product: Product
  quantity?: number
}

export const ProductItem = ({ product, quantity }: ProductProps) => {
  return (
    <div className="flex h-full flex-col rounded-md gap-4 overflow-hidden bg-zinc-200/50 border border-zinc-300">
      <figure className="border-b border-zinc-300">
        {product?.url && <Image src={product.url} alt={product.name} width={300} height={300} />}
      </figure>
      <div className="grow justify-between gap-2 px-6 flex flex-col">
        <div>{product.name}</div>
        <div className="font-bold text-xl text-orange-500">{formatPrice(product.price)}</div>
      </div>
      <div className="border-t border-zinc-300">
        <BuyButton productId={product.id} quantity={quantity} />
      </div>
    </div>
  )
}
