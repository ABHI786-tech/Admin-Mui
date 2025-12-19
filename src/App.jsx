import './index.css'
import MiniDrawer from './layout/ProtectedLayout'
import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import RegisterPage from './pages/RegisterPage';
import AddEmployee from './pages/AddEmployee';
import AddRights from './pages/AddRights';
import AllRights from './pages/AllRights';
import AllEmployee from './pages/AllEmployee';
import ForgetPassword from './pages/ForgetPassword';
import ContactUs from './pages/ContactUs';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import DashboradPage from './pages/DashboradPage';
import "react-toastify/dist/ReactToastify.css";
import UpdateEmployee from './pages/UpdateEmployee';
import NewNavbar from './components/NewNavbar';
import ViewRights from './pages/ViewRights';




function App() {


  return (
    <>
         {/* 🔥 Navbar always on top */}
      {/* <NewNavbar /> */}
      <Routes>
        <Route element={<MiniDrawer />}>
          <Route path='/' element={<DashboradPage />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/allemployee' element={<AllEmployee />} />
          <Route path='/updateemployee/:id' element={<UpdateEmployee />} />
          <Route path='/addrights' element={<AddRights />} />
          <Route path='/rights/populate' element={<AllRights />} />
          <Route path='/rights/:id' element={<ViewRights />} />
        <Route path='/contactus' element={<ContactUs />} />
        </Route>
        <Route path='/login' element={<LoginPages />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
    </Routes >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </>
  )
}

export default App
