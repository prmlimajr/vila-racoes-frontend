import api from 'app/services/api';

/**
 * LIST ALL PRODUCTS
 */
export const getProducts = async ({ search, page, perPage }) => {
  const list = await api.get(
    `/product?page=${page}&perPage=${perPage}&search=${search}`
  );
  return list.data.message;
};

/**
 * LIST FROM ID
 */
export const getProductDetail = async ({ id }) => {
  const product = await api.get(`/product/${id}`);

  return product.data.message;
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async ({
  code,
  name,
  manufacturer,
  description,
}) => {
  await api.post('/product', {
    code,
    name,
    manufacturer,
    description,
  });
};

/**
 * DELETE PRODUCT
 */
export const destroyProduct = async id => {
  return await api.delete('/product', id);
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (
  id,
  { code, name, manufacturer, description }
) => {
  await api.put(`/product/${id}`, {
    code,
    name,
    manufacturer,
    description,
  });
};
