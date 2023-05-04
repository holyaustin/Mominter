import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import VideoConference from '../components/huddle01';

export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Live Stream"
          description="Share file"
        />
        <VideoConference/>
      </Layout>
    </ThemeProvider>
  );
}