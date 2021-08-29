import React from 'react'

type HeaderType = {
  title: string
}
function Header({ title }: HeaderType) {
  return (
    <header className="bg-white shadow dark:bg-black">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-primary">
          {title}
        </h1>
      </div>
    </header>
  )
}

export default Header
