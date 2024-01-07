import { handleErrors, safeCredentials } from "./fetchHelper";

export function getRequest(link, callback) {
  fetch(link)
  .then(handleErrors)
  .then(data => { callback(data) })
  .catch(error => {console.log(error)})
}