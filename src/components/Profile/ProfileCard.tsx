import React, { useEffect, useState } from 'react';
import { TGitHubUser } from '../../utils/types';
import { getGitHubProfile } from '../../utils/api';
import style from './Profile.module.css';
import { Link } from 'react-router-dom';
// import { githubProfileMocks } from '../../mocks/githubProfileMocks';

export const ProfileCard: React.FC = () => {
  const [user, setUser] = useState<TGitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGitHubProfile()
      .then((result) => {
        setUser(result);
        setLoading(false);
      })
      .catch((err) => {
        setError('GitHub API error');
        console.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // TODO: remove this mock after testing
  // useEffect(() => {
  //   setUser(githubProfileMocks as TGitHubUser);
  //   setLoading(false);
  //   setError(null);
  // }, []);

  return (
    <div className={style.root}>
      {loading ? (
        <div className={'loading'}></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !user ? (
        <div>There is no data about user</div>
      ) : (
        <Link
          to='https://github.com/art0tod'
          className={style.link}
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className={style.card}>
            <img className={style.avatar} src={user.avatar_url} alt='Аватар' />
            <div className={style.name}>
              <span className={style.title}>
                {user.name} {user.email}
              </span>
              <span className={style.login}>@{user.login}</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
