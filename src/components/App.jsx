import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../components/App.module.css';
import { FatchImages } from './servises/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { Helpers } from './Helpers/Helpers';

class App extends Component {
  state = {
    searchNames: '',
    images: [],
    page: 1,
    isLoading: false,
    error: false,
    currentImage: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchNames !== this.state.searchNames ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  getImages = () => {
    this.setState({ isLoading: true });

    const { searchNames, page } = this.state;

    FatchImages(searchNames, page)
      .then(({ data }) =>
        this.setState(prevState => ({
          images: [...prevState.images, ...Helpers(data.hits)],
        }))
      )
      .catch(error => {
        this.setState(() => ({
          error: error,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = searchNames => {
    if (searchNames !== this.state.searchNames) {
      this.setState({ page: 1, images: [] });
    }
    this.setState({ searchNames });
  };

  onOpenModal = data => {
    this.setState({
      currentImage: data,
    });
  };

  onCloseModal = () => {
    this.setState({
      currentImage: null,
    });
  };

  onloadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { isLoading, images, currentImage, error } = this.state;

    return (
      <section className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery items={images} onClick={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {error && <p>Упс! Что-то пошло не так, перезагрузите страницу</p>}
        {images.length > 0 && <Button loadMore={this.onloadMore} />}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={this.onCloseModal} />
        )}
        <ToastContainer autoClose={3000} position="top-center" />
      </section>
    );
  }
}
export default App;
