import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import InitialHospital from './pages/InitialHospital';
import Profile from './pages/profile';
import Signup from './pages/Signup';
import { useUserStore } from './store/userStore';
import NotFound from './pages/NotFound';
import Myhospital from './pages/Myhospital';
import Hospitals from './pages/hospitals';
import Mypatients from './pages/Mypatient';
import Patients from './pages/patients';
import Mydonations from './pages/Mydonation';
import Donations from './pages/donations';
import './App.css';

function ProtectedRoutes() {
  const userStore =useUserStore((state)=> state);
  const isAuthenticated = userStore.isAuthenticated;
  const location = useLocation();


  const userrole=userStore.user?.role || localStorage.getItem('role')
  const hospitalId=useUserStore.user?.hospital?.id || localStorage.getItem('hospital_id')

  const isHospital = () =>{
    return userrole === 'hospital'
  }
  
   const isAdmin=()=>{
      return userrole==='admin'
    }

    const isDonor=()=>{
  return userrole==='donor'
}

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if(isHospital() && !hospitalId){
    return <Navigate to="/create/hospital" replace state={{ from: location }} />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />        
        <Route path="/create/hospital" element={<InitialHospital />}/>
        {isAdmin() && (
          <>
            <Route path="/users" element={<Users />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/donations" element={<Donations />} />
          </>
        )}

        {!isAdmin() && isHospital() && (<>
          <Route path="/my-hospital" element={<Myhospital />} />
          <Route path="/my-patients" element={<Mypatients />} />
            </>)}

        {(isAdmin() || isDonor()) && (
          <Route path="/patients" element={<Patients />} />
        )}
       { isDonor() && (
          <Route path="/my-donations" element={<Mydonations />} />
        )}
          <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
