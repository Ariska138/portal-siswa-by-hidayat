import styles from '@/styles/Dasbor.module.css';
import { dmSans } from '@/styles/fonts';

export default function Dasbor() {
  return (
    <div className={`${styles.container} ${dmSans.className}`}>
      <div className={styles.sidebar}>
        <div
          style={{
            paddingTop: '56px',
            paddingBottom: '56px',
            paddingLeft: '54px',
          }}
        >
          <h1>Dasboard</h1>
        </div>
        <div>
          <ul>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <div>Admin</div>
    </div>
  );
}
