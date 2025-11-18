export function formatCurrency(
  amount: number,
  currencyCode: string = "PEN"
): string {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: currencyCode.toLowerCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  try {
    return new Intl.NumberFormat("es-PE", options).format(amount);
  } catch (error) {
    // Fallback formating if currency code is invalid
    console.error("Invalid currency code: ", currencyCode, error);
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
  }
}