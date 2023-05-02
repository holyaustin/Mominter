/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from '../components/section-heading';
import Feature from '../components/cards/feature';
/**
import icon1 from 'assets/images/services/1.png';
import icon2 from 'assets/images/services/2.png';
import icon3 from 'assets/images/services/3.png';
import icon4 from 'assets/images/services/4.png';
import icon5 from 'assets/images/services/5.png';
import icon6 from 'assets/images/services/6.png';
 */
const data = [
  {
    id: 1,
    icon: '/images/services/1.png',
    title: 'censorship-resistant',
    description: `you are not policed by anyone, no restrictions from government on what to store or how to use`,
  },
  {
    id: 2,
    icon: '/images/services/2.png',
    title: 'Bolt Performance',
    description: `File storage and sharing with the speed of Polygon PoS blockchain transaction. `,
  },
  {
    id: 3,
    icon: '/images/services/3.png',
    title: 'Secured',
    description: `File are secured. You dont need to be worried about security of personal details. Private mode also available.`,
  },
  {
    id: 4,
    icon: '/images/services/4.png',
    title: 'decentralized',
    description: `No more centralized storage where a server houses your file. Kezayya stores your file in a decentralized manner by many nodes. if one node fails, you dont need to panic because other nodes have your file.`,
  },
  {
    id: 5,
    icon: '/images/services/5.png',
    title: '5 Star Rating service',
    description: `We offefr great service that is second to non. Good support system and more feature been unveiled`,
  },
  {
    id: 6,
    icon: '/images/services/6.png',
    title: 'Users own data',
    description: `All data stored are entirely owned and managed by users`,
  },
];

const UltimateFeatures = () => {
  return (
    <Box as="section" id="features" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          slogan="Product features"
          title="Ultimate features that works"
        />
        <Box sx={styles.features}>
          {data?.map((item) => (
            <Feature className="feature-item" key={item.id} data={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UltimateFeatures;

const styles = {
  section: {
    backgroundColor: '#c4d4f2',
    pt: [8, null, null, null, 10, 14],
    pb: [8, null, null, null, 15, 16, 19],
    position: 'relative',
  },
  heading: {
    marginBottom: [50, 50, 80],
    p: {
      maxWidth: 490,
      margin: ['10px auto 0'],
    },
  },
  features: {
    gap: [35, null, null, 40, '50px 30px', 60],
    display: ['grid', 'grid'],
    maxWidth: 1030,
    margin: '0 auto',
    gridTemplateColumns: [
      'repeat(1, 1fr)',
      null,
      null,
      'repeat(2, 1fr)',
      'repeat(3, 1fr)',
    ],
    '.feature-item': {
      display: ['block'],
      textAlign: 'center',
      maxWidth: [290, 260, null, 280, 'none'],
      m: ['0 auto', '0 auto', '0 auto', '0 auto', '0 auto', 0],
      figure: {
        m: ['0 0 20px'],
      },
      h4: {
        mb: ['15px', '15px', '20px'],
      },
      p: {
        fontSize: ['14px', '14px', '16px', '16px', '14px', '16px'],
      },
    },
  },
};
