import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Styles.css";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Home from "./pages/Home";
import City from "./pages/City";

export default function App() {
  return (
    <Router>
      <div className="app-con">
        <Nav />
        <div className="main-con">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/location/:location" component={City} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
