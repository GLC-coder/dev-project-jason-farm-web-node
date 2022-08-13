import { toUnicode } from 'punycode';

const replaceTemplate = (temp, item) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, item.productName);
  output = output.replace(/{%IMAGE%}/g, item.image);
  output = output.replace(/{%QUANTITY%}/g, item.quantity);
  output = output.replace(/{%PRICE%}/g, item.price);
  output = output.replace(/{%ID%}/g, item.id);
  output = output.replace(/{%FROM%}/g, item.from);
  output = output.replace(/{%NUTRIENTS%}/g, item.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, item.description);

  if (!item.organic) {
    output = output.replace(/{%NOT_OGANIC%}/g, 'not-organic');
  }
  return output;
};
export default replaceTemplate;
