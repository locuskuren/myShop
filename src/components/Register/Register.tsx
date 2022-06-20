import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import validator from 'validator';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const { userRegister, userErrorReset } = useActions();
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      userErrorReset();
    };
  }, [userErrorReset]);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  console.log(validator.isEmail(email));

  const validate = (): boolean => {
    if (username === '') {
      setMessage("username can't be empty");
      return false;
    }
    if (email === '') {
      setMessage("email can't be empty");
      return false;
    }
    if (!validator.isEmail(email)) {
      setMessage(`email should be formated as "johndoe@gmail.com"`);
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
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          value={username}
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
      <Link to="/login">
        <span className="link">Have an account</span>
      </Link>
    </div>
  );
};

export default Register;
