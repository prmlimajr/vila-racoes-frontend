import React from 'react';
import { removeReadOnly } from 'app/utils';

export default function InputNumber(props) {
  return (
    <div className='inputContainer'>
      <label className='signinLabel'>{props.label}</label>
      <input
        type='number'
        min={0}
        {...props}
        className='signinInput'
        readOnly
        onFocus={removeReadOnly}
      />
    </div>
  );
}
