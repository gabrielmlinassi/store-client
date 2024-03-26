"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { buttonVariants } from "@/components/ui/Button"
import { useOrders } from "@/hooks/useOrders"
import { OrdersList } from "./components/OrdersList"

export default function AccountPage() {
  const [tab, setTab] = useState<string>()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTab(window.location.hash.slice(1) || "orders")
    }
  }, [])

  return (
    <div className="h-[600px] max-w-7xl my-20 mx-auto border">
      <Tabs value={tab} onValueChange={setTab} className="grid grid-cols-[minmax(200px,auto),1fr] h-full">
        <TabsList className="flex-col flex gap-2 border-r p-10 rounded-none h-full justify-start">
          <TabsTrigger value="orders" asChild>
            <Link href="#orders" className={buttonVariants({ variant: "outline", className: "w-full" })}>
              Orders
            </Link>
          </TabsTrigger>
          <TabsTrigger value="settings" asChild>
            <Link href="#settings" className={buttonVariants({ variant: "outline", className: "w-full" })}>
              Settings
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <div className="px-10 py-5">
            <h1 className="text-3xl">Orders</h1>
          </div>
          <div className="border-t p-10">
            <OrdersList />
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="px-10 py-5">
            <h1 className="text-3xl">Settings</h1>
          </div>
          <div className="border-t p-10">content settings</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
