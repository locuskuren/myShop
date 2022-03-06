import { Link } from 'react-router-dom';

import './ProductPreview.scss';

interface Props {
  title: string;
  image: string;
  price: number;
  id: string;
}

const ProductPreview: React.FC<Props> = ({ image, title, price, id }) => {
  return (
    <div className="product">
      <Link to={`/product/${id}`}>
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
        <div className="product-name">{title}</div>
        <div className="product-price">${price}</div>
      </Link>
    </div>
  );
};

export default ProductPreview;
