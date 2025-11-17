import Image from "next/image";
import Link from "next/link";

export function Header(){
    return (
        <header className="grid sm:grid-cols-12 bg-white text-black border-y-[1px] border-gray-200 px-9 sm:px-12 py-4 w-full">

            <div className="hidden xl:flex xl:col-span-1">
            </div>
            <div className="flex flex-col flex-wrap sm:flex-row col-span-12 xl:col-span-10 sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex text-center items-center justify-center space-x-3">
                        <a href="/"><Image
                            src="/arvore maior.png"
                            alt="logo do eden"
                            width={53}
                            height={53}
                        />
                        </a>
                        <a href="/" className="text-[20px] font-medium hover:text-[#009c8d]  transition-colors delay-5 mr-10">EDEN</a>
                </div>
                <div className="flex flex-wrap justify-center">
                    <nav className="flex justify-center sm:justify-end">
                        <ul className="flex items-center gap-x-2 py-2">
                            <li>
                                <Link className="font-medium hover:text-[#009c8d] mr-4 transition-colors delay-5 " href='/'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-[#005a52] border-[#016f65] hover:text-[#009c8d] hover:border-[#009c8d] transition-colors delay-75 font-semibold border-2 py-2 sm:text-[18px] rounded-4xl px-6" href='/login'>
                                    Entrar
                                </Link>
                            </li>
                            <li>
                                <Link className="text-white font-semibold sm:text-[18px] border-2 p-2 px-6 rounded-4xl bg-[#005a52] border-[#005a52] hover:bg-[#009c8d] hover:border-[#009c8d] transition-colors delay-75 whitespace-nowrap" href='/cadastrar'>
                                    Cadastrar-se
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="hidden xl:flex xl:col-span-1"></div>
        </header>
    )
} 