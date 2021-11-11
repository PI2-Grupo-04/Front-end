import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";

function CheckOrders() {
  const { id } = useParams();

  const [orders, setOrders] = useState(null);

  const handleAccept = async (item) => {
    const response = await api.put(`restaurant/${id}/order/${item}/confirm`);
    fetchData();
  };

  const handleReject = async (item) => {
    const response = await api.put(`restaurant/${id}/order/${item}/reject`);
    fetchData();
  };

  useEffect(async () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`restaurant/${id}/orders`);
    setOrders(response.data.data.orders);
  };
  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col mt-10 space-y-4 ">
        <div className="flex justify-between space-x-8">
          <h1 className="text-yellow-900 text-2xl">Pedidos</h1>
        </div>
        <OrderList
          orders={orders}
          accept={handleAccept}
          reject={handleReject}
        />
      </div>
    </div>
  );
}

function OrderList({ orders, accept, reject }) {
  return orders
    ? orders.map((item) => (
        <div className="bg-red-400 text-white px-8 pt-2 rounded" key={item._id}>
          <h1 className="font-semibold text-xl mb-1">Pedido {item._id}</h1>
          <h2 className="text-lg my-1">
            <span className="font-semibold">Status: </span>
            {item.status}
          </h2>
          <h2 className="font-semibold text-lg my-1">Itens:</h2>
          <div className="flex flex-col space-y-2">
            <ItemList items={item.items} />
          </div>
          <div className="flex justify-between mt-2 pt-2 mb-2 ">
            <button
              className="bg-green-500 p-2 rounded-full"
              onClick={() => accept(item._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              className="bg-yellow-400 p-2 rounded-full"
              onClick={() => reject(item._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))
    : "";
}

function ItemList({ items }) {
  return items
    ? items.map((item) => (
        <div className="flex justify-between ml-4" key={item._id}>
          <div>
            <span>Nome: {item.name}</span>
          </div>
          <div>
            <span>Preço: {item.price}</span>
          </div>
        </div>
      ))
    : "";
}

export default CheckOrders;
