"use client"

import { AccountMenu } from "./AccountMenu"
import { Logo } from "./Logo"
import { CartButton } from "./cart/CartButton"
import { SearchBar } from "./ui/SearchBar"

export const Header = () => {
  return (
    <header className="grid grid-cols-[auto,1fr,auto] gap-4 md:gap-4 items-center border-b py-4 bg-zinc-800 text-white px-4 md:px-12">
      <Logo />
      <div className="flex items-center gap-5 md:col-start-3 place-self-end">
        <AccountMenu />
        <CartButton />
      </div>
      <div className="md:col-start-2 col-start-1 col-span-full md:col-span-1 flex justify-center md:row-start-1 max-w-3xl w-full mx-auto">
        <SearchBar />
      </div>
    </header>
  )
}
