export default ({ app, store }) => {
  const token =
    app.$cookies.get(
      "jwt_token"
    ); /* jwt_tokenをcookieから取得し、ストアに設定する */
  if (token) {
    store.dispatch("setToken", token);
  }
};
