"use client"

import Link from "next/link"

import { Button, buttonVariants } from "./ui/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu"
import { useLogout } from "@/hooks/useLogout"
import { useSession } from "@/hooks/useSession"
import { UserIcon } from "lucide-react"

export const AccountMenu = () => {
  const logout = useLogout()
  const session = useSession()

  const onLogout = () => {
    logout.mutate()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-1">
          <UserIcon height={18} /> Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-2" align="end">
        {session.data?.isLoggedIn && (
          <DropdownMenuItem asChild>
            <Link href="/account" className={buttonVariants({ variant: "link", className: "w-full justify-start" })}>
              Settings
            </Link>
          </DropdownMenuItem>
        )}
        {session.data?.isLoggedIn ? (
          <DropdownMenuItem asChild>
            <Button onClick={onLogout} variant="link" className="w-full p-4 justify-start">
              Logout
            </Button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login" className={buttonVariants({ variant: "link", className: "w-full justify-start" })}>
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
