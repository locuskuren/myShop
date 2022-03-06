import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';

import { useSelector } from '../../hooks/useTypedSelector';

import './Header.scss';
import SearchMenu from '../SearchMenu/SearchMenu';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user?.currentUser);
  const cartItems = useSelector((state) => state.cart.items);
  const isEmpty = cartItems.length === 0 ? true : false;

  const isHome =
    window.location.pathname.length <= 1 ||
    window.location.pathname.includes('#')
      ? true
      : false;
  useLocation(); //function is here to rerender comp on url change

  return (
    <nav>
      <div className="left">
        {isHome ? (
          <a href="#top">
            <span className="logo">myshop.</span>
          </a>
        ) : (
          <Link to="/">
            <span className="logo">myshop.</span>
          </Link>
        )}
      </div>
      {isHome && (
        <div className="center">
          <a href="#menswear">
            <span className="link">MENSWEAR</span>
          </a>
          <a href="#womenswear">
            <span className="link">WOMENSWEAR</span>
          </a>
          <a href="#electronics">
            <span className="link">ELECTRONICS</span>
          </a>
          <a href="#jewelery">
            <span className="link">JEWELRY</span>
          </a>
        </div>
      )}
      <div className="right">
        <Link to={`${currentUser ? '/profile' : '/login'}`}>
          <PersonIcon className="link-icon" />
        </Link>
        <Link to="/cart">
          <ShoppingBagIcon className={`link-icon${!isEmpty && '-items'}`} />
        </Link>

        <SearchIcon className="link-icon" onClick={() => setIsOpen(true)} />
        <SearchMenu open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </nav>
  );
};

export default Header;
