import { FC, memo } from 'react';
import './spinner.css';

const Spinner: FC = memo(() => (
  <div className="spinner-container">
    <div className="spinner" />
  </div>
));

Spinner.displayName = 'Spinner';

export default Spinner;

