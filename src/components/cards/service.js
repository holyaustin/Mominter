/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui';

const Service = ({ service }) => {
  return (
    <Box sx={styles.service}>
      <Text as="p">{service.title}</Text>
      <Text as="span">{service.price}</Text>
    </Box>
  );
};

export default Service;

const styles = {
  service: {
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: [107, null, null, 130],
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out 0s',
    ':hover': {
      boxShadow: '0px 11px 30px rgba(51, 83, 145, 0.07)',
      borderColor: 'transparent',
    },
    p: {
      fontWeight: 500,
      fontSize: [1, null, null, '24px'],
      lineHeight: 1.77,
      color: 'heading',
    },
    span: {
      color: 'primary',
      fontWeight: 700,
      fontSize: [1, null, null, '24px'],
      lineHeight: 2,
    },
  },
};
