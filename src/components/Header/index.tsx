import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';

import styles from './styles.module.scss';


export function Header() {
  const currentDate = format(new Date(), 'E, d MMMM', {
    locale: enUS
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr Logo" />
      <p>The best to hear, always</p>
      <span>{currentDate}</span>
    </header>
  );
}