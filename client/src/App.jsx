import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/auth/PrivateRoute";
import OpenRoute from "./components/auth/OpenRoute";
import Footer from './components/common/Footer'
import Navbar from './components/common/Navbar'
import ContactUs from "./pages/Contactus";
// import ReportIssues from "./pages/ReportIssues";



function App() {
  return (
    <Router>
      <div className="bg-primary text-white w-screen h-screen overflow-x-hidden">
        <Navbar/>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
          <Route path="/contact" element={<ContactUs/>} />

          {/* private routes */}

          {/* <Routes path="/report" element={<ReportIssues/>}/> */}
          
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
