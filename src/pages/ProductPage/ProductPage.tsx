import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';

import './ProductPage.scss';

const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [cartNotification, setcartNotification] = useState(false);
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { cartAddProduct, fetchSingleProduct, singleProductReset } =
    useActions();
  let { id } = useParams();

  useEffect(() => {
    return () => {
      singleProductReset();
    };
  }, [singleProductReset]);

  useEffect(() => {
    if (id && (!product || product._id !== id)) {
      fetchSingleProduct(id);
    }
  }, [id, fetchSingleProduct, product, singleProductReset]);

  const handleQuantity = (type: string) => {
    if (!product?.inStock) {
      return;
    }
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
    setcartNotification(false);
  };

  const handleClick = () => {
    if (product) {
      cartAddProduct({ ...product, quantity });
      setcartNotification(true);
      setQuantity(1);
    }
  };

  return (
    <div className="product-page">
      {loading && <LoadingSpinner />}
      {error && (
        <span className="error">
          Unexpected error, please refresh page or contact admin
        </span>
      )}
      {!loading && product && (
        <>
          <div className="image-container">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details">
            <h1>{product.title}</h1>
            <h2>${product.price}</h2>
            <p>{product.description}</p>
            {product.inStock ? (
              <span style={{ color: 'green', fontSize: '1rem' }}>In Stock</span>
            ) : (
              <span style={{ color: 'red', fontSize: '1rem' }}>
                Out Of Stock
              </span>
            )}
            <div className="product-cart-functions-container">
              <div>
                <span>Set Quantity </span>
                <RemoveIcon
                  style={{ color: 'red' }}
                  className="icon"
                  onClick={() => handleQuantity('dec')}
                />
                <span>{quantity}</span>
                <AddIcon
                  style={{ color: 'green' }}
                  className="icon"
                  onClick={() => handleQuantity('inc')}
                />
              </div>

              <button
                className={!product.inStock ? 'disabled' : ''}
                disabled={!product.inStock}
                onClick={handleClick}
              >
                Add To Cart
              </button>
              {cartNotification && (
                <div className="cart-add-notification">
                  {product.title}, has been added to cart
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
