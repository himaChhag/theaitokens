import styles from './LoadingFallback.module.css';

interface LoadingFallbackProps {
  message?: string;
}

export default function LoadingFallback({ 
  message = "Loading model comparison tool..." 
}: LoadingFallbackProps) {
  return (
    <div className={styles.loadingFallback}>
      <div className={styles.loadingIcon}>🔄</div>
      <div className={styles.loadingText}>{message}</div>
    </div>
  );
}