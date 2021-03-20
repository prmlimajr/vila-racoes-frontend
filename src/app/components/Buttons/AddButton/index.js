import React from 'react';
import { FiPlus } from 'react-icons/fi';

import './AddButton.scss';

export default function AddButton({ children, ...rest }) {
  return (
    <button type='submit' className='addBtn' {...rest}>
      <div className='add-btn-icon'>
        <FiPlus color='#FFF' size={25} />
      </div>
      {children}
    </button>
  );
}
