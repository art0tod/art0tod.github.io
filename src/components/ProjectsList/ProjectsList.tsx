import React, { useEffect, useState, useRef } from 'react';
import { TGithubRepos } from '../../utils/types';
import { getGitHubPinnedRepos } from '../../utils/api';
import style from './ProjectsList.module.css';
import { ProjectCard } from '../ProjectCard';

export const ProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<TGithubRepos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={style.root}>
      <h2 className={style.title}>My study projects</h2>
      {loading ? (
        <div className={'loading'}></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !repos ? (
        <div>There is no data about repositories</div>
      ) : (
        <div ref={listRef} className={style.repos_list}>
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
};
