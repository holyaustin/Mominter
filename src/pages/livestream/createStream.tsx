import { FormEvent, useState } from 'react'
import { ThemeProvider } from 'theme-ui';
//import theme from 'import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';
import SEO from '../../components/seo';
import Layout from '../../components/layout2';
import { jsx, Box } from 'theme-ui';
import Router, { useRouter } from 'next/router';
import styles from '../../styles/Form.module.css';


export default function CreateStream() {

  const router = useRouter();
  const [ streamName, setStreamName ] = useState<string>( '' );
  const profiles = [
    {
      name: '720p',
      bitrate: 2000000,
      fps: 30,
      width: 1280,
      height: 720,
    },
    {
      name: '480p',
      bitrate: 1000000,
      fps: 30,
      width: 854,
      height: 480,
    },
    {
      name: '360p',
      bitrate: 500000,
      fps: 30,
      width: 640,
      height: 360,
    },
  ];
  
  async function createNewStream( e: FormEvent ) {
    e.preventDefault();
  try {
    const response = await fetch('/api/createStream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: streamName,
        profiles,
      }),
    });
    
    setStreamName( '' );
    router.push('/livestream/getStreams')

    const data = await response.json();
  } catch (error) {
    // console.log(error);
  }
}

  return (
    <ThemeProvider theme={theme}>
    <Layout>
      <SEO
        title="Live Stream"
        description="Share file"
      />
    <Box as="section"  sx={styles2.section}>
    <div className="{styles.main} bg-white pt-12 pb-12">
      <h1 className={styles.title}>Create a New Stream</h1>
      <div className="flex justify-center bg-blue-100">
        <div className="w-1/2 flex flex-col pb-12 text-xl ">
      <form onSubmit={createNewStream} method='POST' className={styles.card}>
        <label htmlFor='stream'>Stream Name: </label>
        <input
          className=" border rounded p-4 w-100 mb-4 text-black"
          type='text'
          value={streamName}
          name='name'
          required
          onChange={(e) => setStreamName(e.target.value)}
        />
        <br />
        <button type='submit' >Create Stream</button>
      </form>
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