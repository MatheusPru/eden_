import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-grow bg-[#f3f4f6] items-center justify-center min-h-screen pb-42">

      <div className="flex flex-col max-w-xl sm:rounded-2xl bg-white items-center justify-center p-8 w-full shadow-stone-500 shadow-sm">

        <div className="mb-8"> 
          <h1 id="font-epunda" className="font-medium text-[2rem] text-[#436543]">EDEN</h1>
        </div>

        <div className="w-full">
          <form action="" className="flex flex-col items-center gap-y-6">

            <div className="flex w-4/6 flex-col gap-y-4"> 

              <div className="flex flex-col gap-y-2"> 
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com"
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex flex-row gap-x-2.5 justify-center">
                <Link className="text-white sm:text-[15px] rounded-md bg-[#0f172b] w-full text-center py-2 hover:bg-[#1d2b4e] transition-colors delay-75 whitespace-nowrap" href='/cadastrar'>
                                    Recuperar Senha
                </Link>
              </div>
              <div className="flex flex-row justify-between" >
                <Link className="text-blue-600  underline text-[14px]" href='/cadastrar' id="linkLogin">
                                    Cadastrar-se
                </Link>
                <Link className="text-blue-600  underline text-[14px]" id="linkLogin" href='/login'>
                                    Voltar
                </Link>
              </div>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}