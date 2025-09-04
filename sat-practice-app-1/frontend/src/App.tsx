import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import Home from './pages/Home';
import Results from './pages/Results';
import Practice from './pages/Practice';
import DebugPage from './pages/DebugPage';
import WelcomePopup, { shouldShowWelcomePopup } from './components/WelcomePopup';
import './App.css';

const App: React.FC = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  // Initialize Vercel Analytics
  useEffect(() => {
    inject();
  }, []);

  // Check if we should show welcome popup on app load
  useEffect(() => {
    const shouldShow = shouldShowWelcomePopup();
    if (shouldShow) {
      // Small delay to ensure the app is fully loaded
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
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
        
        {/* Welcome popup for new users */}
        {showWelcomePopup && (
          <WelcomePopup onClose={() => setShowWelcomePopup(false)} />
        )}
      </div>
    </Router>
  );
};

export default App;