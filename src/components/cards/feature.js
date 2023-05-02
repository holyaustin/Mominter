/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Image, Heading, Text } from 'theme-ui';

const Feature = ({ data, ...props }) => {
  return (
    <Box sx={styles.feature} {...props}>
      <Box as="figure">
        <Image src={data?.icon} alt={data?.title} />
      </Box>
      <Box>
        <Heading as="h3">{data?.title}</Heading>
        <Text as="p">{data?.description}</Text>
      </Box>
    </Box>
  );
};

export default Feature;

const styles = {
  feature: {
    display: ['flex'],
    figure: {
      minWidth: [70],
      mr: ['30px'],
    },
    h3: {
      fontSize: '18px',
      lineHeight: 1.28,
      color: 'heading',
      marginBottom: '20px',
    },
    p: {
      fontSize: 16,
      lineHeight: 1.88,
      color: 'text',
    },
    a: {
      mt: [3],
    },
  },
};
