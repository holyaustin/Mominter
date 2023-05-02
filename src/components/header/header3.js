/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Flex, Container, Button } from 'theme-ui';
import { Fragment, useState } from 'react';
import Link from 'next/link'
import Sticky from 'react-stickynode';
import Image from '../image';
import TopBar from '../topbar';
import LockIcon from '../icons/lock';
import HamburgerMenu from '../hamburger';

export default function Header() {
  //  navigate = useRouter();
  const [state, setState] = useState({
    isMobileMenu: false,
    isSticky: false,
  });
  const handleStateChange = (status) => {
    status.status === Sticky.STATUS_FIXED
      ? setState({ ...state, isSticky: true })
      : setState({ ...state, isSticky: false });
  };
  const toggleMobileMenu = () => {
    setState((prev) => {
      return {
        ...prev,
        isMobileMenu: !prev.isMobileMenu,
      };
    });
  };
  const handleCloseMenu = () => {
    setState({
      ...state,
      isMobileMenu: false,
    });
  };

  const logout = async () => {
        navigate.push('/')
  };

  return (
    <Fragment>
      <TopBar />
      <Sticky
        enabled={true}
        top={0}
        activeClass="is-sticky"
        innerZ={100}
        onStateChange={handleStateChange}
      >
        <Box
          as="header"
          sx={styles.header}
          className={state.isSticky ? 'is-sticky' : ''}
        >
          <Container sx={styles.container}>
          <Image src="/images/logoonly.png" loading="lazy" sx={styles.logo} alt="logo" />
          <div 
          sx={styles.navbar}
          className={state.isSticky ? 'is-sticky' : ''}
          >

          <Link href="/">
          <a>Home</a>
          </Link>
          <Link href="/explore">
          <a>News-On-Demand</a>
          </Link>
          <Link href="/publishnews">
          <a>Publish-News</a>
          </Link>
          <Link href="/streamlive">
          <a>Stream-Live </a>
          </Link>
          <Link href="/videoplayer">
          <a> Video-Player</a>
          </Link>
          <Link href="https://web3chat-kezayya.vercel.app/" target="_blank">
          <a>Chat </a>
          </Link>
          {/**
          <Link href="/addfolder">
          <a>Video Marketplace</a>
          </Link>
          <Link href="/analytics">
          <a>Analytics</a>
          </Link>
           */}
          </div>

            <Flex sx={styles.buttonGroup}>
            <Link href="/">
      
         
              <Button
                variant="text"
                sx={{
                  ...styles.joinCommunity,
                  backgroundColor: state.isSticky ? 'primary' : 'white',
                  color: state.isSticky ? 'white' : 'primary',
                }} onlick={logout}
              >
                <a>Logout </a>
              </Button>
              </Link>
            </Flex>

            <HamburgerMenu
              sx={styles.hamburger}
              isSticky={state.isSticky}
              isOpen={state.isMobileMenu}
              toggleMobileMenu={toggleMobileMenu}
            />
          </Container>
        </Box>
      </Sticky>
    </Fragment>
  );
}

const styles = {
    navbar: {
      display: [null, null, null, null, null, 'flex'],
      alignItems: [null, null, null, 'center'],
      flexGrow: [null, null, null, 1],
      fontSize: ['10px', null, null, 5],
      a: {
        color: 'white',
        cursor: 'pointer',
        '+ a': {
          ml: [null, null, null, null, null, 6],
        },
      },
      '@media only screen and (max-width: 1024px)': {
        position: 'absolute',
        backgroundColor: 'white',
        boxShadow: '0px 11px 30px rgba(51, 83, 145, 0.07)',
        width: '100%',
        left: 0,
        top: 70,
        opacity: 0,
        visibility: 'hidden',
        transform: 'scaleY(0)',
        transformOrigin: 'top left 0',
        transition: '0.3s ease 0s',
        '&.is-sticky': {
          borderTop: '1px solid #f3f3f3',
        },
        '&.is-mobile': {
          opacity: 1,
          visibility: 'visible',
          transform: 'scaleY(1)',
        },
        a: {
          fontWeight: 500,
          lineHeight: 1,
          color: 'textSecondary',
          display: 'block',
          padding: 3,
          '+ a': {
            borderTop: '1px solid #f3f3f3',
          },
        },
      },
      '&.is-sticky': {
        top: 60,
        a: {
          color: 'blue',
        },
        '.active': {
          color: 'primary',
        },
      },
    },


  header: {
    position: 'fixed',
    left: 0,
    right: 0,
    py: 4,
    transition: 'all 0.3s ease-in-out 0s',
    '&.is-sticky': {
      backgroundColor: 'white',
      boxShadow: '0 6px 13px rgba(38,78,118,0.1)',
      paddingTop: '15px',
      paddingBottom: '15px',
    },
    '&.is-mobile-menu': {
      backgroundColor: 'white',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    mr: [null, null, null, null, 3, null, 5],
    height: ['25px', null, null, '75px'],
  },
  buttonGroup: {
    alignItems: 'center',
    marginLeft: 'auto',
    button: {
      fontWeight: 500,
    },
  },
  login: {
    display: ['none', null, null, null, 'flex'],
    color: 'white',
    p: 0,
    mr: [null, null, null, null, 5],
    fontSize: ['10px', null, null, 4],
    svg: {
      mr: 2,
    },
  },
  joinCommunity: {
    backgroundColor: 'white',
    minHeight: [30, null, null, 40],
    p: ['0 12px', null, null, '0 14px'],
    fontSize: ['10px', null, null, 4],
  },
  hamburger: {
    display: [null, null, null, null, null, 'none'],
  },
};
