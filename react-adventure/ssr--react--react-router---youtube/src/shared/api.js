import fetch from 'isomorphic-fetch'

export function fetchPopularRepos (language = 'all'){
  
  const URI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
    ${language}&sort=stars&order=desc&type=Repositories`)

  console.log('uri', URI)
  return fetch(URI)
    .then((data) => data.json())
    .then((repos) => repos.items)
    .catch((error) => {
      console.warn(error)
      return null
    })
}

export default fetchPopularRepos