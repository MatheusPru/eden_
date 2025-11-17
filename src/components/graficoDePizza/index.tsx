'use client'; // Essencial para renderizar no navegador

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // Elemento para desenhar as fatias da pizza
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Registra os componentes necessários para o gráfico de pizza
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);
type Movimentacao = {
  data: Date;
  id: string;
  userId: string;
  nome: string;
  descricao: string | null;
  valor: number;
  categoriaId: string;
}
interface Categorias {
  [key: string]: {
    valor: number;
    nome: string;
    desconto: boolean;
  };
}
function gerarNumeroAleatorioSeguro(min: number, max: number): number {
  // Cria um array de 1 byte (que pode conter um valor de 0 a 255)
  const randomBuffer = new Uint8Array(1);

  // Preenche o array com um valor aleatório seguro
  window.crypto.getRandomValues(randomBuffer);

  // Pega o valor (0-255) e o ajusta para o intervalo desejado (min-max)
  const randomNumber = randomBuffer[0];
  
  return min + (randomNumber % (max - min + 1));
}
// Define os dados estáticos para o gráfico


// Define as opções de configuração do gráfico
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Distribuição das suas Movimentações por Categoria',
      font: {
        size: 16,
      }
    },
  },
};


export function PieChart({ movimentacoes, categorias }: { movimentacoes: Movimentacao[], categorias: Categorias | undefined }) {
  const nomeCategorias = categorias ?
      Object.entries(categorias)
        .filter(([categoriaId, categoria]) =>
          movimentacoes.some(movimentacao => movimentacao.categoriaId === categoriaId)
        )
        .map(([categoriaId, categoria]) => categoria.nome)
      : []
  const idsDasCategorias = categorias ? Object.entries(categorias)
        .filter(([categoriaId, categoria]) =>
          movimentacoes.some(movimentacao => movimentacao.categoriaId === categoriaId)
        ).map(([categoriaId, categoria]) => categoriaId): []
  const values = idsDasCategorias.map(categoria => {
    let sum = 0
    for(const movimentacao of movimentacoes){
      if(movimentacao.categoriaId === categoria)
        sum += movimentacao.valor
    }
    return sum
  })
  const cores = nomeCategorias.map(() =>`rgba(${gerarNumeroAleatorioSeguro(0, 255)}, ${gerarNumeroAleatorioSeguro(0, 255)}, ${gerarNumeroAleatorioSeguro(0, 255)}, 1.0)`)
  const data = {
    labels: nomeCategorias,
    datasets: [
      {
        // Os valores correspondentes a cada rótulo
        data: values,
        // Cores de fundo para cada fatia. O número de cores deve ser igual ao de rótulos/dados.
        backgroundColor: cores,
        borderColor: '#FFFFFF', 
        borderWidth: 2,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}