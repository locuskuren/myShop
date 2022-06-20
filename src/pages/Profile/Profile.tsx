import { useEffect } from 'react';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import './Profile.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { error, loading, orders } = useSelector((state) => state.orders);
  const { userLogout, fetchOrders } = useActions();
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    currentUser && fetchOrders(currentUser._id);
  }, [fetchOrders, currentUser]);

  return (
    <div className="profile">
      <div className="top">
        <h1>My account</h1>
        <span onClick={userLogout}>Log out</span>
      </div>
      <div className="bottom">
        <h2>Order History</h2>
        {loading && <LoadingSpinner />}
        {orders.length === 0 && !loading && (
          <span>You haven't placed any orders yet.</span>
        )}
        {error && (
          <span>Unexpected error, please refresh or contact admin</span>
        )}
        {orders.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>PAID</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 10)}...</td>
                  <td>{moment(order.createdAt).format('DD/MMM/YYYY hh:mm')}</td>
                  <td>${order.amount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;
