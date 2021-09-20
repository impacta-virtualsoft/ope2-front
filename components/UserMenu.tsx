import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { joinClasses } from '~/helpers/strings'
import ActiveLink from './ActiveLink'

type UserMenuType = {
  navUser: {
    label: string
    href: string | (() => void)
  }[]
  responsive?: boolean
}
const UserMenu = ({ navUser, responsive = false }: UserMenuType) => {
  if (responsive)
    return (
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0 h-10 w-10 relative">
            <Image
              className="rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              layout="fill"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              Tom Cook
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              tom@example.com
            </div>
          </div>
          <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Ver notificações</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 px-2 space-y-1">
          {navUser.map((item) =>
            typeof item.href === 'string' ? (
              <ActiveLink
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {item.label}
              </ActiveLink>
            ) : (
              <ActiveLink
                key={item.label}
                onClick={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {item.label}
              </ActiveLink>
            )
          )}
        </div>
      </div>
    )

  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Ver notificações</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* Profile dropdown */}
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white h-8 w-8 relative">
              <span className="sr-only">Abrir menu do usuário</span>
              <Image
                className="rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                layout="fill"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navUser.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => {
                    return typeof item.href === 'string' ? (
                      <Link href={item.href}>
                        <a
                          className={joinClasses(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ) : (
                      <a
                        className={joinClasses(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                        )}
                        onClick={item.href}
                      >
                        {item.label}
                      </a>
                    )
                  }}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

export default UserMenu
