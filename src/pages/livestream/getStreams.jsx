import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';
import SEO from '../../components/seo';
import Layout from '../../components/layout2';
import { jsx, Box } from 'theme-ui';
import Image from 'next/image';
import Link from 'next/link';
import { Player } from '@livepeer/react';
import logo from '../../../public/images/mominter_logo.png';
import styles from '../../styles/Assets.module.css';


export async function getServerSideProps() {
  const res = await fetch(`https://livepeer.studio/api/stream?streamsonly=1`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  } );
  
  const data = await res.json();

  return {
    props: {
      streams: data
    },
  };
}

export default function GetStreams({streams}) {
  
  
  
  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <SEO
        title="Live Stream"
        description="Share file"
      />
    <Box as="section"  sx={styles2.section}>
    <main className="{styles.main} bg-white pt-2">
      <h1 className={ styles.title }>All Streams</h1>
      
      <ul className={styles.grid}>
        {streams.map((stream) => (
          <div className={styles.card} key={stream.id}>
            <Link href={`/streams/${stream.id}`}>
              <a>
                { stream.isActive ? (
                  <div>
                    <h2 className={ styles.title }> Now Watching: { stream.name } </h2>
                    <Player
                      playbackId={ `${ stream.playbackId }` }
                      className={ styles.videoplayer }
                      autoPlay={ false }
                      loop
                      muted
                    />
                  </div>
                ) :
                  <Image src={ logo } alt='Livepeer Studio Logo' width='100' height='100' />
                }
                <h2 className={styles.title2}> {stream.name} </h2>
                <p>Stream Status:</p>
                {stream.isActive ? <p className={styles.ready}>Live Now!</p> : <p className={styles.failed}>Not Live</p>}
              </a>
            </Link>
          </div>
        ))}
      </ul>
    </main>
    </Box>
    </Layout>
    </ThemeProvider>
  );
}

const styles2 = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };