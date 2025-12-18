import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Wardrobe from './pages/Wardrobe';
import MixMatchLab from './pages/MixMatchLab';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public: Anyone can see these */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected: Redirects to /auth if not logged in */}
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/wardrobe" element={<ProtectedRoute><Wardrobe /></ProtectedRoute>} />
          <Route path="/lab" element={<ProtectedRoute><MixMatchLab /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;