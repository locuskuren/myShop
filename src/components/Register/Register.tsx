import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loading, error, currentUser } = useSelector(
    (state) => state.userRegister
  );
  const { userRegister, userRegisterReset } = useActions();
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      userRegisterReset();
    };
  }, [userRegisterReset]);

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
    if (email === '') {
      setMessage("email can't be empty");
      return false;
    }
    if (password === '') {
      setMessage("password can't be empty");
      return false;
    }
    if (password !== confirmPassword) {
      setMessage("password doesn't match");
      return false;
    }
    return true;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validate()) {
      userRegister(username, password, email);
      if (currentUser) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
      }
    }
  };

  return (
    <div className="form-wrapper">
      <h1 className="register-title">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm passowrd"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
        {message && <span style={{ color: 'red' }}>{message}</span>}
        <button
          className="register-form-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default Register;
