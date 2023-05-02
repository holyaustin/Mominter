/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Text, Container } from 'theme-ui';
import { rgba } from 'polished';
//import Logo from '../../components/icons/logo';
import { Link } from '../link';
// import CallToAction from 'sections/call-to-action';
import Image from '../image';
import Widget from './widget';
import { menuItems } from './footer.data';
import { Fragment } from 'react';

export default function Footer() {
  return (
    <Fragment>
      {/** <CallToAction /> */}
      <Box as="footer" sx={styles.footer}>
        <Container>
          <Box sx={styles.footerTopInner}>
            <Box sx={styles.about}>
              <Box sx={styles.logo}>
              <Image src="/images/mominter_logo.png" loading="lazy" sx={styles.logo} alt="logo" />
                {/**<Logo />*/}
              </Box>
              <Box sx={styles.terms}>
                <Link path="#!">Terms of use</Link>
                <Text as="span">|</Text>
                <Link path="#!">Privacy</Link>
              </Box>
              <Text as="p" sx={styles.copyright}>
                Copyright by {new Date().getFullYear()} MOMINTER
              </Text>
            </Box>
            {menuItems.map(({ id, title, items }) => (
              <Widget key={id} title={title} items={items} />
            ))}
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
}

const styles = {
  footer: {
    backgroundColor: '#c4d4f2',
    pt: [8, null, null, 10],
    pb: [8, null, null, 15],
  },
  footerTopInner: {
    gap: [30, null, 50, '20px 50px', 17, 50],
    display: ['grid'],
    gridTemplateColumns: [
      'repeat(2, 1fr)',
      null,
      null,
      'repeat(4, 1fr)',
      'repeat(5, 1fr)',
    ],
  },
  footerInner: {
    borderTop: `1px solid #D9E0E7`,
    display: ['block', null, 'flex'],
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '35px 0 40px',
  },
  about: {
    display: [null, null, null, 'grid', 'block'],
    gridTemplateColumns: '205px 1fr 1fr',
    alignItems: ['center'],
    gridRow: ['3/4', null, '1/1', '3/4', 'unset'],
    gridColumn: ['1/3', null, '1/2', '1/5', 'unset'],
  },
  logo: {
    display: ['flex'],
    justifyContent: ['center', null, null, 'unset'],
    gridColumn: '1/2',
  },
  terms: {
    display: ['flex'],
    gridColumn: '3/4',
    alignItems: ['center', null, null, null, 'flex-start', 'center'],
    flexDirection: ['row', null, null, null, 'column', 'row'],
    justifyContent: [
      'center',
      null,
      'flex-start',
      'center',
      null,
      'flex-start',
    ],
    mt: [4, null, null, 0, 4],
    a: {
      color: 'heading',
    },
    span: {
      display: ['inline-flex', null, null, null, 'none', 'inline-flex'],
      m: ['0 10px'],
    },
  },
  copyright: {
    color: rgba('#0F2137', 0.6),
    fontSize: ['14px'],
    mt: [3, null, null, -31, 3],
    mr: [null, null, null, 'auto', 'unset'],
    gridColumn: '2/3',
    textAlign: ['center', null, 'left', 'center', 'left'],
  },
};
