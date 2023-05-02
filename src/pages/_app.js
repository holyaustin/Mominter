/** Uncomment the below codeblock if you want to add google analytics for more info please visit our docs analytics section */
/** 
import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
*/
import React, { useEffect } from 'react'
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import Head from "next/head";
import { AuthProvider, useAuth } from '@w3ui/react-keyring';
import { UploaderProvider } from '@w3ui/react-uploader';
import '../assets/css/react-slick.css';
import 'tailwindcss/tailwind.css';
import "../styles/globals.css";
import "../styles/tachyons.min.css";
import "../styles/spinner.css";
import "../styles/index.css";
import "../styles/popup.css";

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

export default function CustomApp({ Component, pageProps }) {
  
  // return 
  return (
 
    <LivepeerConfig client={livepeerClient}>
         <Head>
    <link rel="shortcut icon" href="/images/logoonlyblue.png" />
  </Head>
      {/** <CreateAndViewAsset /> */}
      <Component {...pageProps} /> 
    </LivepeerConfig>
  );

}


