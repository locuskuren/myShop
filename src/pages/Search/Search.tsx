import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import ProductPreview from '../../components/ProductPreview/ProductPreview';

import './Search.scss';

const Search: React.FC = () => {
  let { searchTerm } = useParams() || '';
  const term = searchTerm || '';
  const { fetchProducts } = useActions();
  const { products, loading, error } = useSelector((state) => state.products);
  const searchProducts =
    !loading && !error && products && term !== ''
      ? products.filter((product) =>
          product.title.toLowerCase().includes(term.toLowerCase())
        )
      : [];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(searchProducts);

  return (
    <div className="search">
      <h1>Search</h1>
      <h2>
        {searchProducts.length}{' '}
        {searchProducts.length === 1 ? 'result' : 'results'}
      </h2>
      <div>
        {!loading &&
          !error &&
          searchProducts.length !== 0 &&
          searchProducts.map((product) => (
            <ProductPreview
              title={product.title}
              image={product.image}
              id={product._id}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
