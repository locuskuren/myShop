import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import Auth from './pages/Auth/Auth';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Search from './pages/Search/Search';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:searchTerm" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
