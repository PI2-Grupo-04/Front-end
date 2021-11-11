import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../service/api";

function MakeOrder() {
  const { id } = useParams();
  const history = useHistory();

  const [menus, setMenus] = useState(null);

  const [order, setOrder] = useState([]);

  const addItem = (menu, item) => {
    let old_menu = order.find((x) => x.menu == menu);

    if (old_menu) {
      old_menu.items.push(item);
    } else {
      old_menu = {
        menu: menu,
        items: [item],
      };
    }

    const old_order = order.filter((x) => x.menu != menu);

    setOrder([...old_order, old_menu]);
  };

  const removeItem = (menu, item) => {
    const old_menu = order.find((x) => x.menu == menu);

    old_menu.items = old_menu.items.filter((x) => x != item);

    const old_order = order.filter((x) => x.menu != menu);

    setOrder([...old_order, old_menu]);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("order", { order });
      alert("Pedido feito com sucesso");
      history.push("/order");
    } catch (error) {
      alert("Erro ao fazer o pedido");
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`restaurant/${id}/menu`);
    setMenus(response.data.data);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col w-1/2 space-y-6">
        <button
          className="self-end bg-green-500 text-white py-1 px-3 font-semibold rounded"
          onClick={handleSubmit}
        >
          Finalizar Pedido
        </button>
        <ListMenus menus={menus} add={addItem} remove={removeItem} />
      </div>
    </div>
  );
}

function ListMenus({ menus, add, remove }) {
  return menus
    ? menus.map((item) => (
        <div
          className="bg-red-400 w-full px-6 py-2 text-white text-xl font-semibold rounded"
          key={item._id}
        >
          <div className="mb-2">{item.name}</div>
          <ListItems
            items={item.items}
            menu={item._id}
            add={add}
            remove={remove}
          />
        </div>
      ))
    : "";
}

function ListItems({ items, menu, add, remove }) {
  return items
    ? items.map((item) => (
        <div
          className="flex text-base text-gray-900 font-normal px-2 py-1 rounded justify-between bg-red-300 my-2"
          key={item._id}
        >
          <div>
            <span className="font-semibold">Nome: </span>
            <span>{item.name}</span>
          </div>
          <div>
            <span className="font-semibold">Preço: </span>
            <span>{"R$ " + item.price}</span>
          </div>
          <div>
            <span className="font-semibold">Descrição: </span>
            <span>{item.description}</span>
          </div>
          <Button item={item._id} menu={menu} add={add} remove={remove} />
        </div>
      ))
    : "";
}

function Button({ item, menu, add, remove }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(menu, item);
    setAdded(true);
  };

  const handleRemove = () => {
    remove(menu, item);
    setAdded(false);
  };

  return added ? (
    <button onClick={handleRemove}>
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  ) : (
    <button onClick={handleAdd}>
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </button>
  );
}

export default MakeOrder;
