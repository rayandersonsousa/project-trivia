async function getResults(token) {
  const endpointResult = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const requestResult = await fetch(endpointResult);
  const dataResult = await requestResult.json();
  return dataResult;
}

export default getResults;
