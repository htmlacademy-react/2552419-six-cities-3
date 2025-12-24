import { FC } from 'react';
import { getImageUrl } from '../../utils/image-url';
import { OFFER } from '../../constants';

type OfferGalleryProps = {
  images: string[];
}

const OfferGallery: FC<OfferGalleryProps> = ({images}) => {
  const displayImages = images.slice(0, OFFER.MAX_IMAGES);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {displayImages.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="offer__image-wrapper">
            <img className="offer__image" src={getImageUrl(image)} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferGallery;

