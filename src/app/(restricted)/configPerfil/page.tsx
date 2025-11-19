'use client'

import Loading from "@/components/loading/loading";
import { getMyAccountData } from "@/server/getUser";
import userUpdate from "@/server/user/userUpdate";
import { useEffect, useState } from "react";
import type React from "react";

export default function Page() {
    const [id, setId] = useState<string | undefined>()
    const [name, setName] = useState<string | undefined>()
    const [email, setEmail] = useState<string | undefined>()
    const [data, setDate] = useState<string | Date | undefined>()
    const [pais, setPais] = useState<string | undefined>()
    const [estado, setEstado] = useState<string | undefined>()
    const [status] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        data: '',
        pais: '',
        estado: ''

    });


    useEffect(() => {

        const fetchUserData = async () => {
            try {

                const userData = await getMyAccountData();
                if (userData) {
                    setId(userData.id)
                    setName(userData.name ?? undefined)
                    setEmail(userData.email ?? undefined)
                    setDate(userData.data ?? undefined)
                    setPais(userData.pais ?? undefined)
                    setEstado(userData.estado ?? undefined)
                } else {
                    throw new Error(' Erro nao há dados')
                }
            } catch (error) {
                console.error("Falha ao buscar dados da conta:", error);
            }
        };

        fetchUserData();
    }, []);


    useEffect(() => {
        const formattedDate = data 
                        ? new Date(data).toISOString().split('T')[0] 
                        : '';
        setFormData({
            nome: name || '',
            email: email || '',
            senha: '',
            data: formattedDate || '',
            pais: pais || '',
            estado: estado || ''
        });

    }, [name])


    const [erroValor, setErroValor] = useState({
        nome: '',
        email: '',
        senha: ''
    });


    if (isLoading) {
        return <Loading />;
    }

    if (status == 'error') {
        return <p>Ocorreu um erro!</p>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        // Verifica o erro ao modificar o campo
        // Validação de campo individual
        if (name == 'nome' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                nome: 'O nome é obrigatório.'
            }));
        } else if (name == 'nome' && value) {
            setErroValor(prevState => ({
                ...prevState,
                nome: ''
            }));
        }

        if (name == 'email' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                email: 'O email é obrigatório.'
            }));
        } else if (name == 'email' && value.indexOf('@') > 0) {
            setErroValor(prevState => ({
                ...prevState,
                email: 'O email deve ter \'@\''
            }));
        } else if (name == 'email' && value) {
            setErroValor(prevState => ({
                ...prevState,
                email: ''
            }));
        }

        if (name == 'senha' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                senha: 'A senha é obrigatória.'
            }));
        } else if (name == 'senha' && value) {
            setErroValor(prevState => ({
                ...prevState,
                senha: ''
            }));
        }
    };

    const validateForm = () => {
        const novosErros = {
            errors: 0,
            errosMsg: {
                nome: '',
                email: '',
                senha: ''
            }
        };

        // Validação de campo individual
        if (!formData.nome) {
            novosErros.errosMsg.nome = 'O nome é obrigatório.';
            novosErros.errors += 1;
        }

        if (!formData.email) {
            novosErros.errosMsg.email = 'O email é obrigatório.';
            novosErros.errors += 1;
        }

        if (!formData.senha) {
            novosErros.errosMsg.senha = 'A senha é obrigatória.';
            novosErros.errors += 1;
        }

        return novosErros;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.errors === 0 && erroValor.nome == '' && erroValor.email == '' && erroValor.senha == '') {
            // Formulário válido, pode enviar os dados
            setIsLoading(true);

            //Fazer a requisição e tirar o consolelog
            try{
                if(!id){
                    throw new Error('ID do usuário ausente');
                }
                const resposta = await userUpdate(id,formData)
                if(resposta)
                    throw new Error('Erro na atualização dos dados do usuario')

                //Mostrar algo melhor
                alert('Atualizado com Sucesso!')
            }catch(err){
                console.log(err)
            }

            setIsLoading(false);
        } else {
            if (erroValor.nome == '' && erroValor.email == '' && erroValor.senha == '') {
                // Formulário inválido, exibe os erros
                const erros = validationErrors.errosMsg;
                setErroValor({
                    nome: erros.nome,
                    email: erros.email,
                    senha: erros.senha
                });
            }
        }
    };

    return (
        <div className="shadow-md w-11.5/12 mt-4 m-auto p-3 md:p-7 border-2 border-gray-200 rounded-lg">
            <h1 className="text-4xl font-bold my-4 montserrat text-center">Configurações de Perfil</h1>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
                <h3 className="text-verde-escuro font-bold text-2xl mt-3 mb-6">Dados Pessoais</h3>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex gap-1 flex-col w-full md:w-1/2">
                        <div className="w-2/5">
                            <label className="font-semibold" htmlFor="nomeConta">Nome</label>
                        </div>
                        <div className="w-full">
                            <input type="text" id="nomeConta" value={formData.nome} onChange={handleChange} name="nome" placeholder="Nome da Conta" className="w-full p-1.5 border border-gray-300 rounded-md mb-4" />
                        </div>
                        {erroValor.nome != '' && <p className="text-red-500 text-sm mt-1">{erroValor.nome}</p>}
                    </div>
                </div>
                <div className="flex gap-1 flex-col">
                    <div className="w-2/10">
                        <label className="font-semibold" htmlFor="dtNascimento">Data de Nascimento</label>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <input type="date" onChange={handleChange} value={formData.data} id="dtNascimento" name="data" placeholder="Data de Nascimento" className="w-full p-1.5 border border-gray-300 rounded-md mb-4" />
                    </div>
                </div>

                <h3 className="text-verde-escuro font-bold text-2xl mt-3 mb-6">Dados Complementares</h3>
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex gap-1 flex-col w-full md:w-1/2">
                        <div className="w-2/5">
                            <label className="font-semibold" htmlFor="nmPais">Pais</label>
                        </div>
                        <div className="w-full">
                            <input type="text" onChange={handleChange} value={formData.pais} id="nmPais" name="pais" placeholder="Nome do Pais" className="w-full p-1.5 border border-gray-300 rounded-md mb-4" />
                        </div>
                    </div>
                    <div className="flex gap-1 flex-col w-full md:w-1/2">
                        <div className="w-2/5">
                            <label className="font-semibold" htmlFor="nmEstado">Estado</label>
                        </div>
                        <div className="w-full">
                            <input type="text" onChange={handleChange} id="nmEstado" value={formData.estado} name="estado" placeholder="Nome do Estado" className="w-full p-1.5 border border-gray-300 rounded-md mb-4" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                </div>

                <h3 className="text-verde-escuro font-bold text-2xl mt-3 mb-6">Dados Login</h3>

                <div className="flex gap-1 flex-col">
                    <div className="w-2/10">
                        <label className="font-semibold" htmlFor="nmEmail">Email</label>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <input type="email" value={formData.email} id="nmEmail" onChange={handleChange} name="email" placeholder="Email" className="w-full p-1.5 border border-gray-300 rounded-md mb-4" />
                    </div>
                    {erroValor.email != '' && <p className="text-red-500 text-sm mt-1">{erroValor.email}</p>}
                </div>
                <div className="flex gap-1 flex-col">
                    <div className="w-2/10">
                        <label className="font-semibold" htmlFor="senha">Senha</label>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <input type="password" id="senha" onChange={handleChange} name="senha" placeholder="Senha" className="w-full p-1.5 border border-gray-300 rounded-md mb-4" />
                    </div>
                    {erroValor.senha != '' && <p className="text-red-500 text-sm mt-1">{erroValor.senha}</p>}
                </div>
                <div className="w-full text-center mb-2">
                    <button type="submit" className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-md hover:bg-[#44c762] transition-colors delay-75">Salvar Alterações</button>
                </div>
            </form>
        </div>
    )
}