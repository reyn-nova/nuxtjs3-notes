<template>
  <button type="button" class="icon-button-container" :style="cssVars" @click="() => click()">
    <i id="icon" class="material-icons">{{ variant }}</i>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      required: true,
    },
    click: {
      type: Function,
      required: false,
      default: () => { },
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'gray',
    },
    width: {
      type: String,
      required: false,
      default: '40px',
    },
    margin: {
      type: [String, Number],
      required: false,
      default: '0px 0px 0px 0px',
    },
  },
  computed: {
    cssVars() {
      return {
        '--background-color': this.backgroundColor,
        '--margin': this.margin,
        '--width': this.width,
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>

<style scoped>
.icon-button-container {
  border-radius: 5px;
  background-color: var(--background-color);
  cursor: pointer;
  height: 40px;
  margin: var(--margin);
  width: var(--width);
}

#icon {
  color: white;
}
</style>
