'use client'

import { useRouter } from 'next/navigation'
import Header from '../header'

type Props = {
  href: '/register-client' | '/register-lawyer' | '/contact';
  resource: string;
  title: string;
  description: string;
  button: string;
}

export default function HeroSession(props: Props) {
  const router = useRouter()

  const handleNextPage = (href: string) => router.push(href)

  return (
    <div id="hero" className="bg-gray-50"> {/* Cor de fundo igual as outras seções */}
      <Header />

      <div className="px-6 pt-14 lg:px-8"> {/* Removido o fundo extra */}
        <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-36">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              {props.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl">
              {props.description}
            </p>

            {/* Botões empilhados */}
            <div className="mt-10 flex flex-col items-center gap-6">
              <a
                onClick={() => handleNextPage(props.href)}
                className="cursor-pointer w-full max-w-xs rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                {props.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
