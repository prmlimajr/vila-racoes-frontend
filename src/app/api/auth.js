import api from 'app/services/api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });

  const { token, user } = data.message;
  return { token, user };
}

export const loginWithToken = async token => {
  await api.post('/session/me', { token });
};

export async function logout() {
  await api.post('/auth/logout');
}
