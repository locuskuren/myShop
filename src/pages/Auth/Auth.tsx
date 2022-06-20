import { useEffect } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

import './Auth.scss';

const Auth = () => {
  const pathname = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="auth">
      {pathname === '/login' && <Login />}
      {pathname === '/register' && <Register />}
    </div>
  );
};

export default Auth;
