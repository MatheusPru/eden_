export default function Loading() {
  // Você pode adicionar qualquer UI que quiser aqui, como um Skeleton.
  return (
    <div className='loadingContainer'>
      <div className='spinner'></div>
      <p>Carregando...</p>
    </div>
  );
}