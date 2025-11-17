'use server'

import { UpdateUserConfigs } from "@/services/userService";

interface formData  {
    nome: string;
    email: string;
    senha: string;
    data: string;
    pais: string;
    estado: string;
}

export default async function userUpdate(id:string,formData : formData):Promise<string|undefined> {
    if(formData){
        try{
            await UpdateUserConfigs(id,formData.nome,formData.email,formData.senha,new Date(formData.data),formData.pais,formData.estado)
        }catch(erro){
            return 'Deu erro! '+erro
        }
    }else{
        return 'Deu erro! formData esta vazio'
    }

}