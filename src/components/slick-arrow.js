/** @jsx jsx */
import { jsx, Button, Text } from 'theme-ui';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { Fragment } from 'react';

const SlickArrow = ({ className, onClick, control }) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      className={className}
      sx={styles.paginationButton}
    >
      {control === 'prev' ? (
        <Fragment>
          <Text as="span" variant="styles.srOnly">
            Prev
          </Text>
          <BsArrowLeft size="32px" />
        </Fragment>
      ) : (
        <Fragment>
          <Text as="span" variant="styles.srOnly">
            Next
          </Text>
          <BsArrowRight size="32px" />
        </Fragment>
      )}
    </Button>
  );
};

export default SlickArrow;

const styles = {
  paginationButton: {
    minHeight: '30px',
    padding: 0,
    position: 'absolute',
    bottom: 0,
    ':focus': {
      outline: '0 none',
    },
    svg: {
      transition: 'all 0.2s ease-in-out 0s',
    },
    '&.slick-disabled': {
      color: '#BBC7D7',
      svg: {
        transform: 'scale(0.8)',
      },
    },
    '&.slick-prev': {
      left: 'calc(50% - 16px)',
      transform: 'translateX(-50%)',
    },
    '&.slick-next': {
      transform: 'translateX(50%)',
      right: 'calc(50% - 16px)',
    },
  },
};
