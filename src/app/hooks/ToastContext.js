import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from 'app/components/ToastContainer';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback(
    ({ type, title, description }) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(messages => [...messages, toast]);
    },
    [setMessages]
  );

  const removeToast = useCallback(
    id => {
      const toasts = messages.filter(message => message.id !== id);

      setMessages(toasts);
    },
    [setMessages]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
