import ReactDom from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/SearchOutlined';

import './SearchMenu.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SearchMenu: React.FC<Props> = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  let navigate = useNavigate();

  const handleSubmit = (event?: React.SyntheticEvent): void => {
    if (event) {
      event.preventDefault();
    }
    if (searchTerm !== '') {
      onClose();
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  });

  if (!open) return null;

  return ReactDom.createPortal(
    <div className="search-menu">
      <span onClick={onClose}>✕</span>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            placeholder="Search our store"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <SearchIcon className="icon" onClick={handleSubmit} />
        </form>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};

export default SearchMenu;
