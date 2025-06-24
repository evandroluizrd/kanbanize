'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import _ from 'lodash'

export default function Header() {
  
  const pathname = usePathname()
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return !_.includes(["/login", "/cadastro"], pathname) && (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <div onClick={() => router.push("/home")} className="-m-1.5 p-1.5">
            <span className="sr-only">Kanbanize</span>
            {/* <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            /> */}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <div onClick={() => router.push("/home")} className="cursor-pointer text-sm/6 font-semibold text-gray-900">
            Início
          </div>
          <div onClick={() => router.push("/kanban")} className="cursor-pointer text-sm/6 font-semibold text-gray-900">
            Kanban
          </div>
          <div onClick={() => router.push("/calendario")} className="cursor-pointer text-sm/6 font-semibold text-gray-900">
            Calendário
          </div>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div onClick={() => router.push("/login")} className="cursor-pointer text-sm/6 font-semibold text-gray-900">
            Sair <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div onClick={() => router.push("/home")} className="-m-1.5 p-1.5">
              <span className="sr-only">Kanbanize</span>
              {/* <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              /> */}
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Fechar menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div
                  onClick={() => router.push("/home")}
                  className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Início
                </div>
                <div
                  onClick={() => router.push("/kanban")}
                  className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Kanban
                </div>
                <div
                  onClick={() => router.push("/calendario")}
                  className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Calendário
                </div>
              </div>
              <div className="py-6">
                <div
                  onClick={() => router.push("/login")}
                  className="cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Sair
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
