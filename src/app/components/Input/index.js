import React from 'react';
import { removeReadOnly } from 'app/utils';

import './Input.scss';

export default function Input(props) {
  return (
    <div className='inputContainer'>
      <label className='signinLabel'>{props.label}</label>
      <input
        {...props}
        className='signinInput'
        readOnly
        onFocus={removeReadOnly}
      />
    </div>
  );
}
