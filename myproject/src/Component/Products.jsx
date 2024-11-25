// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { getProducts } from '../Redux/Actions/productAction';



const ProductList = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);


    console.log(products)
    return (
        <div>
          {
       loading ?(
    <h1>loading</h1>
  ):error?(
    <h1>error</h1>
  ): (
        <>
         <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap justify-center gap-6">
      {products.map((product) => (
        <div className="p-4 lg:w-1/4 md:w-1/2 w-full" key={product.id}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="w-full h-64 bg-gray-200 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                <Link to={`/products/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Review Count: {product.numReview}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
                <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        </>
      )}
    </div>
    );
};

export default ProductList;
