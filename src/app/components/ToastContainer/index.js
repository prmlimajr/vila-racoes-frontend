import React, { useCallback } from 'react';
import { useTransition, animated } from 'react-spring';

import Toast from './Toast';

export default function ToastContainer({ messages }) {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  const handleStyle = useCallback((type) => {
    switch (type) {
      case 'error':
        return 'toastContainerError';
      case 'info':
        return 'toastContainerInfo';
      case 'success':
        return 'toastContainerSuccess';
    }
  }, []);

  return (
    <>
      {messagesWithTransitions.map(({ item, key, props }) => {
        return (
          <animated.div
            key={key}
            className={handleStyle(item.type)}
            style={props}
          >
            <Toast message={item} />
          </animated.div>
        );
      })}
    </>
  );
}
