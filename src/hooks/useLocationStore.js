import { useDispatch, useSelector } from "react-redux";
import { onErrorLocation, onLoadingLocation, onLoadLocations } from "../store";
import invoiceApi from "../api/invoiceApi";

export const useLocationStore = () => {
  const { isLoadingLocation, locations, location, errorMessageLocation } =
    useSelector((state) => state.location);

  const dispatch = useDispatch();

  const startLoadingLocations = async ({ _id }) => {
    dispatch(onLoadingLocation());
    try {
      const { data } = await invoiceApi.get(`/location/business/${_id}`);
      dispatch(onLoadLocations(data.locations));
    } catch (error) {
      console.log(error);
      dispatch(onErrorLocation("Error al cargar las ubicaciones"));
    }
  };

  return {
    //* Propiedades
    isLoadingLocation,
    locations,
    location,
    errorMessageLocation,
    //* Metodos
    startLoadingLocations,
  };
};
