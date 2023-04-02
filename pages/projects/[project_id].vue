<template>
  <div class="background-container">
    <div class="top-content-container">
      <h1>Notes</h1>

      <iconButton background-color="green" variant="add" :click="() => (openedItemId = -1)" />
    </div>

    <listItem v-for="item in notes" :key="item.id" :value="item.value" :edit="() => (openedItemId = item.id)" />

    <dialogModal v-if="openedItemId !== null" :title="openedItemId === -1 ? 'Add Note' : 'Edit Note'"
      placeholder="Type your note..." :remove="deleteNote" :close="() => (openedItemId = null)"
      :submit="(noteValue) => submitNoteChange(noteValue)" :data="
        openedItemId !== null && openedItemId !== -1
          ? notes[notes.findIndex((item) => item.id === openedItemId)]
          : {}
      " />
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      notes: [],
      openedItemId: null,
    }
  },
  async mounted() {
    const projectId = this.$route.params.project_id
    this.notes = await this.getNotes(projectId)
  },
  methods: {
    async submitNoteChange(noteValue) {
      if (this.openedItemId === -1) {
        await fetch(`/api/note`, {
          body: JSON.stringify({
            projectId: this.$route.params.project_id,
            value: noteValue,
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            window.location.reload(true)
          })
          .catch((err) => {
            alert(err.toString())
            window.location.reload(true)
          })
      } else if (this.openedItemId !== null) {
        await fetch(`/api/note`, {
          body: JSON.stringify({
            id: this.openedItemId,
            value: noteValue,
          }),
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            window.location.reload(true)
          })
          .catch((err) => {
            alert(err.toString())
            window.location.reload(true)
          })
      }
    },
    async deleteNote() {
      await fetch(`/api/note`, {
        body: JSON.stringify({
          id: this.openedItemId,
        }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          window.location.reload(true)
        })
        .catch((err) => {
          alert(err.toString())
          window.location.reload(true)
        })
    },
    async getNotes(id) {
      try {
        const resJson = await fetch(`/api/project/${id}`).then((res) =>
          res.json()
        )
        resJson.notes.sort((a, b) => a.id - b.id)
        return resJson.notes
      } catch (err) {
        alert(err.toString())
        return []
      }
    },
  },
}
</script>
  
<style>
h1 {
  margin: 0;
}

.top-content-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 320px;
}
</style>