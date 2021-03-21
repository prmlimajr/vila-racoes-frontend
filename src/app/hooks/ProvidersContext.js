// import React, { useEffect, createContext, useContext, useState } from 'react';
// import { getProviders, createProvider } from 'app/api/provider';
// import { useToast } from 'app/hooks/ToastContext';
// // import { useLoading } from 'app/hooks/useLoading';

// const ProviderContext = createContext();

// const ProvidersProvider = ({ children }) => {
//   const { addToast } = useToast();
//   // const { loading, setLoading } = useLoading();
//   const [providerList, setProviderList] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     getProvidersList();
//   }, []);

//   const getProvidersList = async () => {
//     try {
//       // setLoading(true);
//       const data = await getProviders({ search });

//       setProviderList(data);
//     } catch (err) {
//       addToast({
//         type: 'error',
//         title: 'Falha na requisição',
//         description:
//           'Não foi possível carregar a lista de fornecedores. Tente novamente.',
//       });
//     } finally {
//       // setLoading(false);
//     }
//   };

//   const createProvider = async data => {
//     try {
//       // setLoading(true);

//       await createProvider(data);

//       getProvidersList();
//     } catch (err) {
//       addToast({
//         type: 'error',
//         title: 'Falha na requisição',
//         description:
//           'Não foi possível criar um novo fornecedor. Tente novamente.',
//       });
//     } finally {
//       // setLoading(false);
//     }
//   };

//   return (
//     <ProviderContext.Provider
//       value={{
//         providerList,
//         setProviderList,
//         search,
//         setSearch,
//         getProvidersList,
//         createProvider,
//       }}
//     >
//       {children}
//     </ProviderContext.Provider>
//   );
// };

// function useProvider() {
//   const context = useContext(ProviderContext);

//   if (!context) {
//     throw new Error('useProvider must be used within an ProviderProvider');
//   }

//   return context;
// }

// export { ProvidersProvider, useProvider };
