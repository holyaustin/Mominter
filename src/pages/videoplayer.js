import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import VideoPlayer from '../components/videoPlayer.tsx';

export default function Player() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new folder"
          description="video player"
        />
        <VideoPlayer />

      </Layout>
    </ThemeProvider>
  );
}