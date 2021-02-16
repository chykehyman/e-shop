export const formatData = (productData, numOfColumns) => {
  const numOfFullRows = Math.floor(productData.length / numOfColumns);
  let numOfElementsInLastRow =
    productData.length - numOfFullRows * numOfColumns;

  while (
    numOfElementsInLastRow !== numOfColumns &&
    numOfElementsInLastRow !== 0
  ) {
    productData.push({ _id: `Blank-${numOfElementsInLastRow}`, empty: true });
    numOfElementsInLastRow = numOfElementsInLastRow + 1;
  }

  return productData;
};
