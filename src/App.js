import React, {  } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from "./Components/Gallery";
import HitDetails from "./Components/HitDetails";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



function App() {
  return (
      <div className="container">
          {/*<Gallery />*/}
          <Router>
              <div>
                  <Switch>
                      <Route path="/hits" component={Gallery}></Route>
                      <Route path="/hitDetails/:id" component={HitDetails} ></Route>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
