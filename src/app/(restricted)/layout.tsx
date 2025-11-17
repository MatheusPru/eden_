import "@/app/globals.css";
import { MenuCollapse } from "@/components/menuCollapse";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <main className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
        <MenuCollapse>
            {children}
        </MenuCollapse>
        </main>
    </div>
  );
}