async function getToken() {
  const endpointToken = 'https://opentdb.com/api_token.php?command=request';
  const requestToken = await fetch(endpointToken);
  const dataToken = await requestToken.json();
  return dataToken;
}

export default getToken;
