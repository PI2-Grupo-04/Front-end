import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import Menu from "./pages/Menu";
import Item from "./pages/Item";
import Order from "./pages/Order";

function App() {
  return (
    <div className="bg-yellow-100 h-screen">
      <BrowserRouter>
        <div className="pt-16 h-full">
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/restaurants" component={Restaurant} exact />
            <Route path="/menu/:id" component={Menu} exact />
            <Route path="/menu/:id/item" component={Item} exact />
            <Route path="/order" component={Order} exact />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
