<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div class="block video-block" v-for="item in items">
          <AppVideo :item="item" :video-id="item.id" />
        </div>
      </div>

      <div>
        <div class="black">
          <nav class="pagination">
            <!-- クリック時、ロードする関数を実行する -->
            <a href.prevent="#" class="pagination-text" @click="loadMore">
              More
            </a>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ROUTES from "~/routes/api";
import AppVideo from "~/components/AppVideo";

export default {
  components: { AppVideo },

  computed: {
    items() {
      return this.$store.getters.getPopularVideos;
    },
    nextPageToken() {
      return this.$store.getters.getMeta.nextPageToken; // computed経由でストアにアクセスしてpageTokenを取得
    },
  },

  methods: {
    loadMore() {
      // データをpayloadに詰め込む
      const payload = {
        uri: ROUTES.GET.POPULARS,
        params: {
          pageToken: this.nextPageToken,
        },
      };

      // dispatchしてアクションを実行する
      this.$store.dispatch("fetchPopularVideos", payload);
    },
  },

  // fetchはレンダリング前にストアにデータを設定するために使う。引数からstoreを取り出す
  async fetch({ store }) {
    const payload = {
      uri: ROUTES.GET.POPULARS,
    };

    if (
      store.getters.getPopularVideos &&
      store.getters.getPopularVideos.length > 0
    ) {
      return;
    }

    await store.dispatch("fetchPopularVideos", payload); // vuexストアのアクションに処理をdispatchする
  },
};
</script>

<style scoped>
.video-block {
  max-width: 900px;
}
</style>
