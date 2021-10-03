<template>
  <div>
    <p v-if="$fetchState.pending">Fetching tasks...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <form @submit="editTask" v-on:submit.prevent>
        <input type="text" placeholder="title" v-model="task.title"><br>
        <textarea v-model="task.description"></textarea><br>
        <select v-model="task.status">
          <option value="TODO">TODO</option>
          <option value="DOING">DOING</option>
          <option value="CANCEL">CANCEL</option>
          <option value="SUCCESS">SUCCESS</option>
        </select><br>
        <button type="submit">update</button>
      </form>
      <NuxtLink :to="`/task`">Back</NuxtLink>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

export default {
  name: 'Task',
  data: () => {
    return { task: {
      id: null,
      title: null,
      description: null,
      status: null
    } };
  },
  fetchOnServer: true,
  async fetch() {
    await this.fetch();
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  methods: {
    async fetch() {
      const id = this.$route.params.id
      console.log(id)
      const res = await this.$apollo.query({
        query: gql`
          query ($input: FindOneTaskInput!){
            task(input: $input) {
              id
              title
              description
              status
            }
          }
        `,
        variables: {
          input: {
            id: Number(id)
          },
        },
        });
      console.log(res.data.task);
      this.task = res.data.task;
    },
    async editTask() {
      console.log(this.task);
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: EditTaskInput!){
            editTask(input: $input) {
              id
              title
              description
              status
            }
          }
        `,
        variables: {
          input: {
            id: this.task.id,
            title: this.task.title,
            description: this.task.description,
            status: this.task.status,
          },
        },
      });
      window.location.reload()
    },
  },
};
</script>
