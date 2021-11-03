import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="pt-20">
        <Navbar />
        <Switch></Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
