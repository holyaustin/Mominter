import Image from 'next/image';
import { jsx, Box } from 'theme-ui';
import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';
import SEO from '../../components/seo';
import Layout from '../../components/layout2';
import { useRouter } from 'next/router';
import logo from '../../../public/images/mominter_logo.png';
import { Player } from '@livepeer/react';
import styles from '../../styles/Stream.module.css';


export async function getServerSideProps( { params } ) {
  const res = await fetch(`https://livepeer.studio/api/stream/${params.livestreamId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await res.json();

  return {
    props: {
      stream: data
    }
  }
}

export default function StreamDetails( { stream } ) {
  
  const {
    query: { id },
  } = useRouter();

  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <SEO
        title="Live Stream"
        description="Share file"
      />
    <Box as="section"  sx={styles2.section}>
    <div className=" bg-white pt-2">
      <div className={styles.card} key={id}>
        {stream.isActive ? (
          <div>
            <h2 className={styles.title}> Now Watching: {stream.name} </h2>
            <Player
              playbackId={`${stream.playbackId}`}
              className={styles.videoplayer}
              autoPlay={true}
              loop
              muted
            />
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '75px' }}>
            <Image src={logo} alt='Livepeer Studio Logo' width='256' height='256' layout='fixed' />
          </div>
        )}
        <div className={styles.cardbody}>
          <h2> Stream Name: {stream.name} </h2>
          <p>Status:</p>
          {stream.isActive ? (
            <p className={styles.ready}>Stream is live</p>
          ) : (
            <p className={styles.failed}>Stream is not live</p>
          )}
          <p>Stream Id:</p>
          {stream.id}
          <p>Stream Key:</p>
          {stream.streamKey}
          <p>Playback Id:</p>
          {stream.playbackId}
          <p>PlaybackURL:</p>
          {`https://livepeercdn.com/hls/${stream.playbackId}/index.m3u8`}
          <p>Recording:</p>
          {stream.record ? 'Recording stream' : 'Not recording stream'}
        </div>
      </div>
    </div>
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