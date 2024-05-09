import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import AuthScreen from './pages/AuthScreen';
import ProtectedRoute from './pages/ProtectedRoute';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomePage />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/authScreen" element={<AuthScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;