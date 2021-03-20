import React, { useState, useEffect, useCallback } from 'react';
import * as DateFns from 'date-fns';
import DatePicker from 'react-date-picker';
import { getCustomers } from 'app/api/customer';
import { useToast } from 'app/hooks/ToastContext';
import Search from 'app/assets/icons/search.svg';
import { useHistory } from 'react-router-dom';
import CustomerModal from 'app/components/Modals/CustomerModal';
import Loader from 'app/components/Loader';
import { useLoading } from 'app/hooks/LoadingContext';

import './Customers.scss';
import SeeMoreButton from 'app/components/Buttons/SeeMoreButton';
import AddButton from 'app/components/Buttons/AddButton';

export default function Customers() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [customers, setCustomers] = useState([]);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [open, setOpen] = useState(false);

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
                <td>
                  <SeeMoreButton onClick={() => seeMore(row.id)}>
                    Ver mais
                  </SeeMoreButton>
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
        <h4>Não foi encontrado nenhum cliente.</h4>
      </div>
    );
  };

  const handleClick = () => {
    setOpen(true);
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

            <div className='filterWrapper'>
              {/* <span>Filtrar de: </span>
              <DatePicker
                onChange={setDateFrom}
                value={dateFrom}
                calendarIcon={null}
                clearIcon={null}
                format='dd/MM/yyyy'
              />
              <span> à </span>
              <DatePicker
                onChange={setDateTo}
                value={dateTo}
                calendarIcon={null}
                clearIcon={null}
                format='dd/MM/yyyy'
              /> */}
            </div>
          </div>

          <div className='buttonWrapper'>
            <AddButton onClick={handleClick}>Novo cliente</AddButton>
          </div>
        </div>
      </div>

      {customers.length > 0 ? renderTable(customers) : renderEmpty(loading)}
      {open && <CustomerModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
