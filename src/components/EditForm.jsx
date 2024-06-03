import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { updateProduct } from "../store/getProductsSlice";
// import { editProduct } from "../store/productSlice";

const EditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.isData.find((product) => product._id === id)
  );

  console.log(product, id);
  // const { name, quantity, price, image } = product;
  const [data, setData] = useState(product);

  // setData(product);
  // console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, data }));
    console.log("data:", data);
    setData({
      name: "",
      quantity: null,
      price: null,
      image: "",
    });
    navigate("/");
  };
  // useEffect(() => {
  //   dispatch(getProduct(id));
  // }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);
  return (
    <form onSubmit={(e) => handleSubmit(e)} className='max-w-sm mx-auto pb-5'>
      <h1 className='text-3xl font-bold text-center pb-3 text-indigo-600'>
        Edit Product
      </h1>
      <div className='mb-5'>
        <label
          htmlFor='name'
          className='block mb-2 text-xl font-medium text-gray-900 dark:text-black'
        >
          Name
        </label>
        <input
          name='name'
          value={data.name || ""}
          type='text'
          id='name'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='product name'
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='quantity'
          className='block mb-2 text-xl font-medium text-gray-900 dark:text-black'
        >
          Quantity
        </label>
        <input
          name='quantity'
          value={data.quantity || ""}
          min={0}
          type='number'
          id='quantity'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='0'
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='price'
          className='block mb-2 text-xl font-medium text-gray-900 dark:text-black'
        >
          Price
        </label>
        <input
          type='number'
          value={data.price || ""}
          name='price'
          min={0}
          id='price'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='0'
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='image'
          className='block mb-2 text-xl font-medium text-gray-900 dark:text-black'
        >
          Image
        </label>
        <input
          name='image'
          value={data.image || ""}
          min={0}
          type='text'
          id='quantity'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='image url'
          onChange={(e) => handleChange(e)}
        />
      </div>

      <Button text='Add Product' type='submit' />
    </form>
  );
};

export default EditForm;
