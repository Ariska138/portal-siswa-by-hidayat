export const getDataApi = async (
  path = '/api/listUsers',
  successCallback,
  failCallBack,
  tokenFailCallback = null
) => {
  let myToken = '';
  if (localStorage.getItem('keepLogin') === 'true') {
    myToken = getCookie('token');
  } else {
    myToken = sessionStorage.getItem('token');
  }

  if (myToken) {
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
  } else {
    tokenFailCallback();
  }
};

export const postDataApi = async (
  path,
  data,
  successCallback,
  failCallBack,
  tokenFailCallback = null
) => {
  // mengambil token
  let myToken = '';
  if (localStorage.getItem('keepLogin') === 'true') {
    myToken = getCookie('token');
  } else {
    myToken = sessionStorage.getItem('token');
  }

  if (myToken) {
    // mengambil data
    const res = await fetch(path, {
      method: 'POST', // Corrected the typo in 'method'
      body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
      headers: {
        'Content-Type': 'application/json', // Specifying the content type as JSON
        Authorization: myToken,
      },
    });

    const responseData = await res.json(); // Mendapatkan data JSON dari respons

    if (res.ok) {
      successCallback(responseData);
    } else {
      console.error('Gagal melakukan permintaan:', res.status);
      failCallBack(responseData);
    }
  } else {
    tokenFailCallback();
  }
};
