
/**
 * Called after user enters credentials, saves to credentials
 * to localStorage for use in subsequent calls.
 * @param {string} userName
 * @param {string} password
 */
export function setAuthorization(user) {
  if (user) {
    localStorage.setItem('wedrinkinAuthorization', `Bearer ${user.token}`);
    const userObj = {
      token: user.token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      confirmed: user.confirmed,
    };
    localStorage.setItem('wedrinkinUser', JSON.stringify(userObj));
  } else {
    localStorage.removeItem('wedrinkinAuthorization');
    localStorage.removeItem('wedrinkinUser');
  }
}

/**
 * Site wide custom fetch wrapper. Appends default headers, calls the
 * standard fetch method, and returns a fetch promise.
 * @param {string} url
 * @param {object} options
 * @returns {Promise}
 */
export async function fetchWrapper(url, options) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers['Authorization'] = localStorage.getItem('wedrinkinAuthorization');
  let request = await fetch(url, options);
  // interrupt and redirect to /login
  // if (request.status === 401) {
  //   router.navigate(`/login`);
  // }
  return request;
}
