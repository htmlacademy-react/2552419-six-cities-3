import { FC } from 'react';
import './spinner.css';

const Spinner: FC = () => (
  <div className="spinner-container">
    <div className="spinner" />
  </div>
);

Spinner.displayName = 'Spinner';

export default Spinner;
