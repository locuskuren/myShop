import ProductsList from '../../components/ProductsList/ProductsList';

import './Home.scss';

const Home: React.FC = () => {
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
        <ProductsList category="menswear" />
        <div id="womenscover" className="gap-image">
          <span>WOMEN'S FASHION</span>
        </div>
        <ProductsList category="womenswear" />
        <div id="electronicscover" className="gap-image">
          <span>ELECTRONICS</span>
        </div>
        <ProductsList category="electronics" />
        <div id="jewelerycover" className="gap-image">
          <span>JEWELERY</span>
        </div>
        <ProductsList category="jewelery" />
      </div>
    </div>
  );
};

export default Home;
