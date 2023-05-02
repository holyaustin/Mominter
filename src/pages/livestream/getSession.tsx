import { FormEvent, useState } from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';
import SEO from '../../components/seo';
import Layout from '../../components/layout2';
import { jsx, Box } from 'theme-ui';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/mominter_logo.png';
import styles from '../../styles/Assets.module.css';

export default function GetSessionById() {
  const [sessionId, setSessionId] = useState('');
  const [getSessionInfo, setGetSessionInfo] = useState<any>();

  async function getStream(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/session/${sessionId}`);

    const data = await res.json();

    setGetSessionInfo(data);
  }

  return (
    <Box as="section"  sx={styles2.section}>
    <main className={styles.main}>
      <h1 className={styles.title}>Get Session By Id</h1>

      <form onSubmit={getStream} method='GET' className={styles.card}>
        <label htmlFor='asset' className='text-base'>
          Session ID:{' '}
        </label>
        <input
          className='border rounded-md text-base mx-2'
          type='search'
          name='query'
          value={sessionId}
          required
          onChange={(e) => setSessionId(e.target.value)}
        />
        <button
          type='submit'
          className='m-0  rounded-md p-1 bg-blue-600 hover:bg-blue-400 text-base text-white'
        >
          Get Session
        </button>
      </form>

      {!getSessionInfo ? null : (
        <div className={styles.card} key={getSessionInfo?.id}>
          <Link href={`/sessions/${getSessionInfo?.id}`}>
            {getSessionInfo?.isActive ? (
              <a>
                <p>Session Status:</p>
                <p className={styles.ready}>Live Now!</p>
                <p> {getSessionInfo?.name} </p>
              </a>
            ) : (
              <a>
                <Image src={logo} alt='Livepeer Studio Logo' width='50' height='50' />
                <h2> {getSessionInfo?.name} </h2>
                <p>Session Status:</p>
                <p className={styles.failed}>Not Live</p>
              </a>
            )}
          </Link>
        </div>
      )}
    </main>
    </Box>
  );
}

const styles2 = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };