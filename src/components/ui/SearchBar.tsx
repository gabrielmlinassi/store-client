"use client"

import { useCallback, useState } from "react"
import Downshift, { useCombobox } from "downshift"

import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/types/Product"
import debounce from "lodash.debounce"
import Image from "next/image"
import { formatPrice } from "@/utils/cart"
import Link from "next/link"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>()

  const products = useProducts(searchTerm)

  const { isOpen, inputValue, getMenuProps, getItemProps, getInputProps } = useCombobox({
    id: "search-bar",
    items: products.data ? products.data : [],
    onInputValueChange: ({ inputValue }) => updateSearch(inputValue),
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearch = useCallback(
    debounce((searchTerm?: string) => setSearchTerm(searchTerm), 500),
    []
  )

  return (
    <Downshift itemToString={(item: Product | null) => (item ? item.name : "")}>
      {() => {
        return (
          <div className="w-full relative">
            <div className="flex">
              <input
                {...getInputProps()}
                className="focus:ring text-zinc-800 rounded-l-md px-3 py-2 md:py-3 bg-white grow"
                placeholder="Product name"
              />
              <button className="bg-amber-400 text-zinc-800 px-3 rounded-r-md">Search</button>
            </div>
            <div className="absolute mt-2 rounded-md bg-white w-full shadow">
              <ul {...getMenuProps()} className="divide-y">
                {isOpen && !!inputValue
                  ? products.data?.map((item, index) => (
                      <li key={item.id} {...getItemProps({ item, index })}>
                        <Link href={`/products/${item.id}`}>
                          <div className="text-black hover:bg-black/5 hover:cursor-pointer p-4 flex gap-3 items-center">
                            <figure className="w-[60px] h-[60px] relative">
                              {item.url && (
                                <Image src={item.url} fill alt={item.name} sizes="60px" className="rounded-md" />
                              )}
                            </figure>
                            <div>
                              <div className="text-xl">{item.name}</div>
                              <div className="text-lg">{formatPrice(item.price)}</div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        )
      }}
    </Downshift>
  )
}
