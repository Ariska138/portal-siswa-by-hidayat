import styles from '@/styles/Login.module.css';
import { dmSans } from '@/styles/fonts';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Sign</h1>
        <div className={styles.summary}>
          Enter your email and password to sign in!
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            NIS<span className={styles.star}>*</span>
          </div>
          <input className={styles.input} placeholder="12345" />
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            Password<span className={styles.star}>*</span>
          </div>
          <input className={styles.input} placeholder="******" />
        </div>
        <button className={styles.buttonPrimary}>Sign In</button>
      </div>
    </div>
  );
}
