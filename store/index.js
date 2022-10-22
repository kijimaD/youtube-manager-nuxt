import { createRequestClient } from "~/store/request-client";

export const state = () => ({
  items: [],
  item: {},
  meta: {},
});

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
};

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
};

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
};
