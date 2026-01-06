/* eslint-disable react/prop-types */

const ArcNumberFormatting = ({ number, currency }) => {
  const formattedEuro = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);

  const formattedYen = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(number);

  const formattedSignificantDigits = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(number);

  const formattedUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  const formattedINR = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
  const formatToKL = (num) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr"; // Crore
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + "L"; // Lakh
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"; // Thousand
    }
    return num;
  };

  const formattedINR_KL = formatToKL(number);

  return (
    // <>
    //   {currency === "EUR" && formattedEuro}
    //   {currency === "JPY" && formattedYen}
    //   {currency === "IN" && formattedSignificantDigits}
    //   {currency === "USD" && formattedUSD}
    //   {currency === "INR" && formattedINR}
    //   {currency === "INR-KL" && formattedINR_KL}
    // </>
    currency === "EUR" ? formattedEuro :
      currency === "JPY" ? formattedYen :
        currency === "IN" ? formattedSignificantDigits :
          currency === "USD" ? formattedUSD :
            currency === "INR" ? formattedINR :
              currency === "INR-KL" ? formattedINR_KL :
                null
  );
};

export default ArcNumberFormatting;
