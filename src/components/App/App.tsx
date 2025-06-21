import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { fetchImages } from '../../api.js';
import ImageGallery from '../ImageGallery/ImageGallery.js';
import SearchBar from '../SearchBar/SearchBar.js';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.js';
import Loader from '../Loader/Loader.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import { Toaster, toast } from 'react-hot-toast';
import ImageModal from '../ImageModal/ImageModal.js';
import { type Image } from '../../types.ts';

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  function openModal(image: Image) {
    setModalIsOpen(true);
    setSelectedImage(image);
  }
  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  useEffect(() => {
    if (query === '') return;

    setIsLoading(true);
    setError(null);

    fetchImages(query, page)
      .then((data) => {
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results],
        );
        setTotalImages(data.total);
      })
      .catch(() => {
        setError('Something went wrong. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const trimmed = searchValue.trim();

    if (trimmed === '') {
      toast.error('Please enter an image name to search!');
      setImages([]);
      setTotalImages(0);
      setQuery('');
      setPage(1);
      return;
    }

    setQuery(trimmed);
    setSearchValue('');
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section>
      <Toaster position="top-right" />
      <SearchBar
        value={searchValue}
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(evt.target.value)
        }
        onSubmit={handleSubmit}
      />

      {isLoading && !images.length ? (
        <Loader />
      ) : (
        <>
          {images.length > 0 && (
            <ImageGallery images={images} onImageClick={openModal} />
          )}
          {!isLoading && images.length > 0 && images.length < totalImages && (
            <>
              <LoadMoreBtn onClick={handleLoadMore} />
            </>
          )}
          {error && <ErrorMessage message={error} />}
          {isLoading && images.length > 0 && <Loader replace={true} />}
        </>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        selectedImage={selectedImage}
      />
    </section>
  );
}
