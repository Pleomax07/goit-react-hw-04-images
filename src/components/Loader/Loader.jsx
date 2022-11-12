import React from 'react';
import { Watch } from 'react-loader-spinner';
import css from './Loader.module.css' 
export const Loader = () => {
  return (
    <div className={css.loader}>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="rgba(36, 100, 173, 0.7)"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
