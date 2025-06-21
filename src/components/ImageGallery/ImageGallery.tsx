import ImageCard from '../ImageCard/ImageCard.js';
import css from './ImageGallery.module.css';
import { type Image } from '../../types.js';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.container}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.containerItem}>
            <ImageCard
              src={image.urls.small}
              alt_description={image.alt_description}
              onClick={() => onImageClick(image)}
            />
          </li>
        );
      })}
    </ul>
  );
}
