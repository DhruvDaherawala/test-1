import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';

const SearchInput = ({
  query = '',
  onChangeQuery,
  onClearQuery,
  placeholder = 'Search case studies by title or summary...'
}) => {
  const [localValue, setLocalValue] = useState(query);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setLocalValue(query);
  }, [query]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const nextVal = e.target.value;
    setLocalValue(nextVal);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onChangeQuery(nextVal);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      onChangeQuery(localValue);
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleClear = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setLocalValue('');
    onClearQuery();
  };

  return (
    <div className="relative w-full md:w-80 lg:w-96 group">
      <div className="p-[1px] rounded-full bg-gradient-to-r from-[#FC466B] via-purple-500 to-[#3F5EFB] transition-shadow duration-300 focus-within:shadow-lg focus-within:shadow-purple-500/25">
        <div className="relative flex items-center bg-[#0d072b] rounded-full px-4 py-2">
          <CiSearch
            aria-hidden="true"
            className="w-5 h-5 text-purple-400 flex-shrink-0 transition-colors duration-200 group-focus-within:text-[#3F5EFB]"
          />

          <input
            id="case-study-search"
            type="text"
            value={localValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search case studies"
            className="w-full bg-transparent text-sm text-gray-100 placeholder-gray-400 px-3 py-0.5 border-none focus:outline-none focus:ring-0"
          />

          {localValue && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search input"
              className="text-gray-400 hover:text-white p-0.5 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <IoCloseCircleOutline className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchInput);
