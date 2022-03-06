import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const { userLogin, userLoginErrorReset } = useActions();
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      userLoginErrorReset();
    };
  }, [userLoginErrorReset]);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const validate = (): boolean => {
    if (username === '') {
      setMessage("username can't be empty");
      return false;
    }
    if (password === '') {
      setMessage("password can't be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validate()) {
      userLogin(username, password);
      if (currentUser) {
        setUsername('');
        setPassword('');
      }
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <span style={{ color: 'red' }}>{message}</span>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <Link to="/register">
        <span className="link">Create Account</span>
      </Link>
    </div>
  );
};

export default Login;
