import React, { useState, useEffect, useCallback } from 'react';
import { FiEdit, FiXCircle } from 'react-icons/fi';
import { getProviders } from 'app/api/provider';
import { useToast } from 'app/hooks/ToastContext';
import Search from 'app/assets/icons/search.svg';
import { useHistory } from 'react-router-dom';
import ProviderModal from 'app/components/Modals/ProviderModal';
import DeleteModal from 'app/components/Modals/DeleteModal';
import Loader from 'app/components/Loader';
import { useLoading } from 'app/hooks/LoadingContext';

import './Providers.scss';
import SeeMoreButton from 'app/components/Buttons/SeeMoreButton';
import AddButton from 'app/components/Buttons/AddButton';

export default function Providers() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [providers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [type, setType] = useState('create');
  const [provider, setProvider] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');

  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  const history = useHistory();

  useEffect(async () => {
    try {
      setLoading(true);
      const customersList = await getProviders({ search, page, perPage });

      setCustomers(customersList);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na requisição',
        description:
          'Não foi possível carregar a lista de fornecedores. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [search, page, perPage]);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleUpdate = provider => {
    setType('update');
    setProvider(provider);
    setOpen(true);
  };

  const handleDelete = provider => {
    setId(provider.id);
    setName(provider.name);
    setDestroy(true);
  };

  const renderTable = data => {
    return (
      <div className='table'>
        <table>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th></th>
          </tr>

          {data.map(row => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.cnpj}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>
                  {row.address
                    ? `${row.address.address}, ${
                        row.address.number || 'S/N'
                      }, ${row.address.complement || ''} - ${
                        row.address.district || ''
                      }, ${row.address.city || ''}, ${
                        row.address.zipCode || ''
                      }`
                    : '--'}
                </td>
                <td
                  style={{
                    textAlign: 'right',
                    paddingRight: '20px',
                  }}
                >
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
        <h4>Não foi encontrado nenhum fornecedor.</h4>
      </div>
    );
  };

  const handleClick = () => {
    setOpen(true);
    setType('create');
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
          </div>

          <div className='buttonWrapper'>
            <AddButton onClick={handleClick}>Novo fornecedor</AddButton>
          </div>
        </div>
      </div>

      {providers.length > 0 ? renderTable(providers) : renderEmpty(loading)}
      {open && (
        <ProviderModal
          open={open}
          onClose={() => setOpen(false)}
          type={type}
          provider={provider}
        />
      )}
      {destroy && (
        <DeleteModal
          onClose={() => setDestroy(false)}
          id={id}
          name={name}
          entity='provider'
        />
      )}
    </div>
  );
}
