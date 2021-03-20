import React, { useEffect, useCallback } from 'react';
import { useToast } from 'app/hooks/ToastContext';
import {
  FiXCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import './Toast.scss';

const icons = {
  error: <FiAlertCircle size={24} color='#fff' />,
  info: <FiInfo size={24} color='blue' />,
  success: <FiCheckCircle size={24} color='green' />,
};

export default function Toast({ message }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <div className='toast'>
      {icons[message.type || 'info']}
      <div className='toastMessage'>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button
        type='button'
        className='toastBtnError'
        onClick={message => removeToast(message.id)}
      >
        <FiXCircle size={24} />
      </button>
    </div>
  );
}
