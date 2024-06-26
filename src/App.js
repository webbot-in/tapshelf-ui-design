import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inventory from './pages/Inventory/Inventory';
import Dashboard from './pages/Dashboard/Dashboard';
import Reports from './pages/Reports/Reports';
import Suppliers from './pages/Suppliers/Suppliers';
import Orders from './pages/Orders/Orders';
import ManageStore from './pages/ManageStore/ManageStore';
import Settings from './pages/Settings/Settings';
import PageNotFound from './pages/Common/PageNotFound';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/inventory' element={<Inventory />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/reports' element={<Reports />}></Route>
        <Route path='/suppliers' element={<Suppliers />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/managestore' element={<ManageStore />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;