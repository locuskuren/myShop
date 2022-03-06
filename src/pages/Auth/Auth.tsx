import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

import './Auth.scss';

const Auth = () => {
  const pathname = window.location.pathname;
  console.log(pathname);

  return (
    <div className="auth">
      {pathname === '/login' && <Login />}
      {pathname === '/register' && <Register />}
    </div>
  );
};

export default Auth;
