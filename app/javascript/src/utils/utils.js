export function capitalize(string) {
  return string[0].toUpperCase().concat(string.slice(1).toLowerCase());
};

export function removeUnderscores(string) {
  return string.split('_').join(' ');
}

export function errorObject(error) {
  const parseError = JSON.parse(error.message);
  if (typeof parseError === 'string') {
    return parseError;
  };

  const errorArray = Object.keys(parseError).map(errorName => {
    const formattedName = removeUnderscores(errorName)
    return `The ${ formattedName } ${ parseError[errorName].join(', ')}`
  });

  return errorArray.join('. ');
};