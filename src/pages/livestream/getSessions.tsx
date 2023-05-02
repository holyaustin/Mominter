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

interface Session {
  id: string,
  region: string,
}


export default function GetSessions() {
  const [streamId, setStreamId] = useState('');
  const [getSessionsInfo, setGetSessionsInfo] = useState([]);

  async function getSession(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/sessions/${streamId}`);

    const data = await res.json();
console.log(data);

    setGetSessionsInfo(data);
  }

  return (
    <Box as="section"  sx={styles2.section}>
    <main className={styles.main}>
      <h1 className={styles.title}>Get Sessions By Stream Id</h1>

      <form onSubmit={getSession} method='GET' className={styles.card}>
        <label htmlFor='asset' className='text-base'>
          Stream ID:{' '}
        </label>
        <input
          className='border rounded-md text-base mx-2'
          type='search'
          name='query'
          value={streamId}
          required
          onChange={(e) => setStreamId(e.target.value)}
        />
        <button
          type='submit'
          className='m-0  rounded-md p-1 bg-blue-600 hover:bg-blue-400 text-base text-white'
        >
          Get Sessions
        </button>
      </form>

      <ul className={ styles.grid }>
      { getSessionsInfo.map( ( session: Session ) => (
          <div className={styles.card} key={session?.id}>
            <Link href={`/sessions/${session?.id}`}>
                <a>
                  <p>Session ID:</p>
                  <p> {session?.id} </p>
                  <p>Session Region:</p>
                  <p> {session?.region} </p>
                </a>
            </Link>
          </div>
        ))}
        </ul>
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