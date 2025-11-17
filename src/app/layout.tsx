// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Rubik } from 'next/font/google';
import localFont from 'next/font/local';

// Configuração do Font Awesome (deve ficar no layout raiz)
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import "./globals.css"; // CSS global para toda a aplicação

// Definição de todas as fontes que o site usará
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

const epundaSlab = localFont({
  src: './fonts/Epunda_Slab/EpundaSlab-VariableFont_wght.ttf',
  variable: '--font-epunda-slab',
});

// Metadados base para o site inteiro
export const metadata: Metadata = {
  title: 'Eden - Gerenciador Financeiro',
  description: 'Aplicativo para ajudar na sua vida financeira pessoal',
  openGraph: {
    title: 'Eden - Gerenciador Financeiro',
    description: 'Aplicativo para ajudar na sua vida financeira pessoal',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// O layout raiz que aplica as fontes e a estrutura <html> e <body>
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${rubik.variable} ${epundaSlab.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}