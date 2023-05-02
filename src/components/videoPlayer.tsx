import React, { useState } from 'react';
import { Player } from '@livepeer/react';
import { jsx, Box } from 'theme-ui';
import styles from "../styles/VideoPlayer.module.css"

export default function VideoPlayer() {
  // Set the state to get either the playback URL or playback ID
  const [playbackSource, setPlaybackSource] = useState<string>('');

  // Quick verifiation to check if url provided is a playback url
  const playbackurl = '.m3u8';


  return (
    <Box as="section"  sx={styles2.section}>
    <div className="bg-blue-100 text-xl text-center text-black font-bold pt-5 pb-4">
      <h1 > Video Player powered by Livepeer Studio</h1>
      <h5 className={styles.h5}>Provide a playback URL or playback Id</h5>
    </div>
    <div className="flex justify-center bg-blue-100">
        <div className="w-1/2 flex flex-col pb-12 ">
      <input
        className=" border rounded p-4 w-100 mb-4 text-black"
        type='text'
        value={playbackSource}
        name='playbackSource'
        onChange={(e) => setPlaybackSource(e.target.value)}
      />

      {playbackSource.includes(playbackurl) ? (
        <Player
          src={playbackSource}
          autoPlay={true}
          loop
          muted
        />
      ) : (
        <Player
          playbackId={playbackSource}
          autoPlay={true}
          loop
          muted
        />
      )}
    </div>
    </div>
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

