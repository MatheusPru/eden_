'use client'

import { useState } from 'react';
import '../../app/globals.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { realizeLogout } from '@/server/logout';

export function MenuCollapse(
    { children: elementReact }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await realizeLogout()

        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header>
            <button onClick={() => setIsOpen(!isOpen)} aria-controls="logo-sidebar" type="button" className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 z-50`}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform border-r sm:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
                <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-verde-escuro dark:bg-gray-800">
                    <div className="flex justify-end items-center mb-5">
                        <button
                            onClick={() => setIsOpen(false)} // Apenas fecha
                            type="button"
                            className="text-white rounded-lg p-1.5 sm:hidden" // sm:hidden para não aparecer no desktop
                        >
                            <span className="sr-only">Fechar menu</span>
                            {/* Ícone "X" (pode copiar este SVG) */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                    <ul className="space-y-3 font-medium ml-3">
                        <li>
                            <a href="/resumoMensal" className="flex items-center p-2 rounded-lg text-white  dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6H6m12 4H6m12 4H6m12 4H6" />
                                </svg>

                                <span className="flex-1 ms-3 text-center">Resumo</span>
                            </a>
                        </li>
                        <li>
                            <a href="/categorias" className="flex items-center p-2 rounded-lg text-white  dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z" />
                                </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap text-center">Categorias</span>
                            </a>
                        </li>
                        <li>
                            <a href="/movimentos" className="flex items-center p-2 rounded-lg text-white  dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-center">Movimentos</span>
                            </a>
                        </li>

                        <li>
                            <a href="/metas" className="flex items-center p-2 rounded-lg text-white  dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z" />
                                </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap text-center">Metas</span>
                            </a>
                        </li>
                        <li>
                            <a href="/configPerfil" className="flex items-center p-2 rounded-lg text-white  dark:hover:bg-gray-700 group">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>


                                <span className="flex-1 ms-3 whitespace-nowrap text-center">Conta</span>
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="flex items-center p-2 rounded-lg text-white w-full text-left dark:hover:bg-gray-700 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                                </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap text-center">{isLoading ? 'Saindo...' : 'Sair'}</span>
                            </button>
                        </li>
                    </ul>
                    <div className="mt-auto flex flex-col items-center pb-6 mr-2 mb-2">
                        <a href="/dashboard" className="flex flex-col items-center ps-2.5">
                            <Image
                                className='drop-shadow-md opacity-90 hover:opacity-100 transition mb-1'
                                src="/arvore maior.png"
                                alt="logo do eden"
                                width={70}
                                height={70}
                            />
                            <span className="text-xl font-bold whitespace-nowrap text-white montserra mb-1 ">EDEN</span>
                        </a>
                    </div>
                </div>
            </aside>

            <div className='p-4 sm:ml-64'>
                {elementReact}
            </div>
        </header>
    )
}
