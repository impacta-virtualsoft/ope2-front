import React from 'react'
import Select from 'react-select'
import MealSVG from '~/assets/images/meal.svg'

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

const CardapioEdit = () => {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null)
  const [selectedOptionals, setSelectedOptionals] = React.useState(null)
  const [selectedExtras, setSelectedExtras] = React.useState(null)
  const [selectedType, setSelectedType] = React.useState(null)
  const inputPhotoRef = React.useRef<HTMLInputElement>(null)
  const handleFileButton = () => {
    if (inputPhotoRef && inputPhotoRef.current !== null) {
      inputPhotoRef.current.click()
    }
  }
  const handleFile = (e: any) => {
    console.log(e.target.files)
  }
  const recipeOptions = [
    {
      label: 'Afrodite: Hamburguer com Picles e Amendoim',
      value: 1,
    },
    { label: 'Zeus: Hamburguer Duplo', value: 2 },
    {
      label: 'Athena: Hamburguer com molho agridoce',
      value: 3,
    },
  ]
  const optionalsOptions = [
    {
      label: 'Tomate',
      value: 1,
      max: 2,
      min: 0,
    },
    {
      label: 'Alface',
      value: 2,
      max: 2,
      min: 0,
    },
    {
      label: 'Pão Francês',
      max: 1,
      min: 0,
      value: 3,
    },
  ]
  const extrasOptions = [
    {
      label: 'Batata Frita',
      value: 1,
      max: 1,
      min: 0,
    },
    {
      label: 'Refrigerante',
      value: 2,
      max: 1,
      min: 0,
    },
  ]
  const typeOptions = [
    {
      label: 'Receita',
      value: 1,
    },
    {
      label: 'Ingrediente',
      value: 2,
    },
    {
      label: 'Revenda',
      value: 3,
    },
  ]

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Novo Item de Cardápio
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Cadastre as informações de um novo item de cardápio
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
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tipo
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Select
                        options={typeOptions}
                        onChange={setSelectedType}
                        defaultValue={selectedType}
                        className="focus:ring-0 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        id="type"
                        name="type"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Receita: item que é processado (Exemplo: Hamburguer
                      Athena)
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Ingrediente: item que faz uma receita (Exemplo: Tomate)
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Revenda: item que é apenas de revenda (Exemplo:
                      Refrigerante)
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
                      <Select
                        options={recipeOptions}
                        onChange={setSelectedRecipe}
                        defaultValue={selectedRecipe}
                        className="focus:ring-0 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        id="recipe"
                        name="recipe"
                      />
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
                      <Select
                        options={optionalsOptions}
                        onChange={setSelectedOptionals}
                        defaultValue={selectedOptionals}
                        isMulti
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        id="optionals"
                        name="optionals"
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
                      <Select
                        options={extrasOptions}
                        onChange={setSelectedExtras}
                        defaultValue={selectedExtras}
                        isMulti
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                        id="extras"
                        name="extras"
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

export default CardapioEdit
