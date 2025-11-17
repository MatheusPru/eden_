import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from "next/link";

export function Footer() {
 return (
   <div className='w-full'>
        <footer className="grid sm:grid-cols-12 sm:grid-rows-1 text-white text-[.825rem] py-5">
            <div className="hidden xl:block col-span-1"></div>
            <div className="flex flex-col col-span-12 xl:col-span-10 p-8 px-9 sm:px-12">
                <div className='flex flex-wrap items-center space-x-4 mb-[32px]'>
                    <Link href="#" className="flex mr-2">
                            <Image src="/arvore maior.png" alt="logo do eden" width={53}
                        height={53} />
                    </Link>
                    <h1 className='font-medium text-xl'>EDEN</h1>
                </div>
                <div className="flex flex-wrap border-b-1 col-span-1">
                    <ul className="flex flex-wrap space-x-5  text-[.925rem] font-medium">
                        <Link href="#"className="flex hover:text-[#009c8d] mb-5"> Ajuda</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Fale conosco</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Desenvolvedores</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Acessibilidade</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Termos de Uso</Link>
                    </ul>
                </div>
                <div className="flex flex-wrap items-center justify-between space-x-4 border-b-1 mt-5">
                    <ul className="flex flex-wrap space-x-5  text-[.925rem] font-medium">
                        <Link href="#"className="flex hover:text-[#009c8d] mb-5"> Sobre</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Privacidade</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Cookies</Link>
                        <Link href="#" className="flex hover:text-[#009c8d] mb-5"> Segurança</Link>
                    </ul>
                    <div className="flex flex-wrap items-center space-x-4 mb-5 ">
                        <span className='text-[#929496]'>Copyright &copy; 2025</span> 
                        <ul>
                            <Link href="#"><FontAwesomeIcon icon={faInstagram} className="h-6 w-6 text-[#929496] hover:text-pink-500 transition-colors" /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faFacebookF} className="h-6 w-6 text-[#929496] hover:text-blue-600 transition-colors" /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faTwitter} className="h-6 w-6 text-[#929496] hover:text-sky-500 transition-colors" /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faLinkedinIn} className="h-6 w-6 text-[#929496] hover:text-blue-700 transition-colors" /></Link>
                            <Link href="#"><FontAwesomeIcon icon={faYoutube} className="h-6 w-6 text-[#929496] hover:text-red-600 transition-colors" /></Link>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap items-center space-x-4 pb-[20px] pt-15 text-[.9rem]">
                    <p>Todas as imagens exibidas são meramente ilustrativas. A experiência real varia de acordo com as atividades da conta e as operações serão representadas em real brasileiro. Sua jornada para a saúde financeira começa aqui, venha conosco.</p>
                    
                </div>
                
            </div>
            <div className="hidden xl:block col-span-1"></div>
            
        </footer>
   </div>
 );
}