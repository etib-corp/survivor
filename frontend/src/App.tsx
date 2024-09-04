import { Routes, Route } from 'react-router-dom';

import Profiles from "./pages/Profiles";
import Home from "./pages/Home";
import Statistics from './pages/Statistics';


function App() {
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Profiles" element={<Profiles/>}></Route>
          <Route path="/Statistics" element={<Statistics/>}></Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
