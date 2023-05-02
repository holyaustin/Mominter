/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Header from './header/header2';
import Footer from './footer/footer';
export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer />
    </Fragment>
  );
}
