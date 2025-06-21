import css from './ImageModal.module.css';
import Modal from 'react-modal';
import { BsXLg } from 'react-icons/bs';
import { BsFillHeartFill } from 'react-icons/bs';
import { useEffect } from 'react';

// Modal.setAppElement('#root');

interface ImageUser {
  name: string;
}

interface SelectedImage {
  urls: {
    regular: string;
  };
  alt_description: string | null;
  user: ImageUser;
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: SelectedImage | null;
}

export default function ImageModal({
  isOpen,
  onClose,
  selectedImage,
}: ImageModalProps) {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Image Modal"
    >
      <button onClick={onClose} className={css.closeButton}>
        <BsXLg className={css.icon} />
      </button>
      {selectedImage && (
        <div>
          <div className={css.imgContainer}>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || 'Selected image'}
              className={css.img}
            />
          </div>
          <div className={css.textContainer}>
            <p className={css.text}>
              <span className={css.spanText}>Description:</span>{' '}
              {selectedImage.alt_description || 'No description available'}
            </p>
            <div className={css.likesContainer}>
              <p className={css.text}>
                <span className={css.spanText}>Author:</span>{' '}
                {selectedImage.user.name}
              </p>
              <p className={css.text}>
                <BsFillHeartFill className={css.iconHeart} />{' '}
                <span className={css.spanText}> {selectedImage.likes}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
