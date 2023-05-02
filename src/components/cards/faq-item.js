/** @jsxRuntime classic */
/** @jsx jsx */import { jsx, Box, Heading, Text } from 'theme-ui';

const FaqItem = ({ faq, ...props }) => {
  return (
    <Box as="article" sx={styles?.faq} {...props}>
      <Heading as="h3">{faq?.ques}</Heading>
      <Text as="p">{faq?.ans}</Text>
    </Box>
  );
};

export default FaqItem;

const styles = {
  faq: {
    borderBottom: '2px solid #0F2137',
    marginBottom: 8,
    mx: [null, null, null, 6, 8],
    width: [null, null, null, 'calc(50% - 60px)', 'calc(50% - 80px)'],
    h3: {
      fontWeight: 500,
      fontSize: [2, null, null, 3],
      lineHeight: 1.68,
      letterSpacing: 'heading',
      color: '#0F2137',
      mb: [2, null, null, 3],
    },
    p: {
      color: 'text',
      fontSize: [1, null, null, 2],
      lineHeight: 2,
      mb: 4,
    },
  },
};
