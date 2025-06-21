import { FadeLoader } from 'react-spinners';
import css from './Loader.module.css';

interface LoaderProps {
  replace?: boolean;
}

export default function Loader({ replace }: LoaderProps) {
  return (
    <>
      <FadeLoader className={replace ? css['loader-replace'] : css.loader} />
    </>
  );
}
