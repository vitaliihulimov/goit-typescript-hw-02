import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <header className={css.container}>
      <form onSubmit={onSubmit} className={css.form}>
        <div className={css.inputWrapper}>
          <AiOutlineSearch className={css.icon} />
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={onChange}
          />
        </div>
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}
