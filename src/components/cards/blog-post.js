/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Flex, Image, Heading, Text } from 'theme-ui';
import { rgba } from 'polished';
import { Link, LearnMore } from 'components/link';

const BlogPost = ({ post }) => {
  return (
    <Box as="article" sx={styles.post}>
      <Flex as="figure" sx={styles.thumbnail}>
        <Image src={post?.thumbnail} loading="lazy" alt={post?.title} />
      </Flex>

      <Box className="content">
        <Heading as="h3" sx={styles.title}>
          <Link path={post?.slug}>{post?.title}</Link>
        </Heading>
        <Text as="p" sx={styles.excerpt}>
          {post?.excerpt}
        </Text>
        <LearnMore path={post?.slug} label="Learn more" sx={styles.learnMore} />
      </Box>
    </Box>
  );
};

export default BlogPost;

const styles = {
  post: {
    mx: [null, null, null, 3, 'unset'],
  },
  thumbnail: {
    mb: [4],
    img: {
      borderRadius: 5,
    },
  },
  title: {
    fontWeight: 700,
    fontSize: [2, null, null, 3, '17px', 3],
    lineHeight: [1.5, null, null, null, null, 1.68],
    letterSpacing: '-0.2px',
    a: {
      color: 'heading',
      textDecoration: 'none',
    },
  },
  excerpt: {
    color: 'text',
    fontSize: [1, null, null, 2],
    lineHeight: 1.88,
    mt: [2],
  },
  learnMore: {
    fontSize: [1, null, '15px'],
    mt: 2,
  },
};
