import React from 'react';
import * as DateFns from 'date-fns';
import MenuButton from '../../components/MenuButton';
import { useAuth } from '../../hooks/AuthContext';
import { getUser } from '../../services/auth';

import './Home.scss';

export default function Home() {
  // const { user } = useAuth();
  const user = JSON.parse(getUser());
  const { firstName, lastName } = user;

  return (
    <div className='container'>
      <div className='header'>
        <div className='empty'></div>
        <span id='date'>{DateFns.format(new Date(), 'dd/MM/yyyy')}</span>
        <span id='username'>{`${firstName} ${lastName}`}</span>
      </div>

      <div className='menuContainer'>
        <div className='mainMenu'>
          <MenuButton
            icon='bar-chart'
            title='Relatórios'
            redirect='relatorios'
          />
          <MenuButton icon='cart' title='Pedidos' redirect='pedidos' />
          <MenuButton icon='products' title='Produtos' redirect='produtos' />
          <MenuButton icon='clients' title='Clientes' redirect='clientes' />
          <MenuButton
            icon='truck'
            title='Fornecedores'
            redirect='fornecedores'
          />
          <MenuButton icon='logout' title='Encerrar sessão' />
        </div>
      </div>
    </div>
  );
}
