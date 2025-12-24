import { FC, FormEvent, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks/use-redux';
import { loginAction } from '../../store/api-actions';
import { useAuth } from '../../hooks/use-auth';
import { AppRoute } from '../../constants';

const isValidPassword = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  return hasLetter && hasDigit;
};

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthorized) {
      navigate(AppRoute.Main);
    }
  }, [isAuthorized, navigate]);

  const handleSubmit = useCallback(async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password.trim() === '' || !isValidPassword(password)) {
      return;
    }

    const result = await dispatch(loginAction({ email, password }));
    if (loginAction.fulfilled.match(result)) {
      navigate(AppRoute.Main);
    }
  }, [dispatch, email, navigate, password]);

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    void handleSubmit(evt);
  };

  if (isAuthorized) {
    return null;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={onFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
                  title="Password must contain at least one letter and one digit"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <span className="locations__item-link">
                <span>Amsterdam</span>
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
