import Cookies from "js-cookie";

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token and encrypted user data
 */
export const isUserAuthenticated = () => {
  const token = Cookies.get("tredingWeb");
  const encryptedUser = Cookies.get("tredingWebUser");
  return !!token && !!encryptedUser;
};

/**
 * Redirect to signup if not authenticated
 * @param {Function} navigate - React Router navigate function
 * @returns {void}
 */
export const requireAuth = (navigate) => {
  if (!isUserAuthenticated()) {
    navigate("/register");
    return false;
  }
  return true;
};
