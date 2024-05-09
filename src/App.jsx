import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import AuthScreen from './pages/AuthScreen';
import ProtectedRoute from './pages/ProtectedRoute';
import SideBar, { SideBarElement } from './components/SideBar';

import { Home, LayoutDashboard } from 'lucide-react';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/authScreen" element={<AuthScreen />} />
        <Route path="/test" element={
        
          <SideBar>
            <SideBarElement icon={<Home size={20}/>} text='Home' alert />
            <SideBarElement icon={<LayoutDashboard size={20}/>} text='Dashboard' active />
            <hr className='my-3'/>
          </SideBar>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;