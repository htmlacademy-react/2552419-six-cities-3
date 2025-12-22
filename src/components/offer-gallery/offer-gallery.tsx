import { FC } from 'react';

type OfferGalleryProps = {
  images: string[];
}

const OfferGallery: FC<OfferGalleryProps> = ({images}) => {
  const baseUrl = import.meta.env.BASE_URL || '';

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="offer__image-wrapper">
            <img className="offer__image" src={`${baseUrl}${image}`} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferGallery;

