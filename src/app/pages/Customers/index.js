import React, { useState, useEffect, useCallback } from 'react';
import * as DateFns from 'date-fns';
import { FiEdit, FiXCircle } from 'react-icons/fi';
import { getCustomers } from 'app/api/customer';
import { useToast } from 'app/hooks/ToastContext';
import Search from 'app/assets/icons/search.svg';
import { useHistory } from 'react-router-dom';
import CustomerModal from 'app/components/Modals/CustomerModal';
import DeleteModal from 'app/components/Modals/DeleteModal';
import Loader from 'app/components/Loader';
import { useLoading } from 'app/hooks/LoadingContext';

import './Customers.scss';
import SeeMoreButton from 'app/components/Buttons/SeeMoreButton';
import AddButton from 'app/components/Buttons/AddButton';
import Empty from 'app/assets/img/empty.jpg';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [type, setType] = useState('create');
  const [customer, setCustomer] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');

  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  const history = useHistory();

  useEffect(async () => {
    try {
      setLoading(true);
      const customersList = await getCustomers({ search, page, perPage });

      setCustomers(customersList);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na requisição',
        description:
          'Não foi possível carregar a lista de clientes. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [search, page, perPage]);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const seeMore = id => {
    history.push(`/clientes/${id}`);
  };

  const handleUpdate = customer => {
    setType('update');
    setCustomer(customer);
    setOpen(true);
  };

  const handleDelete = customer => {
    setId(customer.id);
    setName(`${customer.firstName} ${customer.lastName}`);
    setDestroy(true);
  };

  const renderTable = data => {
    return (
      <div className='table'>
        <table>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Cliente desde</th>
            <th>Data da última compra</th>
            <th></th>
          </tr>

          {data.map(row => {
            return (
              <tr key={row.id}>
                <td>{`${row.firstName} ${row.lastName}`}</td>
                <td>{row.phone}</td>
                <td>{row.email}</td>
                <td>
                  {DateFns.format(DateFns.parseISO(row.created), 'dd/MM/yyyy')}
                </td>
                <td>{row.lastShopped}</td>
                <td
                  style={{
                    textAlign: 'right',
                    paddingRight: '20px',
                  }}
                >
                  {/* <SeeMoreButton onClick={() => seeMore(row.id)}>
                    Ver mais
                  </SeeMoreButton> */}
                  <FiEdit
                    size={20}
                    color='teal'
                    className='edit'
                    onClick={() => handleUpdate(row)}
                  />
                  <FiXCircle
                    size={20}
                    color='#d64824'
                    className='delete'
                    onClick={() => handleDelete(row)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  };

  const renderEmpty = loading => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader color='#595959' />
        </div>
      );
    }
    return (
      <div className='emptyList'>
        <img src={Empty} alt='' />
        <h4>Não foi encontrado nenhum cliente.</h4>
      </div>
    );
  };

  const handleClick = () => {
    setOpen(true);
    setType('create');
  };

  return (
    <div className='page'>
      <h2>Clientes</h2>
      <div className='pageFilters'>
        <div className='searchBar'>
          <div className='filters'>
            <div className='search'>
              <input
                type='text'
                placeholder='Pesquisar'
                value={search}
                onChange={onSearchChange}
              />

              <div className='search-icon'>
                <img src={Search} alt='search' />
              </div>
            </div>
          </div>

          <div className='buttonWrapper'>
            <AddButton onClick={handleClick}>Novo cliente</AddButton>
          </div>
        </div>
      </div>

      {customers.length > 0 ? renderTable(customers) : renderEmpty(loading)}
      {open && (
        <CustomerModal
          open={open}
          onClose={() => setOpen(false)}
          type={type}
          customer={customer}
        />
      )}
      {destroy && (
        <DeleteModal
          onClose={() => setDestroy(false)}
          id={id}
          name={name}
          entity='customer'
        />
      )}
    </div>
  );
}
