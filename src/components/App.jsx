import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../components/App.module.css';
import { FetchImages } from './servises/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { Helpers } from './Helpers/Helpers';
import { useState, useEffect } from 'react';

function App() {
  const [searchNames, setSearchNames] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (searchNames === '') {
      return;
    }
    setIsLoading(true);
    const getImages = async () => {
      try {
        const imgList = await FetchImages(searchNames, page);
        const {
          data: { hits },
        } = imgList;
        if (page === 1) {
          setImages(Helpers(hits));
        } else {
          setImages(prevState => [...prevState, ...Helpers(hits)]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, searchNames, error]);

  const handleFormSubmit = enterNames => {
    if (enterNames !== searchNames) {
      setPage(1);
      setImages([]);
    }
    setSearchNames(enterNames);
  };

  const onOpenModal = data => {
    setCurrentImage(data);
  };

  const onCloseModal = () => {
    setCurrentImage(null);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <section className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery items={images} onClick={onOpenModal} />
      )}
      {isLoading && <Loader />}
      {error && <p>Упс! Что-то пошло не так, перезагрузите страницу</p>}
      {images.length > 0 && <Button loadMore={onLoadMore} />}
      {currentImage && (
        <Modal currentImage={currentImage} closeModal={onCloseModal} />
      )}
      <ToastContainer autoClose={3000} position="top-center" />
    </section>
  );
}

export default App;
