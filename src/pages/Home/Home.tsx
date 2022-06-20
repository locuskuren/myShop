import { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import ProductsList from '../../components/ProductsList/ProductsList';

import './Home.scss';

const Home: React.FC = () => {
  const { fetchProducts, productsReset } = useActions();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    fetchProducts();

    return () => {
      productsReset();
    };
  }, [fetchProducts, productsReset]);

  return (
    <div className="homepage">
      <div className="promo" id="#top">
        <div className="content">
          <span>New Electronics Products</span>
          <a href="#electronics">Shop Now</a>
        </div>
      </div>
      <div className="about">
        <p>
          Our motto: Communication is at the heart of ecommerce and community
        </p>
      </div>
      <div className="product-list-container">
        <div id="menscover" className="gap-image">
          <span>MEN'S FASHION</span>
        </div>
        <ProductsList
          products={products}
          error={error}
          loading={loading}
          category="menswear"
        />
        <div id="womenscover" className="gap-image">
          <span>WOMEN'S FASHION</span>
        </div>
        <ProductsList
          products={products}
          error={error}
          loading={loading}
          category="womenswear"
        />
        <div id="electronicscover" className="gap-image">
          <span>ELECTRONICS</span>
        </div>
        <ProductsList
          products={products}
          error={error}
          loading={loading}
          category="electronics"
        />
        <div id="jewelerycover" className="gap-image">
          <span>JEWELERY</span>
        </div>
        <ProductsList
          products={products}
          error={error}
          loading={loading}
          category="jewelery"
        />
      </div>
    </div>
  );
};

export default Home;
