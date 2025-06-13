export const calculateProductDetails = (product,quantity) => {
  const { pvp, iva, ice } = product;
  const unitICE = pvp * ice.percentage;
  const priceICE = pvp + unitICE;
  const unitIVA = priceICE * iva.percentage;
  const finalPrice = unitIVA + priceICE;
  const unitValue = finalPrice;
  const valueWithoutTaxes = priceICE;
  const totalValue = finalPrice * quantity;
  const totalTaxes = unitIVA * quantity;
  const unitPriceWithoutTax = priceICE;
  const unitPriceWithTax = finalPrice;
  const totalPriceWithoutTax = priceICE * quantity;
  const totalPriceWithTax = totalValue;

  return {
    id: product._id,
    product: product.name,
    quantity,
    unitValue,
    totalValue,
    valueWithoutTaxes,
    totalTaxes,
    ad1: "",
    ad2: "",
    ad3: "",
    tax: iva._id,
    unitPriceWithoutTax,
    unitPriceWithTax,
    totalPriceWithTax,
    totalPriceWithoutTax    
  };
};
