import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { deleteProduct, fetchProducts } from "../store/getProductsSlice";
import Loading from "./Loading";
import Pagination from "./Pagination";

const Table = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isData, page, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className='relative overflow-x-auto pt-5 border-t-2 '>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Product name
            </th>
            <th scope='col' className='px-6 py-3'>
              Quantity
            </th>
            <th scope='col' className='px-6 py-3'>
              Image
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              button
            </th>
          </tr>
        </thead>
        <tbody>
          {isData &&
            isData.slice(page * 4 - 4, page * 4).map((product) => (
              <tr
                key={product._id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
              >
                <th
                  scope='row'
                  className='px-6 py-4 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {product.name}
                </th>
                <td className='px-6 py-4 text-lg'>{product.quantity}</td>
                <td className='px-6 py-4 text-lg max-w-xs overflow-hidden whitespace-nowrap text-ellipsis'>
                  {product.image}
                </td>
                <td className='px-6 py-4 text-lg'>${product.price}</td>
                <td className='px-6 py-4 text-lg'>
                  <Button
                    text='Edit'
                    type='button'
                    handleClick={(e) => {
                      e.preventDefault();
                      navigate(`/edit/${product._id}`);
                    }}
                  />
                  <Button
                    text='Delete'
                    type='button'
                    id={product._id}
                    handleClick={() => handleDelete(product._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className='text-center mt-2'>
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
