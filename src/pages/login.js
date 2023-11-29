import styles from '@/styles/Login.module.css';
import { dmSans } from '@/styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [isKeepLogin, setKeepLogin] = useState(false);

  return (
    <div className={`${styles.container} ${dmSans.className}`}>
      <div className={styles.card}>
        <h1>Sign</h1>
        <div className={styles.summary}>
          Enter your email and password to sign in!
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            NIS<span className={styles.star}>*</span>
          </div>
          <input
            className={styles.input}
            placeholder="12345"
            onChange={(e) => {
              setNis(e.target.value);
            }}
          />
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            Password<span className={styles.star}>*</span>
          </div>
          <input
            className={styles.input}
            placeholder="******"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <input
              type="checkbox"
              onChange={(e) => {
                console.log(e.target.checked);
                let isChecked = e.target.checked;
                localStorage.setItem('keepLogin', isChecked);
                setKeepLogin(isChecked);
              }}
            ></input>
            <span> Keep Me Logged In</span>
          </div>
        </div>
        <button
          className={styles.buttonPrimary}
          onClick={async (e) => {
            const data = { nis, password, isKeepLogin };

            try {
              const res = await fetch('/api/login', {
                method: 'POST', // Corrected the typo in 'method'
                body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
                headers: {
                  'Content-Type': 'application/json', // Specifying the content type as JSON
                },
              });
              const responseData = await res.json();

              if (res.ok) {
                // Periksa apakah respons memiliki status code 200 (OK)
                // Mendapatkan data JSON dari respons
                console.log('responseData: ', responseData); //ex: {token: 'Id2Qs257T0', isKeepLogin: true}
                localStorage.setItem('keepLogin', responseData.isKeepLogin);

                if (!responseData.isKeepLogin) {
                  sessionStorage.setItem('token', responseData.token);
                }

                alert('sukses login');
                router.push('/dashboard');
              } else {
                console.error('Gagal melakukan permintaan:', res.status);
                console.log(responseData);
                alert(responseData.message);
              }
            } catch (error) {
              console.log('error: ', error);
              alert('Terjadi Kesalahan, harap hubungi team support');
            }
          }}
        >
          Sign In
        </button>
        <div>
          Apakah Anda sudah memiliki akun?{' '}
          <Link
            href="/registration"
            target="_self"
            style={{ marginTop: '16px' }}
          >
            Buat Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
}
