import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import Menu from "./pages/Menu";
import Item from "./pages/Item";
import Order from "./pages/Order";
import MakeOrder from "./pages/MakeOrder";
import CheckOrders from "./pages/CheckOrders";

function App() {
  // localStorage.removeItem("token");
  const [logged_in, setLoggedIn] = useState(!!localStorage.getItem("token"));
  console.log(logged_in);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <div className="bg-yellow-100 h-screen">
      <BrowserRouter>
        <div className="pt-16 h-full">
          <Navbar logout={logOut} logged_in={logged_in} />
          <Switch>
            <GuardedRoute
              path="/"
              component={Home}
              auth={!logged_in}
              redirect="/restaurants"
              exact
            />
            <GuardedRoute
              path="/login"
              component={() => <Login login={logIn} />}
              auth={!logged_in}
              redirect="/restaurants"
              exact
            />
            <GuardedRoute
              path="/register"
              component={Register}
              auth={!logged_in}
              redirect="/restaurants"
              exact
            />
            <GuardedRoute
              path="/restaurants"
              component={Restaurant}
              auth={logged_in}
              redirect="/"
              exact
            />
            <GuardedRoute
              path="/menu/:id"
              component={Menu}
              auth={logged_in}
              redirect="/"
              exact
            />
            <GuardedRoute
              path="/menu/:id/item"
              component={Item}
              auth={logged_in}
              redirect="/"
              exact
            />
            <GuardedRoute
              path="/order"
              component={Order}
              auth={!logged_in}
              redirect="/restaurants"
              exact
            />
            <GuardedRoute
              path="/restaurant/:id/order"
              component={MakeOrder}
              auth={!logged_in}
              redirect="/restaurants"
              exact
            />
            <GuardedRoute
              path="/restaurant/:id/orders"
              component={CheckOrders}
              auth={logged_in}
              redirect="/"
              exact
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

function GuardedRoute({ component: Component, auth, redirect, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
}

export default App;
