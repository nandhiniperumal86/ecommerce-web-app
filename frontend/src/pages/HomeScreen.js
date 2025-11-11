import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1>Latest Products</h1>
      {isLoading && <Loader />}
      {isError && <Message variant="danger">{message}</Message>}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
