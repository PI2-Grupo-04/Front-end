import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-yellow-100 h-screen">
      <BrowserRouter>
        <div className="pt-16 h-full">
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
