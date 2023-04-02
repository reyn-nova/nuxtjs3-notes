<template>
  <form class="modal-container" @submit.prevent="() => submit(value)">
    <div class="modal-inner-container">
      <div class="modal-top-content-container">
        <h1>{{ title }}</h1>

        <div>
          <iconButton variant="delete" background-color="red" margin="0px 10px 0px 0px" :click="remove" />
          <iconButton variant="close" :click="close" />
        </div>
      </div>

      <input ref="input" v-model="value" autofocus="true" :placeholder="placeholder" class="modal-input" />

      <iconButton variant="done" background-color="green" width="100%" margin="20px 0px 0px 0px"
        :click="() => submit(value)" />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    remove: {
      type: Function,
      required: false,
      default: () => { },
    },
    close: {
      type: Function,
      required: false,
      default: () => { },
    },
    submit: {
      type: Function,
      required: false,
      default: () => { },
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: this.data.value,
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
}
</script>

<style scoped>
.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-inner-container {
  width: 280px;
  background-color: white;
  border-radius: 5px;
  color: black;
  padding: 20px;
}

.modal-top-content-container {
  display: flex;
  justify-content: space-between;
}

.modal-input {
  color: black;
  padding: 10px;
  width: calc(100% - 25px);
  background-color: gainsboro;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
