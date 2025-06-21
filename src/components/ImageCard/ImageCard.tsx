import css from './ImageCard.module.css';

interface ImageCardProps {
  src: string;
  alt_description: string;
  onClick: () => void;
}
export default function ImageCard({
  src,
  alt_description,
  onClick,
}: ImageCardProps) {
  return (
    <>
      <img
        src={src}
        alt={alt_description}
        className={css.img}
        onClick={onClick}
      />
    </>
  );
}
