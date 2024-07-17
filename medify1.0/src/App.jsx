import './App.css';
import NavBasic from './components/NavBasic';
import Heros from './components/Hero';
import Stats from './components/Stats';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './screens/Home';
// import UserLogin from './screens/UserLogin';
// import DoctorLogin from './screens/DoctorLogin';
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import DoctorOnboarding from './screens/DoctorOnboarding';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginChoice from './screens/Login';
import SignupChoice from './screens/Signup';
import DoctorLogin from './screens/DoctorLogin';
import DoctorSignup from './screens/DoctorSignup';
import UserSignup from './screens/UserSignup';
import UserLogin from './screens/UserLogin';
import Search from './screens/Search';
import Book from './screens/Book';
import AppointmentDetails from './screens/AppointmentDetails';


function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    <Routes>
      
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginChoice />} />
      <Route path='/signup' element={<SignupChoice />} />
      <Route path="/logindoctor" element={<DoctorLogin />} />
      <Route path="/signupdoctor" element={<DoctorSignup />} />
      <Route path="/signupuser" element={<UserSignup />} />
      <Route path="/loginuser" element={<UserLogin />} />
      <Route path="/search" element={<Search />} />
      <Route path="/appointment/:id" element={<Book />} />
      <Route path="/myappointment/:id" element={<AppointmentDetails />} />
      {/* <Route path="/signupdoctor" element={<DoctorOnboarding />} /> */}
      {/* <Route path="/loginuser" element={<UserLogin />} />
      <Route path="/logindoctor" element={<DoctorLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signupdoctor" element={<DoctorOnboarding />} /> */}
    </Routes>
    </BrowserRouter>

    <footer>
      <div className="pt-10" style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
      <p>Copyright &copy; Medify Inc. 2024</p>
      </div>
    </footer>
    </>
  );
}

export default App;