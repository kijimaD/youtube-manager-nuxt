<template>
  <section class="section">
    <div class="container">
    </div>
  </section>
</template>

<script>
  import ROUTES from '~/routes/api'

  export default {
      // fetchはレンダリング前にストアにデータを設定するために使う。引数からstoreを取り出す
      async fetch({store}) {
          const payload = {
              uri: ROUTES.GET.POPULARS
          }

          await store.dispatch('fetchPopularVideos', payload) // vuexストアのアクションに処理をdispatchする
      }
  }
</script>
