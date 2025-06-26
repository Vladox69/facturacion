export const calculateProductDetails = (product, quantity) => {
  const { pvp, iva, ice } = product;

  const unitICE = parseFloat((pvp * ice.percentage).toFixed(2));
  const priceICE = parseFloat((pvp + unitICE).toFixed(2));
  const unitIVA = parseFloat((priceICE * iva.percentage).toFixed(2));
  const finalPrice = parseFloat((priceICE + unitIVA).toFixed(2));

  const unitValue = finalPrice;
  const valueWithoutTaxes = priceICE;

  const totalValue = parseFloat((finalPrice * quantity).toFixed(2));
  const totalTaxes = parseFloat((unitIVA * quantity).toFixed(2));

  const unitPriceWithoutTax = priceICE;
  const unitPriceWithTax = finalPrice;
  const totalPriceWithoutTax = parseFloat((priceICE * quantity).toFixed(2));
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
