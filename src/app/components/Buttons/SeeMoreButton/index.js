import React from 'react';

import './SeeMoreButton.scss';

export default function SeeMoreButton({ children, ...rest }) {
  return (
    <button type='submit' className='seeMoreBtn' {...rest}>
      {children}
    </button>
  );
}
