<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="block video-player">
          <!-- $routeオブジェクトを使ってルートからidを取得 -->
          <youtube :video-id="this.$route.params.id" ref="youtube"></youtube>
        </div>

        <div class="box">
          <p>
            <span class="title is-4">{{ item.snippet.title }}</span>
          </p>

          <div class="level">
            <div class="level-left">
              {{ item.snippet.channelTitle }}
              <br />
              {{ item.snippet.publishedAt }}
            </div>
          </div>

          <hr />
          <p>{{ item.snippet.description }}</p>
        </div>
      </div>

      <div class="column is-4">
        <div class="box">
          <p>
            <span>関連動画</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ROUTES from "~/routes/api";

export default {
  computed: {
    item() {
      /* 表示する内容はゲッタを使ってストアから取り出す */
      return this.$store.getters.getVideo;
    },
  },

  async fetch({ store, route }) {
    /* 画面アクセス時にfetch()が呼び出されるため、ストアにdispatchしてAPIを実行する */
    await store.dispatch("findVideo", {
      uri: ROUTES.GET.VIDEO.replace(":id", route.params.id),
    });
  },
};
</script>

<style>
iframe {
  width: 100%;
  height: 500px;
}

.video-player {
  max-width: 880px;
}
</style>
