import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { Login, Register } from './pages/Auth';
import { BookingOptions, BookingList } from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="booking-options/:id" element={<BookingOptions />} />
        <Route path="guides/:id" element={<BookingList type="guides" />} />
        <Route path="hotels/:id" element={<BookingList type="hotels" />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;