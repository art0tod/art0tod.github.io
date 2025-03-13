import { TGitHubUser, TGithubRepos } from './types';
import { CacheService } from './cache';

const GITHUB_URL = 'https://api.github.com';
const USERNAME = 'art0tod';

const CACHE_KEYS = {
  PROFILE: 'github_profile',
  REPOS: 'github_repos'
};

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getGitHubProfile = async (): Promise<TGitHubUser> => {
  const cachedData = CacheService.get<TGitHubUser>(CACHE_KEYS.PROFILE);
  if (cachedData) {
    return cachedData;
  }

  const data = await fetch(`${GITHUB_URL}/users/${USERNAME}`).then((res) =>
    checkResponse<TGitHubUser>(res)
  );

  CacheService.set(CACHE_KEYS.PROFILE, data);
  return data;
};

export const getGitHubPinnedRepos = async (): Promise<TGithubRepos> => {
  const cachedData = CacheService.get<TGithubRepos>(CACHE_KEYS.REPOS);
  if (cachedData) {
    return cachedData;
  }

  const data = await fetch(`${GITHUB_URL}/users/${USERNAME}/repos`)
    .then((res) => checkResponse<TGithubRepos>(res))
    .then((data) =>
      data.filter(
        (repo) =>
          repo.description && repo.description.includes('#yandex-practicum')
      )
    );

  CacheService.set(CACHE_KEYS.REPOS, data);
  return data;
};
