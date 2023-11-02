import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const myCookieValue = getCookie('token');
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
            router.push('/dashboard');
          } else {
            console.error('Gagal melakukan permintaan:', res.status);
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log('error: ', error);
        // alert('Terjadi Kesalahan, harap hubungi team support');
      }
    };

    run();
  }, [router]);

  return <></>;
}

