import React, { useEffect, useRef } from 'react';
import Button from 'app/components/Buttons/Button';
import { FiAlertTriangle } from 'react-icons/fi';
import { deleteProduct } from 'app/api/product';
import { deleteProvider } from 'app/api/provider';
import { deleteCustomer } from 'app/api/customer';

import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';

import './DeleteModal.scss';

export default function DeleteModal(props) {
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  const node = useRef();

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        props.onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (props.entity === 'customer') {
        await deleteCustomer(props.id);
      } else if (props.entity === 'provider') {
        console.log('object', props.id);
        await deleteProvider(props.id);
      } else if (props.entity === 'product') {
        await deleteProduct(props.id);
      }

      addToast({
        type: 'success',
        title: 'Cadastro excluído.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na requisição.',
        description: 'Ocorreu um erro ao excluir o cadastro.Tente novamente.',
      });
    } finally {
      setLoading(false);
      props.onClose();
      window.location.reload();
    }
  };

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    props.onClose();
  };

  return (
    <div className='dimmer'>
      <div className='deleteContainer' ref={node}>
        <h2>{`Excluir ${props.name}`}</h2>

        <FiAlertTriangle size={50} />

        <p>
          Você realmente deseja excluir os dados de{' '}
          <strong>{props.name}</strong>?
        </p>

        <div className='row'>
          <Button onClick={props.onClose}>Cancelar</Button>
          <Button onClick={() => handleSubmit()}>Excluir</Button>
        </div>
      </div>
    </div>
  );
}
