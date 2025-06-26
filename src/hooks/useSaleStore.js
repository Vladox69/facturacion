import { useDispatch, useSelector } from "react-redux";
import { onLoadCharts, onLoadingSales, onLoadSales } from "../store";
import invoiceApi from "../api/invoiceApi";

export const useSaleStore = () => {
  const { isLoadingSales, sales, errorMessageSales, topProducts, topCustomers } = useSelector(
    (state) => state.sale
  );
  const dispatch = useDispatch();

  const startLoadingSales = async ({ _id }) => {
    try {
      dispatch(onLoadingSales());
      const { data } = await invoiceApi.get(`/sale/business/${_id}`);
      dispatch(onLoadSales(data.sales));
    } catch (error) {
      console.log(error);
      dispatch(errorMessageSales("Error al cargar ventas"));
    }
  };

  const startLoadingCharts= async({_id})=>{
    try {
      dispatch(onLoadingSales());
      const { data } = await invoiceApi.get(`/sale/stats/${_id}`);
      dispatch(onLoadCharts(data));
    } catch (error) {
      console.log(error);
      dispatch(errorMessageSales("Error al cargar gráficos de ventas"));
    }
  }

  return {
    //* Propiedades
    isLoadingSales,
    sales,
    errorMessageSales,
    topProducts,
    topCustomers,
    //* Métodos
    startLoadingSales,
    startLoadingCharts
  };
};
