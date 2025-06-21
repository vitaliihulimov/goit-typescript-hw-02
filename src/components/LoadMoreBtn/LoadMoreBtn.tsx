import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <>
      <button type="button" onClick={onClick} className={css.button}>
        Load More
      </button>
    </>
  );
}
