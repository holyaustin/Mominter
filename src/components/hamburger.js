/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Text } from 'theme-ui';

const Bar = ({ isSticky }) => {
  return (
    <Text
      as="span"
      className="bar"
      sx={{ backgroundColor: isSticky ? 'text' : 'white' }}
    />
  );
};

const HamburgerMenu = ({ isOpen, isSticky, toggleMobileMenu, ...props }) => {
  return (
    <button
      sx={styles.button}
      onClick={toggleMobileMenu}
      className={isOpen ? 'open' : ''}
      {...props}
    >
      {[1, 2, 3, 4].map((bar, i) => (
        <Bar key={i} isSticky={isSticky} />
      ))}
      <Text as="span" variant="styles.srOnly">
        Menu
      </Text>
    </button>
  );
};

export default HamburgerMenu;

const styles = {
  button: {
    backgroundColor: 'transparent',
    border: 0,
    p: 0,
    width: 20,
    height: 14,
    position: 'relative',
    transform: 'rotate(0deg)',
    transition: '.5s ease-in-out',
    cursor: 'pointer',
    outline: 0,
    ml: [4, null, 6],
    '.bar': {
      display: 'block',
      position: 'absolute',
      height: '2px',
      width: '100%',
      borderRadius: 9,
      opacity: 1,
      left: 0,
      transform: 'rotate(0deg)',
      transition: '.25s ease-in-out',
      ':nth-of-type(1)': {
        top: 0,
      },
      ':nth-of-type(2),:nth-of-type(3)': {
        top: '6px',
      },
      ':nth-of-type(4)': {
        top: '12px',
      },
    },
    '&.open': {
      '.bar': {
        ':nth-of-type(1)': {
          top: '6px',
          width: '0%',
          left: '50%',
        },
        ':nth-of-type(2)': {
          transform: 'rotate(45deg)',
        },
        ':nth-of-type(3)': {
          transform: 'rotate(-45deg)',
        },
        ':nth-of-type(4)': {
          top: '6px',
          width: '0%',
          left: '50%',
        },
      },
    },
  },
};
