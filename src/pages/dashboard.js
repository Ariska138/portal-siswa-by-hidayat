import styles from '@/styles/Dasbor.module.css';
import { dmSans } from '@/styles/fonts';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dasbor() {
  const [user, setUser] = useState({ id: '', name: '' });
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
            setUser(responseData);
          } else {
            console.error('Gagal melakukan permintaan:', res.status);
            alert('terjadi kesalahan koneksi');
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

  return (
    <div className={`${styles.container} ${dmSans.className}`}>
      <div className={styles.sidebar}>
        <div
          style={{
            paddingTop: '56px',
            paddingBottom: '56px',
            paddingLeft: '54px',
            paddingRight: '54px',
          }}
        >
          <h1>Dasboard</h1>
        </div>
        <div>
          <ul>
            <li style={{ listStyleType: 'none' }}>
              <button
                style={{ fontWeight: '18px' }}
                onClick={async () => {
                  const myCookieValue = getCookie('token');
                  console.log('myCookieValue: ', myCookieValue);
                  if (myCookieValue) {
                    const data = { token: myCookieValue };
                    const res = await fetch('/api/logout', {
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
                      router.push('/login');
                    } else {
                      console.error('Gagal melakukan permintaan:', res.status);
                      alert('terjadi kesalahan koneksi');
                    }
                  } else {
                    router.push('/login');
                  }
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          width: '100%',
          padding: '16px',
        }}
      >
        <span style={{ fontWeight: '700', fontSize: '28px' }}>{user.name}</span>
      </div>
    </div>
  );
}
