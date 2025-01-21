'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

type Href = '/clients' | '/lawyers'

type Navigation = {
  name: string;
  href: Href;
}

const navigation: Navigation[] = [
  { name: 'Clients', href: '/clients' },
  { name: 'Lawyers', href: '/lawyers' },
]

export default function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNextPage = (href: string) => router.push(href)

  return (
    <header className="bg-white shadow-sm">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        {/* Logo (imagem sem link) */}
        <div className="flex lg:flex-1">
          <img
            alt="Logo"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </div>

        {/* Menu mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Menu de navegação (Desktop) */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              onClick={() => handleNextPage(item.href)}
              className="cursor-pointer text-sm font-semibold text-gray-900 hover:text-indigo-600"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Botão de login (Desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            onClick={() => handleNextPage('/sign-in')}
            className="cursor-pointer text-sm font-semibold text-gray-900 hover:text-indigo-600"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Menu mobile */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <img
              alt="Logo"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                onClick={() => handleNextPage(item.href)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
            <div className="py-6">
              <a
                onClick={() => handleNextPage('/sign-in')}
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log in
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
