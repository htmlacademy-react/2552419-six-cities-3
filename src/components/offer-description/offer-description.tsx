import { FC, memo } from 'react';
import { OFFER } from '../../constants';

type OfferDescriptionProps = {
  paragraphs: string[];
}

const OfferDescription: FC<OfferDescriptionProps> = memo(({ paragraphs }) => {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <div className="offer__description">
      {paragraphs.map((paragraph) => (
        <p key={`${paragraph.substring(0, Math.min(paragraph.length, OFFER.PARAGRAPH_KEY_PREFIX_LENGTH))}-${paragraph.length}`} className="offer__text">
          {paragraph}
        </p>
      ))}
    </div>
  );
});

OfferDescription.displayName = 'OfferDescription';

export default OfferDescription;

