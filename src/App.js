import React from 'react';
import Routes from 'app/routes';

import ToastContainer from 'app/components/ToastContainer';

import AppProvider from 'app/hooks';

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
