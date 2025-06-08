import { useDispatch, useSelector } from "react-redux";
import {
  clearFilteredProducts,
  onErrorProducts,
  onLoadingProduct,
  onLoadProducts,
  setFilteredProducts,
} from "../store";
import invoiceApi from "../api/invoiceApi";

export const useProductStore = () => {
  const { isLoading, products, product, errorMessage, filteredProducts } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();

  const startLoadingProducts = async ({ _id }) => {
    dispatch(onLoadingProduct());
    try {
      const { data } = await invoiceApi.get(`/product/business/${_id}`);
      dispatch(onLoadProducts(data.products));
    } catch (error) {
      console.log(error);
      dispatch(onErrorProducts("Error al cargar productos"));
    }
  };

  const searchingProducts = async ({ query, business ,limit = 20  }) => {
    dispatch(onLoadProducts());
    dispatch(clearFilteredProducts());
    if (query == "" || query == undefined) return;
    const localMatches = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    if (localMatches.length == 0) {
      try {
        const params = new URLSearchParams({ q: query,business ,limit });
        const { data } = await invoiceApi.get(
          `/product/search?${params.toString()}`
        );
        dispatch(setFilteredProducts(data.products));
        dispatch(onLoadProducts(data.products));
      } catch (error) {
        console.log(error);
        dispatch(onErrorProducts("No existe ningun producto"));
      }
    } else {
      dispatch(setFilteredProducts(localMatches));
    }
  };

  return {
    //* Propiedades
    isLoading,
    products,
    product,
    filteredProducts,
    errorMessage,
    //* Métodos
    startLoadingProducts,
    searchingProducts,
  };
};
