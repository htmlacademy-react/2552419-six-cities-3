import { FC, useMemo, memo } from 'react';
import { getImageUrl } from '../../utils/image-url';
import { OFFER } from '../../constants';

type OfferGalleryProps = {
  images: string[];
}

const OfferGallery: FC<OfferGalleryProps> = memo(({images}) => {
  const displayImages = useMemo(() => images.slice(0, OFFER.MAX_IMAGES), [images]);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {displayImages.map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img className="offer__image" src={getImageUrl(image)} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
});

OfferGallery.displayName = 'OfferGallery';

export default OfferGallery;

