<template>
  <div class="background-container">
    <div class="top-content-container">
      <h1>Projects</h1>

      <iconButton background-color="green" variant="add" :click="() => (openedProjectId = -1)" />
    </div>

    <listItem v-for="item in projects" :key="item.id" :value="item.name"
      :click="() => $router.push(`/projects/${item.id}`)" :edit="() => (openedProjectId = item.id)" />

    <dialogModal v-if="openedProjectId !== null" :title="openedProjectId === -1 ? 'Add Project' : 'Edit Project'"
      placeholder="Type your project name..." :remove="deleteProject" :close="() => (openedProjectId = null)"
      :submit="(projectName) => submitProjectChange(projectName)" :data="getProjectItem()" />
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      projects: [],
      openedProjectId: null,
    }
  },
  async mounted() {
    this.projects = await this.getProjects()
  },
  methods: {
    async submitProjectChange(projectName) {
      if (this.openedProjectId === -1) {
        await fetch(`/api/project`, {
          body: JSON.stringify({
            name: projectName,
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
      } else if (this.openedProjectId !== null) {
        await fetch(`/api/project`, {
          body: JSON.stringify({
            id: this.openedProjectId,
            name: projectName,
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
    async deleteProject() {
      await fetch(`/api/project`, {
        body: JSON.stringify({
          id: this.openedProjectId,
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
    async getProjects() {
      try {
        const resJson = await fetch(`/api/project`).then((res) => res.json())
        resJson.sort((a, b) => a.id - b.id)
        return resJson
      } catch (err) {
        alert(err.toString())
        return []
      }
    },
    getProjectItem() {
      let item = {}
      if (this.openedProjectId !== null && this.openedProjectId !== -1) {
        item = {
          ...this.projects[
          this.projects.findIndex((item) => item.id === this.openedProjectId)
          ],
        }
        item.value = item.name
        item.name = null
      }
      return item
    },
  },
}
</script>

<style>
body,
h1 {
  margin: 0px;
}

.background-container {
  color: white;
  align-items: center;
  background-color: black;
  background-image: url('https://images.unsplash.com/photo-1534193708707-6be94c4f67d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80');
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}
</style>
  
<style scoped>
.top-content-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 320px;
}
</style>
  