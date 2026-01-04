import { FC } from 'react';
import './server-error.css';

const ServerError: FC = () => (
  <div className="server-error">
    <div className="server-error__content">
      <h2 className="server-error__title">Server Unavailable</h2>
      <p className="server-error__message">
        The server is currently unavailable. Please try again later.
      </p>
    </div>
  </div>
);

ServerError.displayName = 'ServerError';

export default ServerError;

