import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import Home from './pages/Home';
import Results from './pages/Results';
import Practice from './pages/Practice';
import DebugPage from './pages/DebugPage';
import './App.css';

const App: React.FC = () => {
  // Initialize Vercel Analytics
  useEffect(() => {
    inject();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/results" component={Results} />
          <Route path="/practice" component={Practice} />
          <Route path="/debug" component={DebugPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;