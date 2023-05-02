/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { rgba } from 'polished';

export default function Share() {

  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-purple-100 text-4xl text-center text-black font-bold pt-10">
        <h1> P2P File Sharing</h1>
        <br />
        <br />
        <h2> Click here to expereince the power of P2P File Sharing with Fluence. Fluence uses Peer to peer to allow communication between browser to browser. <br/> <a href="https://p2p-theta.vercel.app/" target="_blank">Click Here</a> for demo</h2>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
