import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Wardrobe from './pages/Wardrobe';
import MixMatchLab from './pages/MixMatchLab';
import Auth from './pages/Auth';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/lab" element={<MixMatchLab />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;