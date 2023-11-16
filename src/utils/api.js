export const getDataApi = async (
  token,
  path = '/api/listUsers',
  successCallback,
  failCallBack
) => {
  const res = await fetch(path, {
    method: 'GET', // Corrected the typo in 'method'
    headers: {
      'Content-Type': 'application/json', // Specifying the content type as JSON
      Authorization: token,
    },
  });

  const responseData = await res.json(); // Mendapatkan data JSON dari respons

  if (res.ok) {
    successCallback(responseData);
  } else {
    failCallBack(responseData);
  }
};

export const postDataApi = async (
  token,
  path,
  data,
  successCallback,
  failCallBack
) => {
  const res = await fetch(path, {
    method: 'POST', // Corrected the typo in 'method'
    body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
    headers: {
      'Content-Type': 'application/json', // Specifying the content type as JSON
      Authorization: token,
    },
  });

  const responseData = await res.json(); // Mendapatkan data JSON dari respons

  if (res.ok) {
    successCallback(responseData);
  } else {
    failCallBack(responseData);
  }
};
