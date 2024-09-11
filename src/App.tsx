import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Authentication from './components/Authentication';
import Login from './pages/Login';
import Administrators from './pages/Administrators';
import Authorization from './components/Authorization';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authentication />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route element={<Authorization />}>
              <Route path="/administrators" element={<Administrators />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
