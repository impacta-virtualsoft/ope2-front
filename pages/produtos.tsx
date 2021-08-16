import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'
import { useSelect } from 'react-select-search/dist/cjs'
import MealSVG from '~/assets/images/meal.svg'
import { joinClasses } from '~/helpers/strings'

type ProductOptionalsAndExtras = {
  id: number
  name: string
  description: string
  price: number
  min: number
  max: number
  stockId: number
}
type ProductType = {
  id: number
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
  recipeId: number
  optionals: ProductOptionalsAndExtras[]
  extras: ProductOptionalsAndExtras[]
}

const dataExample: ProductType[] = [
  {
    id: 1,
    name: 'Super Trunfo',
    description: 'Hamburguer bovino de 200g com ',
    price: 8.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    recipeId: 1,
    optionals: [
      {
        id: 1,
        name: 'Alface',
        description: '',
        price: 0,
        min: 0,
        max: 0,
        stockId: 1,
      },
    ],
    extras: [
      {
        id: 2,
        name: 'Gergelim',
        description: '',
        price: 1.0,
        max: 1,
        min: 0,
        stockId: 2,
      },
    ],
  },
]

const CustomSelect = ({ options, value, multiple, disabled }) => {
  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value,
    multiple,
    disabled,
  })

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            {snapshot.displayValue}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        {/* <input
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 bg-white border-r-0"
        type="text"
        value={snapshot.displayValue}
        {...valueProps}
      />
      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 text-gray-500 text-sm">
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </span> */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* {snapshot.focus && ( */}
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {snapshot.options.map((option) => (
              <div
                className="py-1"
                key={option.value}
                {...optionProps}
                value={option.value}
              >
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={joinClasses(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {option.name}
                    </a>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
          {/* )} */}
        </Transition>
      </Menu>
    </>
  )
}

const Products = () => {
  const inputPhotoRef = React.useRef(null)
  const handleFileButton = () => {
    if (inputPhotoRef?.current) {
      inputPhotoRef.current.click()
    }
  }
  const handleFile = (e) => {
    console.log(e.target.files)
  }
  const recipeOptions = [
    {
      name: 'Afrodite: Hamburguer com Picles e Amendoim',
      value: 1,
    },
    { name: 'Zeus: Hamburguer Duplo', value: 2 },
    {
      name: 'Athena: Hamburguer com molho agridoce',
      value: 3,
    },
    {
      type: 'group',
      name: 'Receitas',
      items: [{ name: 'Spanish', value: 1 }],
      value: '',
    },
  ]

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Novo Produto
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Cadastre as informações de um novo produto
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                          placeholder="Hamburguer Simples"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Um nome que descreve o produto. Aparece como título do
                        produto nos apps também.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descrição
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Hamburguer de 100g com queijo prato derretido, no pão de hamburguer com gergelim, alface, tomate e maionese da casa"
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Breve descrição do produto. Aproveite pra informar os
                      itens da receita.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="recipe"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Receita
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <CustomSelect options={recipeOptions} id="recipe" />
                      {/* <input
                        type="text"
                        name="recipe"
                        id="recipe"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        placeholder="Receita de Hamburguer Simples"
                      /> */}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Procure pela receita ou selecione na lista. Ao selecionar
                      a receita, você terá o controle de estoque dos
                      ingredientes.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Foto
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="block h-48 w-96 bg-gray-100 px-10">
                        <MealSVG className="h-full m-auto opacity-30" />
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleFileButton}
                      >
                        Enviar foto
                      </button>
                      <input
                        type="file"
                        id="photo"
                        ref={inputPhotoRef}
                        onChange={handleFile}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF até 20MB
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="optionals"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Opcionais
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="optionals"
                        id="optionals"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        placeholder="Receita de Hamburguer Simples"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Lista de ingredientes a colocar ou tirar.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="extras"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Extras
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="extras"
                        id="extras"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        placeholder="Receita de Hamburguer Simples"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Lista de produtos que podem ser incluídos como sugestão.
                      Exemplo: Refrigerante, batata frita média, etc.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
