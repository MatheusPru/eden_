'use client';

import { useState } from "react";
import { InputCategoria } from "../inputCategoria";
import { ListaCategoria } from "../listaCategoria";

export default function DadosCategoria(
    {dados}: {dados: {userID: string}}
){
    interface Categoria {
        id: string;
        userId: string;
        name: string;
        description: string | null;
        valor: number | null;
        desconto: boolean;
    }
    const [categorias, setCategoria] = useState<Categoria[] | undefined>();
    return(
        <div className='flex flex-col gap-6'>
        <InputCategoria dados={dados} categorias={categorias} setCategoria={setCategoria} ></InputCategoria>
        <ListaCategoria dados={dados} categorias={categorias} setCategoria={setCategoria}></ListaCategoria>
        </div>
    )
}