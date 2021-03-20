import React, { useState, useEffect } from 'react';
import Logo from 'app/assets/img/logo.svg';
import {
  FiBarChart2,
  FiShoppingCart,
  FiList,
  FiUsers,
  FiTruck,
  FiLogOut,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as DateFns from 'date-fns';
import { useAuth } from 'app/hooks/AuthContext';
import { getUser } from 'app/services/auth';

import './Navbar.scss';

export default function Navbar() {
  const { signOut } = useAuth();
  const user = JSON.parse(getUser());
  const { firstName, lastName } = user;

  return (
    <header className='headerContainer'>
      <div className='row'>
        <img src={Logo} alt='Vila Rações' className='logoImgSmall' />

        <div className='headerMenu'>
          <ul className='headerList'>
            <Link to='/relatorios'>
              <li>
                <FiBarChart2 size={20} color='#F2f2f2' />
              </li>
            </Link>
            <Link to='/pedidos'>
              <li>
                <FiShoppingCart size={20} color='#f2f2f2' />
              </li>
            </Link>
            <Link to='/produtos'>
              <li>
                <FiList size={20} color='#f2f2f2' />
              </li>
            </Link>
            <Link to='/clientes'>
              <li>
                <FiUsers size={20} color='#f2f2f2' />
              </li>
            </Link>
            <Link to='/fornecedores'>
              <li>
                <FiTruck size={20} color='#f2f2f2' />
              </li>
            </Link>
            <li onClick={signOut}>
              <FiLogOut size={20} color='#f2f2f2' />
            </li>
          </ul>
        </div>
      </div>

      <span id='usernameHeader'>{`${firstName} ${lastName}`}</span>
    </header>
  );
}
