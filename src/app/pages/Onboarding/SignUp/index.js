import React, { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import Input from 'app/components/Input';
import Button from 'app/components/Buttons/Button';
import Loader from 'app/components/Loader';

import { register } from 'app/api/user';

import { useToast } from 'app/hooks/ToastContext';
import { useLoading } from 'app/hooks/LoadingContext';

import './SignUp.scss';

const schema = Yup.object().shape({
  firstName: Yup.string().required('Favor informar o seu nome'),
  lastName: Yup.string().required('Favor informar o seu sobrenome'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('Favor informar o email cadastrado'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Favor informar uma senha'),
  confirmPassword: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Favor confirmar a sua senha'),
});

export default function SignUp() {
  const history = useHistory();
  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();

  const handleSubmit = async data => {
    try {
      setLoading(true);

      await schema.validate(data, { abortEarly: false });

      await register(data);

      addToast({
        type: 'success',
        title: 'Cadastro realizado.',
        description: 'Faça o login para acessar o sistema.',
      });

      history.push('/login');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha no cadastro.',
        description:
          'Ocorreu um erro ao fazer o cadastro. Verifique os seus dados e tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='onboarding'>
      <div className='leftSide'></div>

      <div className='rightSide'>
        <div className='animatedRightSide'>
          <h1>Faça o seu cadastro</h1>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={data => handleSubmit(data)}
            validationSchema={schema}
          >
            {({ values }) => (
              <Form className='signinForm'>
                <div className='row'>
                  <div className='signupColumn'>
                    <Field
                      type='text'
                      name='firstName'
                      as={Input}
                      label='Nome'
                    />
                    <ErrorMessage
                      component='span'
                      name='firstName'
                      className='validationInput'
                    />
                  </div>
                  <div className='signupColumn'>
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
                <Field type='email' name='email' as={Input} label='E-mail' />
                <ErrorMessage
                  component='span'
                  name='email'
                  className='validationInput'
                />
                <Field
                  type='password'
                  name='password'
                  as={Input}
                  label='Senha'
                />
                <ErrorMessage
                  component='span'
                  name='password'
                  className='validationInput'
                />
                <Field
                  type='password'
                  name='confirmPassword'
                  as={Input}
                  label='Confirmar senha'
                />
                <ErrorMessage
                  component='span'
                  name='confirmPassword'
                  className='validationInput'
                />

                <Button disabled={loading} onClick={handleSubmit}>
                  {loading ? <Loader color='#fff' /> : 'Cadastrar'}
                </Button>

                <div className='row-align-right'>
                  <p>Já tem sua conta?</p>
                  <Link to='/login'>Faça o login aqui.</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
