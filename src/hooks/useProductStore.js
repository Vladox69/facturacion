import { useDispatch, useSelector } from "react-redux";
import { onErrorProducts, onLoadingProduct, onLoadProducts } from "../store";
import invoiceApi from "../api/invoiceApi";

export const useProductStore = () => {
  const { isLoading, products, product, errorMessage } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const startLoadingProducts=async({_id})=>{
    dispatch(onLoadingProduct());
    try {
        const {data} = await invoiceApi.get(`/product/business/${_id}`);
        console.log(data);
        dispatch(onLoadProducts(data.products));
    } catch (error) {
        console.log(error);
        dispatch(onErrorProducts('Error al cargar productos'));
    }
  }

  return {
    //* Propiedades
    isLoading,
    products,
    product,
    errorMessage,
    //* Métodos
    startLoadingProducts
  };
};
