function Home() {
  return (
    <div className="flex flex-col items-center mt-20 space-y-20">
      <h1 className="text-4xl text-yellow-900">Bem Vindo!</h1>
      <div className="flex justify-center space-x-40">
        <button className="bg-red-500 h-60 w-60 text-white font-semibold text-2xl rounded">
          Sou Cliente
        </button>
        <button className="bg-green-500 h-60 w-60 text-white font-semibold text-2xl rounded">
          Sou Dono
        </button>
      </div>
    </div>
  );
}

export default Home;
