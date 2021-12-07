import React, { useState } from 'react';

export default function Dropdown({ option, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='dropdown'>
      <div
        className='dropdown-text'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selected}
        {
          <svg xmlns='http://www.w3.org/2000/svg' height='20px' viewBox='0 0 24 24' width='20px'>
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M7 10l5 5 5-5z' />
          </svg>
        }
      </div>
      {isOpen ? (
        <div className='options'>
          {option.map((data) => (
            <div
              onClick={() => {
                setSelected(data);
                setIsOpen(!isOpen);
              }}
              className='item'
            >
              {data}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
