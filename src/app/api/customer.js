import api from 'app/services/api';

/**
 * LIST ALL CUSTOMERS
 */
export const getCustomers = async ({ search, page, perPage }) => {
  const list = await api.get(
    `customer?page=${page}&perPage=${perPage}&search=${search}`
  );
  return list.data.message;
};

/**
 * LIST FROM ID
 */
export const getCustomerDetail = async ({ id }) => {
  const customer = await api.get(`customer/${id}`);

  return customer.data.message;
};

/**
 * CREATE CUSTOMER
 */
export const createCustomer = async ({
  cpf,
  firstName,
  lastName,
  email,
  phone,
  address,
  number,
  complement,
  district,
  city,
  zipCode,
}) => {
  await api.post('/customer', {
    cpf,
    firstName,
    lastName,
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
 * DELETE CUSTOMER
 */
export const destroyCustomer = async id => {
  return await api.delete('/customer', id);
};

/**
 * UPDATE CUSTOMER
 */
export const updateCustomer = async (
  id,
  {
    cpf,
    firstName,
    lastName,
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
  await api.put(`/customer/${id}`, {
    cpf,
    firstName,
    lastName,
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
