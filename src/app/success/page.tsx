import { buttonVariants } from "@/components/ui/Button"
import Link from "next/link"

interface SuccessPageProps {
  searchParams: {
    payment_intent?: string
    payment_intent_client_secret?: string
    redirect_status?: string
  }
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <div className="py-[200px] max-w-xl mx-auto text-center">
      <h1 className="text-4xl font-semibold mb-3">Order Confirmed!</h1>
      <div className="text-xl mb-6">{searchParams.payment_intent}</div>
      <Link href="/account" className={buttonVariants({ variant: "default" })}>
        View Order Status
      </Link>
    </div>
  )
}
