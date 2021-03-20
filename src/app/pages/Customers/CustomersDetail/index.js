import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as DateFns from 'date-fns';
import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';
import Loader from 'app/components/Loader';
import { getCustomerDetail } from 'app/api/customer';
import Button from 'app/components/Buttons/Button';
import CustomerInfo from 'app/components/CustomerInfo';

import './CustomersDetail.scss';

export default function CustomersDetail(props) {
  const history = useHistory();
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();

  const [customer, setCustomer] = useState(null);

  useEffect(async () => {
    try {
      setLoading(true);
      const id = props.match.params;

      const customer = await getCustomerDetail(id);

      setCustomer(customer);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na requisição',
        description:
          'Não foi possível carregar os dados do cliente. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className='pageDetail'>
      <div className='leftSide'>
        <h2>Clientes</h2>

        <div>{customer && <CustomerInfo customer={customer} />}</div>
      </div>
    </div>
  );
}
