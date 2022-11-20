import PropTypes from 'prop-types';
import React from 'react';
import css from './Modal.module.css';
import { useEffect } from 'react';

function Modal({ closeModal, currentImage }) {
  useEffect(() => {
    const onCloseByEscape = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onCloseByEscape);
    return () => {
      window.removeEventListener('keydown', onCloseByEscape);
    };
  }, [closeModal]);

  const onCloseByBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  const { data } = currentImage;

  return (
    <div className={css.Overlay} onClick={onCloseByBackdrop}>
      <div className={css.Modal}>
        <img src={data.largeImageURL} alt={data.tags} width="700px"></img>
      </div>
    </div>
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  currentImage: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
export default Modal;
