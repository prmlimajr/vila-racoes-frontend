import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Input from 'app/components/Input';
import Button from 'app/components/Buttons/Button';
import Loader from 'app/components/Loader';
import { createProvider } from 'app/api/provider';

import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';
// import { useProvider } from 'app/hooks/ProvidersContext';
import { Link, useHistory } from 'react-router-dom';

const schema = Yup.object().shape({
  cnpj: Yup.string(),
  name: Yup.string().required('Favor informar o nome'),
  email: Yup.string().email('Favor informar um formato de email válido'),
  phone: Yup.string(),
  address: Yup.string(),
  number: Yup.string(),
  complement: Yup.string(),
  district: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string(),
});

export default function ProviderModal(props) {
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  // const { createProvider } = useProvider();
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
      await createProvider(data);

      props.onClose();

      addToast({
        type: 'success',
        title: 'Cadastro realizado.',
      });
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

  return (
    <div className='dimmer'>
      <div className='modalContainer' ref={node}>
        <h2>Adicionar fornecedor</h2>

        <Formik
          initialValues={{
            cnpj: '',
            name: '',
            email: '',
            phone: '',
            address: '',
            number: '',
            complement: '',
            district: '',
            city: '',
            zipCode: '',
          }}
          onSubmit={data => handleSubmit(data)}
          validationSchema={schema}
        >
          {({ values }) => (
            <Form className='signinForm'>
              <div className='column'>
                <Field type='text' name='name' as={Input} label='Nome' />
                <ErrorMessage
                  component='span'
                  name='name'
                  className='validationInput'
                />
              </div>

              <div className='row'>
                <div className='column'>
                  <Field type='text' name='cnpj' as={Input} label='CNPJ' />
                  <ErrorMessage
                    component='span'
                    name='cnpj'
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
                {loading ? <Loader color='#fff' /> : 'Cadastrar'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
