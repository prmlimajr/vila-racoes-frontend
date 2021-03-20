import React, { useState, useEffect, useCallback } from 'react';
import * as DateFns from 'date-fns';
import DatePicker from 'react-date-picker';
import { getProducts } from 'app/api/product';
import { useToast } from 'app/hooks/ToastContext';
import Search from 'app/assets/icons/search.svg';
import { useHistory } from 'react-router-dom';
import ProductModal from 'app/components/Modals/ProductModal';
import Loader from 'app/components/Loader';
import { useLoading } from 'app/hooks/LoadingContext';

import './Products.scss';
import SeeMoreButton from 'app/components/Buttons/SeeMoreButton';
import AddButton from 'app/components/Buttons/AddButton';

export default function Products() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  const history = useHistory();

  useEffect(async () => {
    try {
      setLoading(true);
      const productsList = await getProducts({ search });

      setProducts(productsList);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na requisição',
        description:
          'Não foi possível carregar a lista de produtos. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [search]);

  const onSearchChange = e => {
    setSearch(e.target.value);
  };

  const seeMore = id => {
    history.push(`/produtos/${id}`);
  };

  const renderTable = data => {
    return (
      <div className='table'>
        <table>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Fabricante</th>
            <th>Descrição</th>
            <th></th>
          </tr>

          {data.map(row => {
            console.log(row);
            return (
              <tr key={row.id}>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.manufacturer}</td>
                <td>{row.description}</td>
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
        <h4>Não foi encontrado nenhum produto.</h4>
      </div>
    );
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className='page'>
      <h2>Produtos</h2>
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
            <AddButton onClick={handleClick}>Novo produto</AddButton>
          </div>
        </div>
      </div>

      {products.length > 0 ? renderTable(products) : renderEmpty(loading)}
      {open && <ProductModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
