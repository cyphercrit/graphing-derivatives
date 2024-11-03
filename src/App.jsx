import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GraphingDerivatives from './pages/GraphingDerivatives';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphingDerivatives />} />
      </Routes>
    </Router>
  );
}

export default App;