import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "@/app/globals.css"
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Esta div cria a estrutura de "sticky footer" para a seção pública
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex flex-grow">
        {children} {/* Aqui serão renderizadas as páginas (page.tsx) */}
      </main>

      <Footer />
    </div>
  );
}