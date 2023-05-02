/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Heading, Image } from 'theme-ui';
import { Link } from '../link';
import { rgba } from 'polished';

const Widget = ({ title, items }) => {
  return (
    <Box sx={styles.footerWidget}>
      <Heading as="h3">{title}</Heading>
      <ul>
        {items.map(({ path, label, icon }, i) => (
          <li key={i}>
            {icon && <Image src={icon} alt={label} />}
            <Link path={path} key={i} label={label} variant="footer" />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Widget;

const styles = {
  footerWidget: {
    h3: {
      color: 'heading',
      fontFamily: 'body',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: 1.68,
      letterSpacing: 'heading',
    },
    ul: {
      listStyle: 'none',
      margin: '28px 0 0',
      padding: 0,
      li: {
        display: 'flex',
        alignItems: 'center',
        img: {
          mr: '15px',
        },
      },
      a: {
        fontSize: '15px',
        color: rgba('#02073E', 0.8),
        lineHeight: 2.5,
      },
    },
  },
};
