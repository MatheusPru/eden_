'use client';

import { useState } from "react";
import { InputCategoria } from "../inputCategoria";
import { ListaCategoria } from "../listaCategoria";

export default function DadosCategoria(
    {dados}: {dados: {userID: string}}
){
    const [categorias, setCategoria] = useState<any[]>();
    return(
        <div className='flex flex-col gap-6'>
        <InputCategoria dados={dados} categorias={categorias} setCategoria={setCategoria} ></InputCategoria>
        <ListaCategoria dados={dados} categorias={categorias} setCategoria={setCategoria}></ListaCategoria>
        </div>
    )
}