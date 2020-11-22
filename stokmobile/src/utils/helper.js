export const addElement = (elements = [], element = {}) => {
  return [...elements, element];
};

export const updateElement = (elements = [], element = {}, index = 0) => {
  return [...elements.slice(0, index), element, ...elements.slice(index + 1)];
};

export const rowsToArray = (rows) => {
  var len = rows.length;
  const data = [];
  for (let i = 0; i < len; i++) {
    data.push(rows.item(i));
  }
  return data;
};
