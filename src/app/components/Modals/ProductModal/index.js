import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Input from 'app/components/Input';
import Button from 'app/components/Buttons/Button';
import Loader from 'app/components/Loader';
import { createProduct } from 'app/api/product';

import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';
import { Link, useHistory } from 'react-router-dom';

import './ProductModal.scss';

const schema = Yup.object().shape({
  code: Yup.string(),
  name: Yup.string().required('Favor informar o nome'),
  manufacturer: Yup.string(),
  description: Yup.string(),
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
      await createProduct(data);

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
        <h2>Adicionar produto</h2>

        <Formik
          initialValues={{
            code: '',
            name: '',
            manufacturer: '',
            description: '',
          }}
          onSubmit={data => handleSubmit(data)}
          validationSchema={schema}
        >
          {({ values }) => (
            <Form className='signinForm'>
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
