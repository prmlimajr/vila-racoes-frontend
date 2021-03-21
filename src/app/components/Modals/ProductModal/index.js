import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Input from 'app/components/Input';
import InputNumber from 'app/components/InputNumber';
import Button from 'app/components/Buttons/Button';
import Loader from 'app/components/Loader';
import { createProduct, updateProduct } from 'app/api/product';

import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';
import { Link, useHistory } from 'react-router-dom';

import './ProductModal.scss';

const schema = Yup.object().shape({
  code: Yup.string().required('Favor informar um código para o produto'),
  name: Yup.string().required('Favor informar o nome'),
  manufacturer: Yup.string(),
  description: Yup.string(),
  quantity: Yup.number('Favor informar uma quantidade válida').positive(
    'Favor informar uma quantidade válida'
  ),
  price: Yup.number('Favor informar um preço válido').positive(
    'Favor informar um preço válido'
  ),
});

export default function ProductModal(props) {
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

  const handleSubmit = async data => {
    try {
      setLoading(true);

      await schema.validate(data, { abortEarly: false });

      if (props.type === 'create') {
        await createProduct(data);
      } else {
        await updateProduct(props.product.id, data);
      }

      addToast({
        type: 'success',
        title: 'Cadastro realizado.',
      });

      props.onClose();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha no cadastro.',
        description:
          'Ocorreu um erro ao fazer o cadastro. Verifique os dados e tente novamente.',
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

  const initialValues = () => {
    if (props.type === 'update') {
      return {
        code: props.product.code,
        name: props.product.name,
        manufacturer: props.product.manufacturer,
        description: props.product.description,
        quantity: props.product.stock.quantity,
        price: props.product.price,
      };
    }
    return {
      code: '',
      name: '',
      manufacturer: '',
      description: '',
      quantity: '',
      price: '',
    };
  };

  return (
    <div className='dimmer'>
      <div className='modalContainer' ref={node}>
        <h2>
          {props.type === 'update' ? 'Atualizar produto' : 'Adicionar produto'}
        </h2>

        <Formik
          initialValues={initialValues()}
          onSubmit={data => handleSubmit(data)}
          validationSchema={schema}
        >
          {({ values }) => (
            <Form className='signinForm'>
              <div className='row'>
                <div className='column'>
                  <Field type='text' name='code' as={Input} label='Código' />
                  <ErrorMessage
                    component='span'
                    name='code'
                    className='validationInput'
                  />
                </div>

                <div className='column'>
                  <Field type='text' name='name' as={Input} label='Nome' />
                  <ErrorMessage
                    component='span'
                    name='name'
                    className='validationInput'
                  />
                </div>
              </div>

              <div className='column'>
                <Field
                  type='text'
                  name='manufacturer'
                  as={Input}
                  label='Fabricante'
                />
                <ErrorMessage
                  component='span'
                  name='manufacturer'
                  className='validationInput'
                />
              </div>
              <div className='column'>
                <Field
                  type='text'
                  name='description'
                  as={Input}
                  label='Descrição'
                />
                <ErrorMessage
                  component='span'
                  name='description'
                  className='validationInput'
                />
              </div>

              <div className='row'>
                <div className='column'>
                  <Field
                    type='text'
                    name='quantity'
                    as={InputNumber}
                    label='Quantidade em estoque'
                  />
                  <ErrorMessage
                    component='span'
                    name='quantity'
                    className='validationInput'
                  />
                </div>
                <div className='column'>
                  <Field
                    type='text'
                    name='price'
                    as={InputNumber}
                    label='Preço unitário'
                  />
                  <ErrorMessage
                    component='span'
                    name='price'
                    className='validationInput'
                  />
                </div>
              </div>

              <Button disabled={loading}>
                {loading ? (
                  <Loader color='#fff' />
                ) : props.type === 'create' ? (
                  'Cadastrar'
                ) : (
                  'Atualizar'
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
