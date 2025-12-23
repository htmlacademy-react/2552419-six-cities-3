import { FC } from 'react';
import { getImageUrl } from '../../utils/image-url';

const HOST_AVATAR_SIZE = 74;

type OfferHostProps = {
  name: string;
  avatarUrl: string;
  isPro?: boolean;
  description: string[];
}

const OfferHost: FC<OfferHostProps> = ({name, avatarUrl, isPro = false, description}) => {
  const proClass = isPro ? 'offer__avatar-wrapper--pro' : '';

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={`offer__avatar-wrapper user__avatar-wrapper ${proClass}`}>
          <img className="offer__avatar user__avatar" src={getImageUrl(avatarUrl)} width={HOST_AVATAR_SIZE} height={HOST_AVATAR_SIZE} alt="Host avatar" />
        </div>
        <span className="offer__user-name">
          {name}
        </span>
        {isPro && (
          <span className="offer__user-status">
            Pro
          </span>
        )}
      </div>
      <div className="offer__description">
        {description.map((text, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index} className="offer__text">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default OfferHost;

