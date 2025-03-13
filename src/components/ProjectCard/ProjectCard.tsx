import style from './ProjectCard.module.css';
import { Link } from 'react-router-dom';
import { TGitHubRepo } from '../../utils/types';
import { formatDate } from '../../utils/utils';

export const ProjectCard = ({ repo }: { repo: TGitHubRepo }) => (
  <div key={repo.id} className={style.repos_item}>
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
        <p className={style.line + ' ' + style.desc}>{repo.description}</p>
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
  </div>
);
