import actionTypes from './ActionType';

export async function fetchUsers(url) {
  let response = await fetch(url);
  let json = await response.json();
  console.log('json',json);
  return { type: actionTypes.FETCH_ALL_USERS, users: json}
}

export function fetchUser(id) {
  return { type: actionTypes.FETCH_USER, id }
}
 
export function delteUser(users) {
  return { type: actionTypes.DELETE_USER, users: users }
}
 
export function updateUser(users) {
  return { type: actionTypes.UPDATE_USER, users: users }
}

export function createUser(users) {
  return { type: actionTypes.CREATE_USER, users: users }
}