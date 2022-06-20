import { useEffect } from 'react';
import { Product } from '../../api-data-interfaces';

import { useActions } from '../../hooks/useActions';
import { useSelector } from '../../hooks/useTypedSelector';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProductPreview from '../ProductPreview/ProductPreview';

import './ProductsList.scss';

type Props = {
  category: string;
  loading: boolean;
  error: boolean;
  products: Product[] | null;
};

const ProductsList: React.FC<Props> = ({
  category,
  loading,
  error,
  products,
}) => {
  return (
    <div className="product-list" id={`${category}`}>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="error">
          Unexepcted error, please refresh or contact administrator
        </div>
      )}
      <div className="product-list-scroll">
        {products &&
          products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductPreview
                key={product._id}
                image={product.image}
                title={product.title}
                price={product.price}
                id={product._id}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductsList;
