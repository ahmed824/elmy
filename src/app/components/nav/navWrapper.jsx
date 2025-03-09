// NavWrapper.js
import { cookies } from 'next/headers';
import Nav from './Nav';
import { i18n } from '@/next-i18next.config';

export default function NavWrapper() {
  const cookieStore = cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || i18n.defaultLocale;
  
  return <Nav lng={lang} />;
}