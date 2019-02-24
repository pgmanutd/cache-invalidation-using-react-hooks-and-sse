const parseJSON = (stringifiedJSON, fallbackValue) => {
  try {
    return JSON.parse(stringifiedJSON) || fallbackValue;
  } catch (e) {
    return fallbackValue;
  }
};

export default parseJSON;
