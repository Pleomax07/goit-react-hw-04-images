import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    currentImage: PropTypes.objectOf(
      PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEscape);
  }

  onCloseByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onCloseByBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const {
      currentImage: { data },
    } = this.props;

    return (
      <div className={css.Overlay} onClick={this.onCloseByBackdrop}>
        <div className={css.Modal}>
          <img src={data.largeImageURL} alt={data.tags} width="700px"></img>
        </div>
      </div>
    );
  }
}

export default Modal;
