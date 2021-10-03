<template>
  <div>
    <a href="/">Index</a>
    <p v-if="$fetchState.pending">Fetching tasks...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <h1>Task List</h1>
      <form @submit="createTask" v-on:submit.prevent>
        <input type="text" placeholder="title" v-model="title">
        <button type="submit">create</button>
      </form>
      <div>
        <ul>
          <li v-for="task in taskList" :key="task.id">
            {{ `${task.title} : ${task.status} : ${task.description}` }}
            <button @click="deleteTask(task.id)">delete</button>
            <NuxtLink :to="`/task/${task.id}`">View</NuxtLink>
            <!-- <button @click="viewTask(task.id)">view</button> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

export default {
  name: 'TaskList',
  data: () => {
    return { taskList: [], title: null };
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
      const res = await this.$apollo.query({
          query: gql`
            query {
              taskList {
                id
                title
                description
                status
              }
            }
          `,
        });
      console.log(res.data);
      this.taskList = res.data.taskList;
    },
    async createTask() {
      console.log(this.title);
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: InsertTaskInput!){
            insertTask(input: $input) {
              id
              title
              description
              status
            }
          }
        `,
        variables: {
          input: {
            title: this.title
          },
        },
      });
      window.location.reload()
    },
    async deleteTask(id) {
      console.log(id);
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($input: DeleteTaskInput!){
            deleteTask(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            id: id
          },
        },
      });
      window.location.reload()
    },
    async viewTask(id) {
      console.log(id);
      await this.$apollo.query({
        query: gql`
          query ($input: FindOneTaskInput!){
            task(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            id: id
          },
        },
      });
      redirect({ name: 'task', params: { slug: id } })
    }
  },
};
</script>
