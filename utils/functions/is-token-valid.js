const parseJwt = (token) => {
    // token.split('.')[1] => token consists of three parts separated by dots. The second part is the payload.
    // atob() => decodes a string of data which has been encoded using base-64 encoding.
    return JSON.parse(atob(token.split('.')[1]));
};

/**
 * Check if the token is valid by comparing the expiration time of the token with the current time
 *
 * @param {string} token - The token to check
 * @returns {boolean} - If the token is valid or not
 */

export const isTokenValid = (token) => {
    if (!token) return false;

    const jwtExpireTimeStamp = parseJwt(token).exp;
    // JWT expiration time is in seconds, since the Unix epoch.

    const jwtExpireDateTime = new Date(jwtExpireTimeStamp * 1000);
    // new Date gets a new date object with the given milliseconds added to the 1 January 1970 00:00:00 UTC.

    // if the token is expired, return false which means the user is not authenticated.
    if (jwtExpireDateTime < new Date()) return false;

    return true;
};