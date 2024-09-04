import { Routes, Route } from 'react-router-dom';

import Profiles from "./pages/Profiles";
import Home from "./pages/Home";
import Statistics from './pages/Statistics';
import Account from './pages/Coaches';
import Customers from './pages/Customers';
import Events from './pages/Events';


function App() {
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/Customers" element={<Customers/>}></Route>
          <Route path="/Profiles" element={<Profiles/>}></Route>
          <Route path="/Statistics" element={<Statistics/>}></Route>
          <Route path="/Events" element={<Events/>}></Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
