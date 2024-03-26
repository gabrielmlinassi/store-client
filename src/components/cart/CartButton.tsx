"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import cn from "classnames"

import { checkIsHome } from "@/utils/navigation"
import { CartArrow } from "./CartArrow"
import { useCart } from "@/hooks/useCart"
import { ShoppingBagIcon } from "lucide-react"

export const CartButton = () => {
  const cart = useCart()
  const pathname = usePathname()
  const isHome = checkIsHome(pathname)

  const itemsCount = cart.data?.cartItems?.length ?? 0

  return (
    <Link href="/cart" className={cn(["relative", isHome && "md:mr-[127px]"])}>
      <div className="hidden md:block">{isHome && <CartArrow />}</div>
      <span className="whitespace-nowrap flex gap-1 items-center">
        <ShoppingBagIcon />
        {itemsCount > 0 && (
          <div className="bg-yellow-400 rounded-full flex w-4 h-4 items-center justify-center absolute -right-1.5 -top-1.5">
            <span className="text-[10px] font-bold text-black mt-[1px]">{itemsCount}</span>
          </div>
        )}
      </span>
    </Link>
  )
}
