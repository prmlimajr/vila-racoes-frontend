import React, { useState, useCallback } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Input from 'app/components/Input';
import Button from 'app/components/Buttons/Button';
import Loader from 'app/components/Loader';

import Logo from 'app/assets/img/logo.svg';

import { useAuth } from 'app/hooks/AuthContext';
import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';

import './SignIn.scss';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('Favor informar o email cadastrado'),
  password: Yup.string().required('Favor informar a sua senha'),
});

export default function SignIn() {
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();

  const handleSubmit = async ({ email, password }) => {
    try {
      setLoading(true);

      await signIn({ email, password });

      history.push('/');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha na autenticação',
        description: 'Verifique suas credenciais.',
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);
  return (
    <div className='onboarding'>
      <div className='leftSide'></div>

      <div className='rightSide'>
        <div className='animatedRightSide'>
          <div className='logo'>
            <img src={Logo} alt='Vila Rações' />
          </div>

          <h1>Bem vindo</h1>
          <p>Faça o login para acessar o sistema</p>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={data => handleSubmit(data)}
            validationSchema={schema}
          >
            <Form id='column'>
              <Field
                type='text'
                label='E-mail'
                name='email'
                placeholder='Insira o seu e-mail'
                as={Input}
              />
              <ErrorMessage
                component='span'
                name='email'
                className='validationInput'
              />

              <Field
                type='password'
                label='Senha'
                name='password'
                placeholder='Insira a sua senha'
                as={Input}
              />
              <ErrorMessage
                component='span'
                name='password'
                className='validationInput'
              />

              <Button disabled={loading}>
                {loading ? <Loader color='#fff' /> : 'Entrar'}
              </Button>

              <div className='row-align-right'>
                <p>
                  Ainda não tem sua conta?
                  <Link to='/cadastro'>Faça o seu cadastro aqui.</Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
