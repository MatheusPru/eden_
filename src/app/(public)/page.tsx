import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="flex flex-grow justify-center">
            <article className="grid grid-cols-12 2xl:grid-cols-12 flex-grow">
                <div className="hidden xl:block col-span-1"></div>
                <div className="col-span-12 h-full xl:col-span-10 bg-white p-8 px-9 sm:px-12">
                    <h1 className="text-center text-[20px] font-semibold mb-8">App Eden</h1>
                    <section className="space-y-4">
                        <h2 className="text-[19px] font-medium">
                            Descrição
                        </h2>
                        <p className="leading-relaxed"> Com o App Eden, você assume o controle da sua vida financeira. Nosso objetivo é simplificar o entendimento das suas finanças, transformando seus dados de gastos em análises inteligentes e gráficos fáceis de visualizar. Acompanhe sua evolução e tome decisões mais conscientes para o seu futuro. Fazemos analise do seus gasto por meio de inteligência articial e gráficos para visualizar seu trajeto ao decorrer dos meses: </p>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="col-span-1">
                                <Image 
                                src="/graficos/de-pizza.png" 
                                alt="Gráfico de pizza das despesas"
                                width={500} // Largura original da imagem
                                height={400} // Altura original da imagem
                                layout="responsive"
                                />
                            </div>
                            <div className="col-span-1">
                                <Image 
                                    src="/graficos/normal.png" // Caminho a partir da pasta public
                                    alt="Gráfico de barras das despesas mensais"
                                    width={500} // Largura original da imagem
                                    height={400} // Altura original da imagem
                                    layout="responsive"
                                />
                            </div>
                        </div>
                    </section>
                    <section className="space-y-4 mt-16">
                        <h2 className="text-[19px] font-bold text-gray-800 mb-8">
                            Como funciona?
                        </h2>
                        <ol className="space-y-6">
                            <li className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                bg-gray-500 text-white font-semibold rounded-full mr-4">
                                1
                            </span>
                            <p className="text-gray-700">
                                <span className="font-semibold">Cadastre-se:</span> Crie sua conta gratuita em menos de um minuto.
                            </p>
                            </li>

                            <li className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                bg-gray-500 text-white font-semibold rounded-full mr-4">
                                2
                            </span>
                            <p className=" text-gray-700">
                                <span className="font-semibold">Adicione suas Despesas:</span> Lance seus gastos manualmente ou conecte suas contas.
                            </p>
                            </li>

                            <li className="flex items-start">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center 
                                bg-gray-500 text-white font-semibold rounded-full mr-4">
                                3
                            </span>
                            <p className=" text-gray-700">
                                <span className="font-semibold">Comece a Economizar:</span> Visualize relatórios e tome decisões mais inteligentes.
                            </p>
                            </li>
                        </ol>
                    </section>
                    <section className="space-y-4 mt-16">
                        <h2 className="text-[19px] font-bold text-gray-800 my-6">
                            FAQ (Perguntas Frequentes)
                        </h2>

                        <ul className="space-y-6">
                            <li className="border-b border-gray-200 pb-2">
                            <h3 className="font-semibold text-gray-800">
                                O App Eden é gratuito?
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Sim! Você pode usar gratuitamente com todas as funcionalidades principais.
                            </p>
                            </li>

                            <li className="border-b border-gray-200 pb-2">
                            <h3 className="font-semibold text-gray-800">
                                Meus dados financeiros estão seguros?
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Sim, seus dados são protegidos com criptografia e seguimos boas práticas de segurança.
                            </p>
                            </li>

                            <li className="border-b border-gray-200 pb-2">
                            <h3 className="font-semibold text-gray-800">
                                Posso usar o app no celular e no computador?
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Claro! O App Eden funciona tanto em dispositivos móveis quanto em desktops.
                            </p>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="hidden xl:block col-span-1"></div>
            </article>
      </div>
    </>
  );
}
