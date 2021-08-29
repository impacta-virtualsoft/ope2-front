import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import React from 'react'
import ActiveLink from './ActiveLink'
import UserMenu from './UserMenu'

type MainNavType = {
  navMain: {
    label: string
    href: string
  }[]
  navUser: {
    label: string
    href: string
  }[]
}
function MainNav({ navMain, navUser }: MainNavType) {
  return (
    <Disclosure as="nav" className="bg-gray-800 dark:bg-primary">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-8 w-8 relative">
                  <Image
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                    layout="fill"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navMain.map((item) => (
                      <ActiveLink
                        key={item.label}
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {item.label}
                      </ActiveLink>
                    ))}
                  </div>
                </div>
              </div>
              <UserMenu navUser={navUser} />
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Abrir menu principal</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            {/* Inside hamburguer menu */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navMain.map((item) => (
                <ActiveLink
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white dark:text-gray-900 dark:hover:bg-black dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.label}
                </ActiveLink>
              ))}
            </div>
            <UserMenu navUser={navUser} responsive />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default MainNav
