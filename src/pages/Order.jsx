import { useState } from "react";
import { useHistory } from "react-router-dom";

function Order() {
  const history = useHistory();

  const [code, setCode] = useState("");

  const handleSearch = () => {
    history.push(`/restaurant/${code}/order`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 text-yellow-900 space-y-6">
      <label className="font-semibold text-2xl" htmlFor="search">
        Código do Restaurante
      </label>
      <input
        className="w-1/2 border border-gray-400 rounded px-4 py-1"
        type="text"
        id="search"
        onChange={(e) => setCode(e.target.value)}
        value={code}
      />
      <button
        className="bg-green-500 text-white font-semibold text-lg px-10 py-1 rounded"
        onClick={handleSearch}
      >
        Procurar
      </button>
    </div>
  );
}

export default Order;
