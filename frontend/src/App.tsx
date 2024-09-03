import { Routes, Route } from 'react-router-dom';

import Profiles from "./pages/Profiles";
import Home from "./pages/Home";
import Statistics from './pages/Statistics';
import Account from './pages/Account';


function App() {
  // return (
  //   <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
  //     <h1 className="text-2xl dark:text-white">
  //       Flowbite React + Create React App
  //     </h1>
  //     <DarkThemeToggle />
  //     <Profiles />
  //   </main>
  // );
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/Profiles" element={<Profiles/>}></Route>
          <Route path="/Statistics" element={<Statistics/>}></Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
