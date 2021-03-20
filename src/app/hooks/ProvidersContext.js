import React, { useEffect, createContext, useContext, useState } from 'react';
import { getProviders } from 'app/api/provider';
import { useToast } from 'app/hooks/ToastContext';

const ProviderContext = createContext();

const ProvidersProvider = ({ children }) => {
  const { addToast } = useToast();
  const [providerList, setProviderList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProvidersList();
  }, []);

  const getProvidersList = async () => {
    try {
      const data = await getProviders({ search });

      console.log(data);

      setProviderList(providerList => [...providerList, data]);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na requisição',
        description:
          'Não foi possível carregar a lista de fornecedores. Tente novamente.',
      });
    }
  };

  return (
    <ProviderContext.Provider
      value={{
        providerList,
        setProviderList,
        search,
        setSearch,
        getProvidersList,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

function useProvider() {
  const context = useContext(ProviderContext);

  if (!context) {
    throw new Error('useProvider must be used within an ProviderProvider');
  }

  return context;
}

export { ProvidersProvider, useProvider };
