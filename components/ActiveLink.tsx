import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type ActiveLinkType = {
  children: React.ReactNode
  href: string
  className: string
  [key: string]: any
}
const ActiveLink = ({
  children,
  href,
  className,
  ...props
}: ActiveLinkType) => {
  const { asPath } = useRouter()
  const active = className + ' bg-gray-900 text-white'
  const inactive =
    className +
    ' text-gray-300 hover:bg-gray-700 hover:text-white dark:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'

  return (
    <Link href={href}>
      <a className={asPath === href ? active : inactive} {...props}>
        {children}
      </a>
    </Link>
  )
}

export default ActiveLink
