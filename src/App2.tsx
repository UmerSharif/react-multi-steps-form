import React from 'react';

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error404 from './components/Error';
import Step1 from './components/Welcome';
import Step2 from './components/PersonalDetails/PersonalDetails';
import Step3 from './components/Skills';
import Step4 from './components/Experience';

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route path="/step1">
            <Step1 />
          </Route>
          <Route path="/step2">
            <Step2 />
          </Route>
          <Route path="/step3">
            <Step3 />
          </Route>
          <Route path="/step4">
            <Step4 />
          </Route>
          <Route path="/error_404">
            <Error404 />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
