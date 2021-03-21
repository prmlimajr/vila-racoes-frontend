import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Input from 'app/components/Input';
import Button from 'app/components/Buttons/Button';
import Loader from 'app/components/Loader';
import { createCustomer, updateCustomer } from 'app/api/customer';

import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';
import { Link, useHistory } from 'react-router-dom';

import './CustomerModal.scss';

const schema = Yup.object().shape({
  cpf: Yup.string(),
  firstName: Yup.string().required('Favor informar o nome'),
  lastName: Yup.string().required('Favor informar o sobrenome'),
  email: Yup.string().email('Favor informar um formato de email válido'),
  phone: Yup.string(),
  address: Yup.string(),
  number: Yup.string(),
  complement: Yup.string(),
  district: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
});

export default function CustomerModal(props) {
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
        await createCustomer(data);
      } else {
        await updateCustomer(props.product.id, data);
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
        cpf: props.customer.cpf,
        firstName: props.customer.firstName,
        lastName: props.customer.lastName,
        email: props.customer.email,
        phone: props.customer.phone,
        address: props.customer.address.address,
        number: props.customer.address.number,
        complement: props.customer.address.complement,
        district: props.customer.address.district,
        city: props.customer.address.city,
        zipCode: props.customer.address.zipCode,
      };
    }
    return {
      cpf: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      zipCode: '',
    };
  };

  return (
    <div className='dimmer'>
      <div className='modalContainer' ref={node}>
        <h2>
          {props.type === 'update' ? 'Atualizar cliente' : 'Adicionar cliente'}
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
                  <Field type='text' name='firstName' as={Input} label='Nome' />
                  <ErrorMessage
                    component='span'
                    name='firstName'
                    className='validationInput'
                  />
                </div>
                <div className='column'>
                  <Field
                    type='text'
                    name='lastName'
                    as={Input}
                    label='Sobrenome'
                  />
                  <ErrorMessage
                    component='span'
                    name='lastName'
                    className='validationInput'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='column'>
                  <Field type='text' name='cpf' as={Input} label='CPF' />
                  <ErrorMessage
                    component='span'
                    name='cpf'
                    className='validationInput'
                  />
                </div>
                <div className='column'>
                  <Field type='text' name='phone' as={Input} label='Telefone' />
                  <ErrorMessage
                    component='span'
                    name='phone'
                    className='validationInput'
                  />
                </div>
              </div>

              <Field type='email' name='email' as={Input} label='E-mail' />
              <ErrorMessage
                component='span'
                name='email'
                className='validationInput'
              />

              <div className='row'>
                <div className='column'>
                  <Field
                    type='text'
                    name='address'
                    as={Input}
                    label='Endereço'
                  />
                  <ErrorMessage
                    component='span'
                    name='address'
                    className='validationInput'
                  />
                </div>
                <div className='column'>
                  <Field type='text' name='number' as={Input} label='Número' />
                  <ErrorMessage
                    component='span'
                    name='number'
                    className='validationInput'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='column'>
                  <Field
                    type='text'
                    name='complement'
                    as={Input}
                    label='Complemento'
                  />
                  <ErrorMessage
                    component='span'
                    name='complement'
                    className='validationInput'
                  />
                </div>
                <div className='column'>
                  <Field
                    type='text'
                    name='district'
                    as={Input}
                    label='Bairro'
                  />
                  <ErrorMessage
                    component='span'
                    name='district'
                    className='validationInput'
                  />
                </div>
              </div>

              <div className='row'>
                <div className='column'>
                  <Field type='text' name='city' as={Input} label='Cidade' />
                  <ErrorMessage
                    component='span'
                    name='city'
                    className='validationInput'
                  />
                </div>
                <div className='column'>
                  <Field type='text' name='zipCode' as={Input} label='CEP' />
                  <ErrorMessage
                    component='span'
                    name='zipCode'
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
