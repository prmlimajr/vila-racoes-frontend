import React from 'react';
import {
  FiBarChart2,
  FiShoppingCart,
  FiList,
  FiUsers,
  FiTruck,
  FiLogOut,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

import './MenuButton.css';

export default function MenuButton(props) {
  const { signOut } = useAuth();

  const getIcon = (i) => {
    switch (i) {
      case 'bar-chart':
        return <FiBarChart2 size={50} color='#FAFAFA' />;
      case 'cart':
        return <FiShoppingCart size={50} color='#FAFAFA' />;
      case 'products':
        return <FiList size={50} color='#FAFAFA' />;
      case 'clients':
        return <FiUsers size={50} color='#FAFAFA' />;
      case 'truck':
        return <FiTruck size={50} color='#FAFAFA' />;
      case 'logout':
        return <FiLogOut size={50} color='#FAFAFA' />;
    }
  };

  return (
    <Link to={props.redirect ? `/${props.redirect}` : '#'}>
      <div
        className='menuButton'
        onClick={() => (props.redirect ? null : signOut())}
      >
        {getIcon(props.icon)}
        <span id='menuButton'>{props.title}</span>
      </div>
    </Link>
  );
}
