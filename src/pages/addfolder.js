import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import Mintfolder from '../components/Mintfolder';

export default function AddFolder() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new folder"
          description="add a new folder"
        />
        <Mintfolder />

      </Layout>
    </ThemeProvider>
  );
}