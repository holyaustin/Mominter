/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Button, Heading, Text } from 'theme-ui';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { rgba } from 'polished';

const PriceTable = ({ price }) => {
  return (
    <Box
      sx={styles.priceTable}
      className={`${price.isRecommended ? 'recommended' : ''}`}
    >
      {price.isRecommended && (
        <Text as="span" sx={styles.recomLabel}>
          Highly Recommended
        </Text>
      )}
      <Box sx={styles.header} className="priceHeader">
        <Heading as="h3" sx={styles.title}>
          {price.title}
        </Heading>
        <Text as="p" sx={styles.subtitle}>
          {price.subtitle}
        </Text>
        <Text as="p" sx={styles.priceAmount}>
          ${price?.price}
          /mo
        </Text>
        <Button sx={styles.button} variant="text">
          {price.buttonText}
        </Button>
      </Box>
      <Box as="ul" sx={styles.list}>
        {price?.features?.map((feat) => (
          <li key={feat.id} className={!feat.isAvailable ? 'unavailable' : ''}>
            {feat.isAvailable ? (
              <span>
                <IoMdCheckmarkCircle sx={{ color: 'secondary' }} />
              </span>
            ) : (
              <span>
                <IoIosCloseCircle color="#CED7E1" />
              </span>
            )}
            <span>{feat.title}</span>
          </li>
        ))}
      </Box>
    </Box>
  );
};

export default PriceTable;

const styles = {
  priceTable: {
    background: 'white',
    borderRadius: 10,
    position: 'relative',
    padding: [
      '20px 15px',
      null,
      null,
      '30px 25px',
      '25px 30px 40px 30px',
      '45px 60px 70px 45px',
    ],
    boxShadow: ['0px 15px 50px rgba(91, 132, 193, 0.1)', null, null, 'none'],
    '&.recommended': {
      boxShadow: [null, null, null, '0px 15px 50px rgba(91, 132, 193, 0.1)'],
      button: {
        backgroundColor: 'primary',
        color: 'white',
      },
    },
  },
  recomLabel: {
    fontWeight: 700,
    fontSize: [0, 1],
    lineHeight: 1.29,
    backgroundColor: '#52ACFF',
    borderRadius: '8px 8px 0px 0px',
    position: 'absolute',
    left: 0,
    top: '-35px',
    right: 0,
    minHeight: [30, 35],
    textTransform: 'uppercase',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: [1, 2, 3],
    lineHeight: 1.31,
    letterSpacing: '-0.55px',
  },
  subtitle: {
    color: rgba('#343D48', 0.65),
    fontSize: [0, null, 1, 2],
    lineHeight: 1.62,
    mt: '8px',
  },
  priceAmount: {
    color: '#0F2137',
    fontWeight: 700,
    fontSize: [1, 2, null, 4, '26px'],
    lineHeight: 1.3,
    letterSpacing: 'heading',
    mt: ['12px', null, null, '26px'],
  },
  list: {
    listStyle: 'none',
    padding: 0,
    mt: [6, null, null, null, 10],
    maxWidth: 340,
    li: {
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: [0, null, 1, null, 2],
      lineHeight: 1.62,
      '+ li ': {
        mt: [3, null, null, null, 6],
      },
      svg: {
        height: [17, null, null, null, 23],
        width: [17, null, null, null, 23],
      },
      'span:first-of-type': {
        mr: '13px',
        mt: '5px',
      },
    },
    '.unavailable': {
      opacity: 0.5,
    },
  },
  button: {
    border: `1.5px solid ${rgba('#5B2B9D', 0.15)}`,
    color: 'primary',
    minHeight: [40, null, null, null, 50],
    padding: ['0 24px', null, '0 32px'],
    fontSize: [1, null, null, null, 2],
    mt: [3, null, null, 6],
    ':hover': {
      borderColor: 'primary',
    },
  },
};
