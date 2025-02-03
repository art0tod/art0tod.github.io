import React, { useEffect, useState } from 'react';
import { TGithubRepos } from '../../utils/types';
import { getGitHubPinnedRepos } from '../../utils/api';
import style from './ProjectsList.module.css'
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';

export const ProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<TGithubRepos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGitHubPinnedRepos()
      .then(result => {
        const sortedRepos = result.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRepos(sortedRepos);
      })
      .catch(err => {
        setError('GitHub API error');
        console.log(err.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={style.root}>
      <h2>My projects</h2>
      {loading ? (
        <div className={'loading'}></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !repos ? (
        <div>There is no data about repositories</div>
      ) : (
        <ul className={style.repos_list}>
          {repos.map(repo => (
            <li className={style.repos_item} key={repo.id}>
              <Link className={style.repos_item_link} to={repo.html_url} target='_blank' rel='noopener noreferrer'>
                <h3 className={style.repo_name}>{repo.name}</h3>
                <p className={style.paragraph}>Updated at: {formatDate(repo.updated_at)}</p>
                <p className={style.paragraph}>Creaded at: {formatDate(repo.created_at)}</p>
                <p className={style.paragraph + ' ' + style.desc}>{repo.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )
      }
    </div >
  );
};
