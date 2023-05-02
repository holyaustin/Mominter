/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui';
import { useMediaQuery } from 'react-responsive';
import Image from 'components/image';

const Testimonial = ({ testimonial }) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  return (
    <Box as="article" sx={styles.testimonial}>
      {!isMobile && (
        <Box as="figure" sx={styles.avatar}>
          <Image
            src={testimonial.avatar}
            loading="lazy"
            alt={testimonial.authorName}
          />
        </Box>
      )}
      {isMobile && (
        <Box as="blockquote" sx={styles.blockquote}>
          {testimonial.text}
        </Box>
      )}
      <Box sx={styles.content}>
        {isMobile && (
          <Box as="figure" sx={styles.avatar}>
            <Image src={testimonial.avatar} alt={testimonial.authorName} />
          </Box>
        )}
        {!isMobile && (
          <Box as="blockquote" sx={styles.blockquote}>
            {testimonial.text}
          </Box>
        )}
        <Text as="p">
          <strong>{testimonial.authorName},</strong> {testimonial.designation}
        </Text>
      </Box>
    </Box>
  );
};

export default Testimonial;

const styles = {
  testimonial: {
    gap: ['0 110px', null, null, 10, 8, '0 50px', '0 110px'],
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: [
      '1fr',
      null,
      null,
      '1fr 1fr',
      '370px 547px',
      '1fr 1fr',
      '521px 547px',
    ],
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    mr: [6, null, null, 0],
    img: {
      width: [100, null, null, 'auto'],
    },
  },
  content: {
    mt: [3, null, null, 6, 12],
    display: ['flex', null, null, 'block'],
    alignItems: ['flex-start', null, null, 'unset'],
    p: {
      color: 'textSecondary',
      fontSize: [0, 1, null, 3],
      mt: [9, null, null, 5, 12],
      strong: {
        display: ['block', null, null, null, 'inline-flex'],
      },
    },
  },
  blockquote: {
    color: 'heading',
    fontSize: [2, null, null, 4, 8, 11],
    fontWeight: [500, null, null, 400],
    lineHeight: [null, null, null, 1.7, 1.53],
    letterSpacing: 'heading',
    textAlign: ['center', null, null, 'left'],
  },
};
