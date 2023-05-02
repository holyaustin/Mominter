/** @jsxRuntime classic */
/** @jsx jsx */
import {
  jsx,
  Box,
  Flex,
  Text,
  Input,
  Label,
  Button,
  Select,
  Heading,
  Container,
} from 'theme-ui';
import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";
import UAuth from "@uauth/js";
import { rgba } from 'polished';
import { useRouter } from 'next/router'

const truncateAddress = (address) => `${address.slice(0, 8)}...${address.slice(-4)}`;

const uauth = new UAuth({
  clientID: "58971f20-5524-49c9-b021-72c37275da1a",
  redirectUri:
    process.env.NODE_ENV === "production"
      ? "https://mominter.vercel.app/"
      : "http://localhost:3000",
});

const ConnectWallet = () => {
  const navigate = useRouter();
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [address, setAddress] = useState();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    if (!address) {
      const { ethereum } = window;
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        navigate.push('/explore')
      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectUnstoppable = async () => {
    try {
      const authorization = await uauth.loginWithPopup();

      if (authorization.idToken.wallet_address) {
        setAddress(authorization.idToken.wallet_address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    uauth
      .logout()
      .then(() => {
        setAddress(null);
        navigate.push('/')
      })
      .catch((error) => {
        console.error("profile error:", error);
      });
  };

  return (
    <div className="bg-white-100 ">
      {address && (
        <Blockies
          className="rounded-full"
          seed={address.toLowerCase()}
          size={1}
          scale={1}
        />
      )}
      {address ? (
        <>
          <div className="">

            {truncateAddress(address)}

          </div>
          <div>
            <Button variant="primary" sx={styles.submit }
              type="button"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </>
      ) : (
        <div >
          <Button variant="secondary" sx={styles.submit }
            type="button"  onClick={connectWallet}
          >
            {haveMetamask ? "Explore Moments" : "Install metamask"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
  grid: {
    gap: ['30px 60px', null, null, null, '30px 40px', '30px 60px'],
    display: 'grid',
    minHeight: [null, null, null, null, null, '66vh', '81vh'],
    alignItems: 'center',
    gridTemplateColumns: [
      '1fr',
      null,
      null,
      null,
      'repeat(2, 1fr)',
      '510px 1fr',
    ],
  },
  domainCard: {
    background: 'white',
    boxShadow: '0px 24px 50px rgba(54, 91, 125, 0.05)',
    borderRadius: 10,
    p: ['30px 25px 50px', null, null, '40px 40px 60px'],
    m: [null, null, null, '0 auto', 'unset'],
    maxWidth: [null, null, null, 480, 'none'],
    h2: {
      fontWeight: 700,
      fontSize: [8, null, null, 10, 9, 14],
      lineHeight: 1.36,
      letterSpacing: 'heading',
      color: 'textSecondary',
      mb: [5, null, null, 7, 8],
    },
  },
  inputGroup: {
    alignItems: 'center',
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    px: [3, null, null, 6],
    input: {
      border: 0,
      borderRadius: 0,
      fontSize: [1, null, null, 2],
      minHeight: [45, null, null, 60],
      p: 0,
      ':focus': {
        boxShadow: 'none',
      },
      '::placeholder': {
        fontSize: '15px',
        lineHeight: 1.33,
        color: rgba('#02073E', 0.4),
      },
      ':-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
      },
    },
    select: {
      border: 0,
      color: 'textSecondary',
      fontWeight: 500,
      fontSize: [0, null, null, '15px'],
      lineHeight: 1.33,
      letterSpacing: 'heading',
      minHeight: [45, null, null, 60],
      minWidth: [60, null, null, 75],
      p: 0,
      textTransform: 'uppercase',
      ':focus': {
        outline: 0,
      },
      '+ svg': {
        color: '#A6A8BB',
        height: 40,
        width: 40,
      },
    },
  },
  submit: {
    fontSize: [1, null, null, 6],
    mt: [0],
    minHeight: [45, null, null, 60],
    width: '100%',
  },
  note: {
    fontStyle: 'italic',
    fontSize: [0, null, null, '15px'],
    lineHeight: 1.33,
    textAlign: 'center',
    color: rgba('#02073E', 0.5),
    mt: [4],
  },
};
