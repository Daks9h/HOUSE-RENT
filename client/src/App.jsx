import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Navbar from './modules/common/Navbar';
import Home from './modules/common/Home';
import Login from './modules/common/Login';
import Register from './modules/common/Register';
import ForgotPassword from './modules/common/ForgotPassword';
import AdminRoute from './modules/common/AdminRoute';

// Admin Components
import AdminHome from './modules/admin/AdminHome';
import AllBookings from './modules/admin/AllBookings';
import AllProperty from './modules/admin/AllProperty';
import AllUsers from './modules/admin/AllUsers';

// Owner Components
import OwnerHome from './modules/user/owner/OwnerHome';
import AddProperty from './modules/user/owner/AddProperty';
import MyProperties from './modules/user/owner/AllProperties';
import OwnerBookings from './modules/user/owner/AllBookings';

// Renter Components
import RenterHome from './modules/user/renter/RenterHome';
import RenterProperties from './modules/user/renter/AllProperties';
import RenterBookings from './modules/user/renter/MyBookings';
import About from './modules/common/About';
import Contact from './modules/common/Contact';
import Footer from './modules/common/Footer';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            {/* Admin Routes - Protected (No standard Navbar/Footer) */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminHome />}>
              <Route path="/admin" element={<AllUsers />} />
              <Route path="/admin/users" element={<AllUsers />} />
              <Route path="/admin/properties" element={<AllProperty />} />
              <Route path="/admin/bookings" element={<AllBookings />} />
            </Route>
          </Route>

          {/* All other routes use the Standard Layout */}
          <Route path="*" element={<StandardLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

// Layout for Public, Owner, and Renter with the common Navbar
const StandardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Owner Routes */}
          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/owner/add-property" element={<AddProperty />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
          <Route path="/owner/all-properties" element={<MyProperties />} />

          {/* Renter Routes */}
          <Route path="/renter" element={<RenterHome />} />
          <Route path="/renter/properties" element={<RenterProperties />} />
          <Route path="/renter/bookings" element={<RenterBookings />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
