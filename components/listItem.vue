<template>
    <div class="list-item-container">
        <div @click="() => click()">
            <input disabled class="list-item-input" :value="value" />
        </div>

        <iconButton variant="edit" margin="0px 0px 0px 20px" :click="edit" />
    </div>
</template>
  
<script lang="js">
export default {
    props: {
        value: {
            type: String,
            required: false,
            default: '',
        },
        click: {
            type: Function,
            required: false,
            default: () => { },
        },
        edit: {
            type: Function,
            required: false,
            default: () => { },
        },
    },
}
</script>
  
<style scoped>
.list-item-container {
    display: flex;
    margin-top: 20px;
    width: 320px;
    justify-content: space-between;
}

.list-item-input {
    color: black;
    padding: 10px;
    width: 230px;
    border-radius: 5px;
    background-color: gainsboro;
}
</style>