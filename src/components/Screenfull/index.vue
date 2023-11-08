<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen':'fullscreen'" @click="handleScreenFull" />
  </div>
</template>

<script>
import screenfull from 'screenfull/dist/screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destrory()
  },
  methods: {
    handleScreenFull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'screenfull can not work on your browser',
          type: 'error'
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destrory() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>
<style scoped>

</style>
