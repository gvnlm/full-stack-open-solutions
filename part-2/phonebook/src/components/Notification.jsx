import styles from './Notification.module.css';

const Notification = ({ notification }) => {
  if (notification === null) {
    return;
  }

  const { message, type } = notification;
  const className = `${styles.notification} ${styles[type]}`;

  return <div className={className}>{message}</div>;
};

export default Notification;
