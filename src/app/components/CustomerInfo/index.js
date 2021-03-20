import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import * as DateFns from 'date-fns';

import './CustomerInfo.scss';

export default function CustomerInfo(props) {
  const handleEdit = id => {};

  return (
    <div className='row'>
      <div className='customerCard'>
        <div className='row-info'>
          <span className='bold'>Nome: </span>
          <p>{`${props.customer.firstName} ${props.customer.lastName}`}</p>
        </div>

        <div className='row-info'>
          <span className='bold'>Endereço: </span>
          <p>{`${props.customer.address.address}, ${props.customer.address.number}`}</p>
        </div>

        <div className='row-info'>
          <span className='bold'>Bairro: </span>
          <p>{props.customer.address.district}</p>
        </div>

        <div className='row-info'>
          <span className='bold'>Cidade: </span>
          <p>{props.customer.address.city}</p>
        </div>
      </div>

      <div className='customerCard'>
        <div className='row-info'>
          <span className='bold'>Telefone: </span>
          <p>{props.customer.phone}</p>
        </div>

        <div className='row-info'>
          <span className='bold'>E-mail: </span>
          <p>{props.customer.email}</p>
        </div>

        <div className='row-info'>
          <span className='bold'>Cliente desde: </span>
          <p>
            {DateFns.format(
              DateFns.parseISO(props.customer.created),
              'dd/MM/yyyy'
            )}
          </p>
        </div>
      </div>

      <div className='customerCard'>
        <FiEdit
          size={14}
          className='clickable'
          onClick={() => handleEdit(props.customer.id)}
        />
      </div>
    </div>
  );
}
