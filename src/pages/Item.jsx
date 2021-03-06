import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";

function Item() {
  const { id } = useParams();

  const [menu, setMenu] = useState(null);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(false);

  useEffect(async () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`menu/${id}`);

    setMenu(response.data.data);
  };

  const openModal = (item = null) => {
    setItem(item);

    setVisible(true);
  };
  const closeModal = () => setVisible(false);

  return (
    <div>
      <ItemModal
        visible={visible}
        id={id}
        item={item}
        fetch={fetchData}
        close={closeModal}
      />
      <div className="flex justify-center h-full">
        <div className="flex flex-col mt-10 space-y-4">
          <div className="flex justify-between space-x-8">
            <h1 className="text-yellow-900 text-2xl">
              {menu ? menu.name : ""}
            </h1>
            <button
              className="bg-green-500 px-4 text-white rounded"
              onClick={() => openModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ItemList
            items={menu}
            openModal={openModal}
            fetch={fetchData}
            menu_id={id}
          />
        </div>
      </div>
    </div>
  );
}

function ItemList(props) {
  const handleDelete = async (id) => {
    const response = await api.delete(`menu/${props.menu_id}/item/${id}`);
    props.fetch();
  };

  return props.items
    ? props.items.items.map((item) => (
        <div
          className="flex bg-red-400 space-x-8 justify-between text-white font-semibold py-2 pl-10 pr-4 rounded"
          key={item._id}
        >
          <div className="flex space-x-8">
            <div className="flex space-x-2">
              <span>ID:</span>
              <span>{item._id}</span>
            </div>
            <div className="flex space-x-2">
              <span>Nome:</span>
              <span>{item.name}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={(e) => {
                props.openModal(item);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                handleDelete(item._id);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))
    : "";
}

function ItemModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preparation_time, setTime] = useState("");

  const getDisplay = () => (props.visible ? "fixed" : "hidden");

  useEffect(async () => {
    if (props.item) {
      setName(props.item.name);
      setDescription(props.item.description);
      setPrice(props.item.price);
      setTime(props.item.preparation_time);
    }
  }, [props.item]);

  const handleSubmit = async () => {
    if (props.item) {
      await updateMethod();
    } else {
      await createMethod();
    }

    setName("");
    setDescription("");
    setPrice("");
    setTime("");

    props.fetch();
    props.close();
  };

  const createMethod = async () => {
    const response = await api.post(`menu/${props.id}/item`, {
      name,
      price,
      description,
      preparation_time,
    });
  };

  const updateMethod = async () => {
    const response = await api.put(`menu/${props.id}/item/${props.item._id}`, {
      name,
      price,
      description,
      preparation_time,
    });
  };

  return (
    <div
      className={
        getDisplay() +
        " flex justify-center items-center w-screen h-screen bg-black inset-0 m-auto bg-opacity-40"
      }
    >
      <div className="w-60 bg-yellow-300 text-yellow-900 px-2 pt-2 pb-4 rounded ">
        <div className="flex flex-col justify-between items-center h-full">
          <button className="self-end" onClick={props.close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex flex-col items-center space-y-3">
            <label htmlFor="itemName">Nome do Item</label>
            <input
              className="rounded px-2 bg-yellow-100"
              type="text"
              id="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="itemPrice">Pre??o do Item</label>
            <input
              className="rounded px-2 bg-yellow-100"
              type="number"
              id="itemPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="itemDescription">Descri????o do Item</label>
            <input
              className="rounded px-2 bg-yellow-100"
              type="text"
              id="itemDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="preparationTime">Tempo de preparo</label>
            <input
              className="rounded px-2 bg-yellow-100"
              type="number"
              id="preparationTime"
              value={preparation_time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-green-400 text-white font semibold py-1 w-full rounded mt-6"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
