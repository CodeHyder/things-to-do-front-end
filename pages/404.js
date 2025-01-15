import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-xl text-gray-600 mb-4">
        Oops! Página não encontrada.
      </p>
      <Link href="/" passHref>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Voltar para a página inicial
        </button>
      </Link>
    </div>
  );
}