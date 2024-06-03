import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../store/getProductsSlice";

const Pagination = () => {
  const { pages, page } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleDecrementPage = () => {
    if (page > 1) {
      dispatch(addPage(page - 1));
    }
  };
  const handleIncrementPage = () => {
    if (page < pages) {
      dispatch(addPage(page + 1));
    }
  };
  return (
    <>
      <button
        onClick={handleDecrementPage}
        className='px-3 m-1 py-1 font-semibold text-lg cursor-pointer bg-slate-300 focus:bg-slate-400 active:bg-slate-400'
      >
        ◀️
      </button>
      {pages &&
        [...Array(pages)].map((_, i) => (
          <span
            onClick={() => dispatch(addPage(i + 1))}
            key={i}
            className='px-3 m-1 py-1 font-semibold text-lg cursor-pointer bg-slate-300 focus:bg-slate-400 active:bg-slate-400'
          >
            {i + 1}
          </span>
        ))}
      <button
        onClick={handleIncrementPage}
        className='px-3 m-1 py-1 font-semibold text-lg cursor-pointer bg-slate-300 focus:bg-slate-400 active:bg-slate-400'
      >
        ▶️
      </button>
    </>
  );
};

export default Pagination;
