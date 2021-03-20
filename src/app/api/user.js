import api from '../services/api';

/**
 * CREATE USER
 */
export const register = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  passwordReminder,
}) => {
  await api.post('/users', {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    passwordReminder,
  });
};
