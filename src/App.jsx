import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
