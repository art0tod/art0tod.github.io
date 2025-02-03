import { TGitHubUser, TGithubRepos } from "./types";

const GITHUB_URL = 'https://api.github.com';
const USERNAME = 'art0tod';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));


export const getGitHubProfile = () =>
  fetch(`${GITHUB_URL}/users/${USERNAME}`)
    .then(res => checkResponse<TGitHubUser>(res))
    .then(data => data)

export const getGitHubPinnedRepos = () =>
  fetch(`${GITHUB_URL}/users/${USERNAME}/repos`)
    .then(res => checkResponse<TGithubRepos>(res))
    .then(data => data.filter(repo => repo.description && repo.description.includes("#yandex-practicum")))