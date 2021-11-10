import { useHistory } from "react-router-dom";

function Navbar({ logout, logged_in }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
  };

  return (
    <div className="fixed left-0 right-0 top-0 h-16 bg-yellow-400">
      <nav className="flex h-full items-center justify-between px-12 text-yellow-900">
        <h1
          className="font-semibold uppercase text-lg"
          onClick={() => history.push("/")}
        >
          Robô Garçom
        </h1>
        {logged_in ? <button onClick={handleLogout}>Sair</button> : ""}
      </nav>
    </div>
  );
}

export default Navbar;
