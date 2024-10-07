import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Authentication from './components/Authentication';
import Login from './pages/Login';
import Administrators from './pages/Administrators';
import Authorization from './components/Authorization';
import AboutHistory from './pages/AboutHistory';
import AboutMissionVision from './pages/AboutMissionVision';
import Hmo from './pages/Hmo';
import ServiceCenter from './pages/ServiceCenter';
import SpecialServiceCenter from './pages/SpecialServiceCenter';
import NewsEvents from './pages/NewsEvents';
import GeneralServiceCenter from './pages/GeneralServiceCenter';
import RadiologyServiceCenter from './pages/RadiologyServiceCenter';
import FeaturedServices from './pages/FeaturedServices';
import Careers from './pages/Careers';
import Appointments from './pages/Appointments';
import ResultAcc from './pages/ResultAcc';
import TermsPrivacy from './pages/TermsPrivacy';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authentication />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about/history" element={<AboutHistory />} />
            <Route
              path="/about/mission-vision"
              element={<AboutMissionVision />}
            />

            <Route path="/hmo" element={<Hmo />} />
            <Route path="/services/eye-center" element={<ServiceCenter />} />
            <Route
              path="/services/special-care"
              element={<SpecialServiceCenter />}
            />
            <Route
              path="/services/general"
              element={<GeneralServiceCenter />}
            />
            <Route
              path="/services/radiology"
              element={<RadiologyServiceCenter />}
            />
            <Route path="/services/featured" element={<FeaturedServices />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/appointment" element={<Appointments />} />
            <Route path="/results-account" element={<ResultAcc />} />
            <Route path="/terms-privacy" element={<TermsPrivacy />} />
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
