import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import Image from 'next/image';

import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'E, MMMM d', {
    locale: enUS
  });

  return (
    <header className={styles.headerContainer}>
      <Image src="/logo.svg" alt="Podcastr Logo" width={163} height={40} />
      <p>The best to hear, always</p>
      <span>{currentDate}</span>
    </header>
  );
}