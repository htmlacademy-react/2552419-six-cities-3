import { FC } from 'react';

type OfferInsideProps = {
  items: string[];
}

const OfferInside: FC<OfferInsideProps> = ({items}) => (
  <div className="offer__inside">
    <h2 className="offer__inside-title">What&apos;s inside</h2>
    <ul className="offer__inside-list">
      {items.map((item) => (
        <li key={item} className="offer__inside-item">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default OfferInside;

