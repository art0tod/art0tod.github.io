import React, { useEffect, useState, useRef } from 'react';
import { TGithubRepos } from '../../utils/types';
import { getGitHubPinnedRepos } from '../../utils/api';
import style from './ProjectsList.module.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
// import { githubProjectsMocks } from '../../mocks/githubProjectsMocks';

export const ProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<TGithubRepos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  useEffect(() => {
    const handleWheel = (evt: WheelEvent) => {
      evt.preventDefault();
      if (listRef.current) {
        listRef.current.scrollLeft += evt.deltaY;
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // // TODO: remove this mock
  // useEffect(() => {
  //   setRepos(githubProjectsMocks as TGithubRepos);
  //   setLoading(false);
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
        <ul ref={listRef} className={style.repos_list}>
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
                  <p className={style.repo_info_line}>
                    <span className={style.repo_info_line_label}>Updated:</span>
                    <span>{formatDate(repo.updated_at)}</span>
                  </p>
                  <p className={style.repo_info_line}>
                    <span className={style.repo_info_line_label}>Creaded:</span>
                    <span>{formatDate(repo.created_at)}</span>
                  </p>
                  <p className={style.line + ' ' + style.desc}>
                    {repo.description}
                  </p>
                </div>
              </Link>
              <div className={style.repo_links}>
                <Link
                  to={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={style.repo_link}
                >
                  GitHub
                </Link>
                <Link
                  to={`https://art0tod.github.io/${repo.name}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={style.repo_link}
                >
                  Site
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
