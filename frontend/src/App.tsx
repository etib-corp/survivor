import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from "./pages/Home";
import Account from './pages/Coaches';
import Customers from './pages/Customers';
import Tips from './pages/Tips';
import Compatibility from './pages/Compatibility';
import Sign from './pages/Sign';
import Wardrobe from './pages/Wardrobe';
import Events from './pages/Events';
import Quiz from './pages/Quiz';

import AuthProvider from './components/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';
import Error from './pages/404Error';
import QuizAdd from './pages/Quiz/Add';

function App() {
  return (
    <main>
      <div>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/Sign" element={<Sign />}></Route>
              <Route path="/" element={<Sign />}></Route>
              <Route path="*" element={<Error />}></Route>
              <Route element={<PrivateRoutes />}>
                <Route path="/Home" element={<Home />}></Route>
                <Route path="/Coaches" element={<Account />}></Route>
                <Route path="/Customers" element={<Customers />}></Route>
                <Route path="/Tips" element={<Tips />}></Route>
                <Route path="/Wardrobe" element={<Wardrobe />}></Route>
                <Route path="/Compatibility" element={<Compatibility />}></Route>
                <Route path="/Events" element={<Events />}></Route>
                <Route path="/Quiz" element={<Quiz />}></Route>
                <Route path="/Quiz/Add" element={<QuizAdd />}></Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </main>
  );
}

export default App;
