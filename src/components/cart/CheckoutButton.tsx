"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/Button"
import { useCheckout } from "@/hooks/useCheckout"
import { useSession } from "@/hooks/useSession"

export const CheckoutButton = () => {
  const router = useRouter()
  const session = useSession()
  const checkout = useCheckout({ onSuccess: () => router.push("/checkout") })

  const handleCheckout = () => {
    if (!session.data?.isLoggedIn) router.push("/login?redirect-to=checkout")
    else checkout.mutate()
  }

  return (
    <Button onClick={handleCheckout} className="w-full">
      Checkout
    </Button>
  )
}
