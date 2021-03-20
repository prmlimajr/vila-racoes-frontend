import React, { useState, useEffect, useCallback } from 'react';
import * as DateFns from 'date-fns';
import DatePicker from 'react-date-picker';
import { getProviders } from 'app/api/provider';
import Search from 'app/assets/icons/search.svg';
import { useHistory } from 'react-router-dom';
import ProviderModal from 'app/components/Modals/ProviderModal';
import Loader from 'app/components/Loader';
import { useLoading } from 'app/hooks/LoadingContext';
import { useProvider } from 'app/hooks/ProvidersContext';

import './Providers.scss';
import SeeMoreButton from 'app/components/Buttons/SeeMoreButton';
import AddButton from 'app/components/Buttons/AddButton';

export default function Providers() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [providers, setProviders] = useState([]);
  const [open, setOpen] = useState(false);

  const { loading, setLoading } = useLoading();
  const { providerList, search, setSearch } = useProvider();
  const history = useHistory();

  useEffect(() => {
    setProviders(providerList);
  }, [providerList]);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const seeMore = id => {
    history.push(`/fornecedores/${id}`);
  };

  const renderTable = data => {
    return (
      <div className='table'>
        <table>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th></th>
          </tr>

          {data.map(row => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.cnpj}</td>
                <td>{row.phone}</td>
                <td>{row.email}</td>
                <td>
                  {`${row.address.address}, ${row.address.number}, ${row.address.complement} - ${row.address.district}, ${row.address.city} - ${row.address.zipCode}`}
                </td>
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
        <h4>Não foi encontrado nenhum fornecedor.</h4>
      </div>
    );
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className='page'>
      <h2>Fornecedores</h2>
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

            <div className='filterWrapper'></div>
          </div>

          <div className='buttonWrapper'>
            <AddButton onClick={handleClick}>Novo fornecedor</AddButton>
          </div>
        </div>
      </div>

      {providers.length > 0 ? renderTable(providers) : renderEmpty(loading)}
      {open && <ProviderModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
