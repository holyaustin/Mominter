/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import Masonry from 'react-masonry-component';
import SectionHeading from '../components/section-heading';
import FaqItem from '../components/cards/faq-item';

const data = [
  {
    id: 1,
    ques: 'How do i start using this service?',
    ans: `All you need is a web3 wallet. connect your wallet and start uploading your files and dtreaming videos. you also go live`,
  },
  {
    id: 2,
    ques: 'What type of files do you support?',
    ans: `We suppolrt all types of media files. Documents, Audiofiles and  Video files of different extensions ].`,
  },
  {
    id: 3,
    ques: 'Do you support directory upload?',
    ans: `We currently support  single file upload and directory upload will be added later.`,
  },
  {
    id: 4,
    ques: 'Is this service free?',
    ans: `This service is free for as much storage as you want. Thanks to Protocol lab. IPFS / Filecoin (Web3UI) and Livepeer (Livepeer.js) who are partners of this decentralized service.`,
  },

  {
    id: 5,
    ques: 'Can i ever look for my file?',
    ans: `Decentralized files cannot be brought down or missing. You files are stored on multiples nodes servers. All this servers are located in diffrent locations all over the globe. Be rest assured that your files cannot just go down`,
  },
  {
    id: 6,
    ques: 'Where can i know more about this STREMAGENIC?',
    ans: `We are putting up a comprehensive "Getting started documentation". mean-while engage our support team on discord and do follow us on Twitter.`,
  },
];

const masonryOptions = { originTop: true };

const Faq = () => {
  return (
    <Box as="section" id="faq" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          slogan="Get yours question answer"
          title="Frequantly asked question"
        />
        <Masonry options={masonryOptions} sx={styles.grid}>
          {data.map((item) => {
            return <FaqItem key={item.id} faq={item} className="faq-item" />;
          })}
        </Masonry>
      </Container>
    </Box>
  );
};

export default Faq;

const styles = {
  section: {
    pt: [8, null, null, null, 10, 14],
    pb: [null, null, null, null, null, null, 10, 6],
  },
  grid: {
    mx: [null, null, null, -6, -8, 'unset'],
  },
};
