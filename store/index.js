import { createRequestClient } from "~/store/request-client";
import auth from "~/plugins/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
} from "firebase/auth";

export const state = () => ({
  items: [],
  relatedItems: [],
  item: {},
  meta: {},
  searchItems: [],
  searchMeta: {},
  token: "",
});

/* APIアクセスをする関数。結果をmutate関数を使って保存する */
export const actions = {
  async fetchPopularVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios); // APIをリクエストするためのリクエストクライアントを作成
    const res = await client.get(payload.uri, payload.params); // GETリクエストを送信
    commit("mutatePopularVideos", res); // APIのレスポンスをcommitに渡す
  },

  async findVideo({ commit }, payload) {
    const client = createRequestClient(this.$axios);
    const res = await client.get(payload.uri);
    const params = {
      ...res.video_list,
    };
    commit("mutateVideo", params);
  },

  async fetchRelatedVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios);
    const res = await client.get(payload.uri);
    commit("mutateRelatedVideos", res);
  },

  async searchVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios);
    const res = await client.get(payload.uri, payload.params);
    commit("mutateSearchVideos", res);
  },

  async signUp({ commit, dispatch }, payload) {
    /* アカウント作成 */
    await createUserWithEmailAndPassword(auth, payload.email, payload.password);

    // ログイン
    const res = signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    /* サーバーサイドでユーザ認証するときにJWTを使用するため、トークンを取得する */
    const { currentUser } = auth;
    const token = await getIdToken(currentUser);

    this.$cookies.set("jwt_token", token);
    commit("mutateToken", token);
    this.app.router.push("/");
  },

  async setToken({ commit }, payload) {
    commit("mutateToken", payload);
  },

  async login({ commit, dispatch }, payload) {
    const res = signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    const { currentUser } = auth;
    const token = await getIdToken(currentUser);

    this.$cookies.set("jwt_token", token);
    commit("mutateToken", token);
    this.app.router.push("/");
  },

  async logout({ commit }) {
    await signOut(auth);
    // stateのトークンクリア
    commit("mutateToken", null);
    // cookieのトークンクリア
    this.$cookies.remove("jwt_token");
    this.app.router.push("/");
  },
};

/* stateに保存する関数 */
export const mutations = {
  mutatePopularVideos(state, payload) {
    state.items = payload.items ? state.items.concat(payload.items) : []; // ミューテーションではステートにAPIのレスポンスをセットする
    state.meta = payload;
  },

  mutateVideo(state, payload) {
    const params =
      payload.items && payload.items.length > 0 ? payload.items[0] : {};
    state.item = params;
  },

  mutateRelatedVideos(state, payload) {
    state.relatedItems = payload.items || [];
  },

  mutateSearchVideos(state, payload) {
    state.searchItems = payload.items
      ? state.searchItems.concat(payload.items)
      : [];
    state.searchMeta = payload;
  },

  mutateToken(state, payload) {
    state.token = payload;
  },
};

/* stateのフィールドにアクセスする関数 */
export const getters = {
  getPopularVideos(state) {
    return state.items; // Vueコンポーネントからステートを参照するためのゲッタを定義する
  },
  getMeta(state) {
    return state.meta;
  },
  getVideo(state) {
    return state.item;
  },
  getRelatedVideos(state) {
    return state.relatedItems;
  },
  getSearchVideos(state) {
    return state.searchItems;
  },
  getSearchMeta(state) {
    return state.searchMeta;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
};
