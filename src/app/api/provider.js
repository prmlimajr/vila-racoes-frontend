import api from 'app/services/api';

/**
 * LIST ALL PROVIDERS
 */
export const getProviders = async ({ search, page, perPage }) => {
  const list = await api.get(
    `provider?page=${page}&perPage=${perPage}&search=${search}`
  );
  return list.data.message;
};

/**
 * LIST FROM ID
 */
export const getProviderDetail = async ({ id }) => {
  const provider = await api.get(`provider/${id}`);

  return provider.data.message;
};

/**
 * CREATE PROVIDER
 */
export const createProvider = async ({
  cnpj,
  name,
  email,
  phone,
  address,
  number,
  complement,
  district,
  city,
  zipCode,
}) => {
  await api.post('/provider', {
    cnpj,
    name,

    email,
    phone,
    address,
    number,
    complement,
    district,
    city,
    zipCode,
  });
};

/**
 * DELETE PROVIDER
 */
export const deleteProvider = async id => {
  await api.delete(`/provider/${id}`);
};

/**
 * UPDATE PROVIDER
 */
export const updateProvider = async (
  id,
  {
    cnpj,
    name,
    email,
    phone,
    address,
    number,
    complement,
    district,
    city,
    zipCode,
  }
) => {
  await api.put(`/provider/${id}`, {
    cnpj,
    name,
    email,
    phone,
    address,
    number,
    complement,
    district,
    city,
    zipCode,
  });
};
