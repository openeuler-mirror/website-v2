<template>
  <div class="theme-container">
    <div class="theme-default-content" v-if="$route.path !== '/'">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/zh/">
        Take me home.
      </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  },
  watch: {
      '$route.path': {
          immediate: true,
          handler (val) {
              if(val === '/') {
                  window.location.href = '/zh/';
              }
          }
      }
  }
}
</script>
