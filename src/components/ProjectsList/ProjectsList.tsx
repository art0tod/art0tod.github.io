import React, { useEffect, useState } from 'react';
import { TGithubRepos } from '../../utils/types';
import { getGitHubPinnedRepos } from '../../utils/api';
import style from './ProjectsList.module.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { githubProjectsMocks } from '../../mocks/githubProjectsMocks';

export const ProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<TGithubRepos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGitHubPinnedRepos()
      .then((result) => {
        const sortedRepos = result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRepos(sortedRepos);
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
  //   setRepos(githubProjectsMocks as TGithubRepos);
  //   setLoading(false);
  //   setError(null);
  // }, []);

  return (
    <div className={style.root}>
      <h2>My study projects</h2>
      {loading ? (
        <div className={'loading'}></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !repos ? (
        <div>There is no data about repositories</div>
      ) : (
        <ul className={style.repos_list}>
          {repos.map((repo) => (
            <li key={repo.id} className={style.repos_item}>
              <Link
                to={repo.html_url}
                target='_blank'
                rel='noopener noreferrer'
                className={style.repos_item_link}
              >
                <img
                  src={`https://raw.githubusercontent.com/art0tod/${repo.name}/refs/heads/main/preview.png`}
                  alt={repo.name}
                  className={style.repo_image}
                />
                <div className={style.repo_info}>
                  <h3 className={style.repo_name}>{repo.name}</h3>
                  <p className={style.paragraph}>
                    Updated: {formatDate(repo.updated_at)}
                  </p>
                  <p className={style.paragraph}>
                    Creaded: {formatDate(repo.created_at)}
                  </p>
                  <p className={style.paragraph + ' ' + style.desc}>
                    {repo.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
