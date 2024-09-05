import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';


import Profiles from "./pages/Profiles";
import Home from "./pages/Home";
import Statistics from './pages/Statistics';
import Account from './pages/Coaches';
import Customers from './pages/Customers';
import Tips from './pages/Tips';
import Sign from './pages/Sign';

import AuthProvider from './components/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';


function App() {
  return (
    <main>
      <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/Home" element={<Home />}></Route>
                <Route path="/Coaches" element={<Account />}></Route>
                <Route path="/Customers" element={<Customers />}></Route>
                <Route path="/Tips" element={<Tips />}></Route>
              </Route>
              <Route path="/Sign" element={<Sign />}></Route>
              <Route path="/" element={<Sign />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </main>
  );
}

export default App;
