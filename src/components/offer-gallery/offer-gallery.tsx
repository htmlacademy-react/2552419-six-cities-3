type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({images}: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="offer__image-wrapper">
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;

