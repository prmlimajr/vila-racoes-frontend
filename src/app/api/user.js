import api from 'app/services/api';

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
