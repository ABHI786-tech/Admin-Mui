import './index.css'
import MiniDrawer from './layout/ProtectedLayout'
import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import RegisterPage from './pages/RegisterPage';
import AddEmployee from './pages/AddEmployee';
import AddRights from './pages/AddRights';
import ViewRights from './pages/viewRights';
import AllRights from './pages/AllRights';
import AllEmployee from './pages/AllEmployee';
import AdminPage from './pages/adminPage';


function App() {


  return (
    <>
      
      <Routes>
        <Route element={<MiniDrawer />}>
          <Route path='/' element={<AdminPage />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/allemployee' element={<AllEmployee />} />
          {/* <Route path='/updateemployee/:id' element={<UpdateEmployee />} /> */}
          <Route path='/addrights' element={<AddRights />} />
          <Route path='/rights/populate' element={<AllRights />} />
          <Route path='/rights/:id' element={<ViewRights />} />
        </Route>

        <Route path='/login' element={<LoginPages />} />
        <Route path='/register' element={<RegisterPage />} />
        {/* <Route path='/forgetpassword' element={<Forgetpassword />} /> */}
        {/* <Route path='/resetpassword' element={<ResetPassword />} /> */}
      </Routes>
    </>
  )
}

export default App
