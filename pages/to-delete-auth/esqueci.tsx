import { LockClosedIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="relative mx-auto h-12 w-auto">
            <Image
              className=""
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
              layout="fill"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Esqueci a senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entre com o email cadastrado que enviaremos a senha para ele
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Enviar Senha
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/auth/entrar">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  &lt; Voltar para a entrada
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.CustomLayout = function customLayout(page: React.ReactElement) {
  return <>{page}</>
}

export default Login
