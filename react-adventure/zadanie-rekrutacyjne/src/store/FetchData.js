import * as _ from 'lodash';
// import 'isomorphic-fetch';
import  {setAllUsers} from './actions/Actions';
import {InitialState} from './InitialState';


async function fetchData (url) {
  // if (_.isEqual(store.getState(), InitialState)){
    let res = await fetch(url);
    let json = await res.json();
    console.log("fetched data",json);
    return json
  // }
  // else {
  //   return false
  // }
}

export default fetchData