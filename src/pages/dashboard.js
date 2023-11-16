import styles from '@/styles/Dasbor.module.css';
import { dmSans } from '@/styles/fonts';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDataApi, postDataApi } from '@/utils/api';

export default function Dasbor() {
  const [user, setUser] = useState({ id: '', name: '' });
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        let myToken = '';
        if (localStorage.getItem('keepLogin') === 'true') {
          myToken = getCookie('token');
        } else {
          myToken = sessionStorage.getItem('token');
        }

        if (myToken) {
          const data = { token: myToken };

          let myUser;
          await postDataApi(
            '/api/checkToken',
            data,
            (successData) => {
              let roleName = '';
              switch (successData.role) {
                case 0:
                  roleName = 'Santri';
                  break;
                case 1:
                  roleName = 'Admin';
                  break;
              }
              myUser = { ...successData, roleName };
              setUser(myUser);
            },
            (failData) => {
              console.log('failData: ', failData);
              router.push('/login');
            }
          );

          if (myUser && myUser.role === 1) {
            await getDataApi(
              '/api/listUsers',
              (dataSuccess) => {
                console.log('dataSuccess: ', dataSuccess);
                setAllUsers(dataSuccess.users);
              },
              (dataFail) => {
                console.log('dataFail: ', dataFail);
              }
            );
          }
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
            height: '70vh',
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
                  let myToken = '';
                  if (localStorage.getItem('keepLogin') === 'true') {
                    myToken = getCookie('token');
                  } else {
                    sessionStorage.setItem('token', '');
                    router.push('/login');
                    return;
                  }
                  if (myToken) {
                    const data = { token: myToken };
                    await postDataApi(
                      '/api/logout',
                      data,
                      (successData) => {
                        router.push('/login');
                      },
                      (failData) => {
                        console.error('Gagal melakukan permintaan:', failData);
                        alert('terjadi kesalahan koneksi ' + failData);
                      }
                    );
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
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            padding: '16px',
          }}
        >
          <span style={{ fontWeight: '700', fontSize: '28px' }}>
            {user.name}({user.roleName})
          </span>
        </div>
        <div style={{ padding: '32px' }}>
          {user.role === 1 && (
            <>
              <div>Data User</div>
              <div style={{ width: '100%' }}>
                <table
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    border: '1px',
                  }}
                >
                  <thead>
                    <tr>
                      <th>NIS</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers &&
                      allUsers.map((data, index) => {
                        return (
                          <tr key={index} style={{ padding: '8px' }}>
                            <td>{data.nis}</td>
                            <td>{data.name}</td>
                            <td>{data.status}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
