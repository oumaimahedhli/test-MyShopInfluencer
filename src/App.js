import './App.css';
import { BrowserRouter as Router, Route, Switch } 
from "react-router-dom";
import brandList from "./components/BrandList";
import Statistic from "./components/Statistic";

function App() {
  return (
    <Router>
     

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/"]} component={brandList} />
          <Route exact path={"/domain/brand/:brandId"} component={Statistic} />
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
