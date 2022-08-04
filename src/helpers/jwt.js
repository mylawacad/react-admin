export const parseJwt = function (jwt) {
  if (jwt) {
    const base64Url = jwt.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const session = JSON.parse(window.atob(base64));
    const id = session.sub;
    const exp = session.exp;

    return {
      id,
      exp,
    };
  } else {
    return {};
  }
};
