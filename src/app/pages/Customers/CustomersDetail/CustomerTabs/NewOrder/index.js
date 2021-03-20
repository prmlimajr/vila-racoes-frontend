// import React, { useEffect, useState, useCallback } from 'react';
// import { useAuth } from 'app/hooks/AuthContext';
// import { useToast } from 'app/hooks/ToastContext';
// import { useOrder } from 'app/hooks/OrderContext';
// import { getProducts } from 'app/api/product';
// import { ErrorMessage, Formik, Form, Field, isEmptyArray } from 'formik';
// import Search from 'app/assets/icons/search.svg';
// import { FiPlus } from 'react-icons/fi';
// import { Table } from 'semantic-ui-react';
// import { isEmpty } from 'app/utils';

// import './NewOrder.css';

// export default function NewOrder() {
//   const { user } = useAuth();
//   const { addToast } = useToast();
//   const { addOrder } = useOrder();

//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(async () => {
//     try {
//       setLoading(true);
//       const products = await getProducts({ search });
//       setProducts(products.data.message);
//     } catch (err) {
//       addToast({
//         type: 'error',
//         title: 'Falha na requisição',
//         description:
//           'Não foi possível carregar a lista de produtos. Tente novamente.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [addToast, setLoading, setProducts]);

//   const onSearchChange = e => {
//     setSearch(e.target.value);

//     callSearch(search);
//   };

//   const callSearch = useCallback(
//     async search => {
//       try {
//         setLoading(true);
//         const products = await getProducts({ search });

//         setProducts(products.data.message);
//       } catch (err) {
//         addToast({
//           type: 'error',
//           title: 'Falha na requisição',
//           description:
//             'Não foi possível carregar a lista de clientes. Tente novamente.',
//         });
//       } finally {
//         setLoading(false);
//       }
//     },
//     [addToast, setSearch]
//   );

//   const renderEmpty = loading => {
//     if (loading) {
//       return <h4>Carregando...</h4>;
//     }

//     return <h4>Não foi encontrado nenhum produto.</h4>;
//   };

//   const renderTable = data => {
//     return (
//       <div className='productsList'>
//         <Table basic='very'>
//           <Table.Header>
//             <Table.Row>
//               <Table.HeaderCell>Código</Table.HeaderCell>
//               <Table.HeaderCell>Produto</Table.HeaderCell>
//               <Table.HeaderCell>Preço</Table.HeaderCell>
//               <Table.HeaderCell>Estoque</Table.HeaderCell>
//               <Table.HeaderCell></Table.HeaderCell>
//             </Table.Row>
//           </Table.Header>

//           <Table.Body>
//             {data.map(row => {
//               return (
//                 <Table.Row key={row.id}>
//                   <Table.Cell>{row.code}</Table.Cell>
//                   <Table.Cell>{row.name}</Table.Cell>
//                   <Table.Cell>{row.price}</Table.Cell>
//                   <Table.Cell>{row.stock.quantity}</Table.Cell>
//                   <Table.Cell>
//                     <FiPlus onClick={() => handleOrder(row)} />
//                   </Table.Cell>
//                 </Table.Row>
//               );
//             })}
//           </Table.Body>
//         </Table>
//       </div>
//     );
//   };

//   const handleOrder = row => {
//     addOrder({
//       userId: user.id,
//       name: row.name,
//       productId: row.id,
//       product: row.name,
//       quantity: 1,
//       price: row.price,
//       stock: row.stock,
//     });

//     addToast({
//       type: 'info',
//       title: 'Produto adicionado',
//       description: `${row.name} foi adicionado ao carrinho`,
//     });
//   };

//   return (
//     <>
//       <div className='leftSide'></div>
//       <div className='searchBar'>
//         <img src={Search} alt='Buscar' className='inputSearch' />
//         <input
//           type='text'
//           className='search'
//           placeholder='Pesquisar'
//           onChange={onSearchChange}
//         />
//       </div>

//       {isEmpty(products) ? renderEmpty(loading) : renderTable(products)}
//     </>
//   );
// }
