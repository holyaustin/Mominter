/** @jsx jsx */
import { jsx, Heading } from 'theme-ui';
import { BsArrowRight } from 'react-icons/bs';
import { BaseAccordion } from './base-accordion';
import {
  AccordionButton,
  AccordionItem,
  AccordionContents,
  single,
  preventClose,
  combineReducers,
} from './shared';
import { rgba } from 'polished';

export default function Accordion({ items, ...props }) {
  return (
    <BaseAccordion
      stateReducer={combineReducers(single, preventClose)}
      {...props}
    >
      {({ openIndexes, handleItemClick }) => (
        <>
          {items.map((item, index) => (
            <AccordionItem
              key={item.title}
              sx={styles.accordion}
              isOpen={openIndexes.includes(index)}
              className={openIndexes.includes(index) ? 'is-open' : 'is-closed'}
            >
              <AccordionButton onClick={() => handleItemClick(index)}>
                <Heading as="h4" sx={styles.title}>
                  {item.title}
                </Heading>
                {!openIndexes.includes(index) && (
                  <BsArrowRight
                    size="28px"
                    color={rgba('#0F2137', 0.3)}
                    sx={styles.arrow}
                  />
                )}
              </AccordionButton>
              <AccordionContents
                isOpen={openIndexes.includes(index)}
                sx={styles.content}
              >
                {item.contents}
              </AccordionContents>
            </AccordionItem>
          ))}
        </>
      )}
    </BaseAccordion>
  );
}

const styles = {
  accordion: {
    backgroundColor: '#F6F8FB',
    borderRadius: 10,
    p: ['15px', '20px 30px', '30px 45px', '20px 25px', '20px 35px'],
    '&.is-open': {
      backgroundColor: '#fff',
      boxShadow: '0px 9px 30px rgba(69, 88, 157, 0.08)',
    },
  },
  title: {
    color: 'heading',
    fontWeight: 500,
    fontSize: [1, null, null, 2],
    letterSpacing: [0, null, null, null, 'heading'],
    lineHeight: [1.5, 1.8],
  },
  arrow: {
    width: [20, null, null, 25],
  },
  content: {
    fontSize: [1, null, null, 2],
  },
};
