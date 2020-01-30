const fetch = require("node-fetch");

const url = "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
const jsonplaceholder_url = 'https://jsonplaceholder.typicode.com';
const github_url = 'https://github.com';

const getPost = async (nr) => {
  return await fetch(jsonplaceholder_url + '/posts/' + nr);
}

const posts = [1, 2, 3, 4, 5, 6 ,7 ,8 ,9, 10];

Promise.all(posts.map(nr => getPost(nr)))// it return responses array which are ... promises again
.then(responses => Promise.all(responses.map( response => response.json())))
.then(posts => posts.map( post => console.log(post)))
.catch( e => console.log(e));