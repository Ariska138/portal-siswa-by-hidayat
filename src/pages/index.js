import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parse, serialize } from 'cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const cookies = parse(document.cookie || ''); // req.headers.cookie adalah header cookie dari permintaan HTTP
        const myCookieValue = cookies.token;
        console.log('myCookieValue: ', myCookieValue);
        if (myCookieValue) {
          const data = { token: myCookieValue };
          const res = await fetch('/api/checkToken', {
            method: 'POST', // Corrected the typo in 'method'
            body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
            headers: {
              'Content-Type': 'application/json', // Specifying the content type as JSON
            },
          });

          if (res.ok) {
            // Periksa apakah respons memiliki status code 200 (OK)
            const responseData = await res.json(); // Mendapatkan data JSON dari respons
            console.log(responseData);
            alert('sukses login');
            router.push('/dashboard');
          } else {
            console.error('Gagal melakukan permintaan:', res.status);
            alert('terjadi kesalahan koneksi');
            router.push('/login');
          }

          console.log('Res: ', res);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log('error: ', error);
        alert('Terjadi Kesalahan, harap hubungi team support');
      }
    };

    run();
  });

  return <></>;
}

