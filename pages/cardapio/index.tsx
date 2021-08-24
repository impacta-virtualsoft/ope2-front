import Link from 'next/link'

const CardapioIndex = () => {
  return (
    <>
      <h1>Vamos começar um layout aqui</h1>
      <nav>
        <ul className="list-disc list-inside">
          <li>
            <Link href="/cardapio/criar">
              <a>Criar um novo ítem de cardápio</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default CardapioIndex
