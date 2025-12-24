import { FC } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { selectFavoriteOffers } from '../../store/data-slice';
import { useAppSelector } from '../../hooks/use-redux';
import { useAuth } from '../../hooks/use-auth';

const FavoritesEmptyPage: FC = () => {
  const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const { user } = useAuth();

  return (
    <div className="page page--favorites-empty">
      <Header
        user={user ? {
          email: user.email,
          avatarUrl: user.avatarUrl,
          favoriteCount: favoriteOffers.length,
        } : undefined}
      />

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesEmptyPage;
