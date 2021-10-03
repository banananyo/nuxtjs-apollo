<template>
  <div>{{ list }}</div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => {
    return { list: [] };
  },
  async created() {
    const res = await this.taskList();
    console.log(res.data);
    this.list = res.data;
  },
  methods: {
    async taskList() {
      return this.$apollo.query({
        query: gql`
          query {
            taskList {
              title
              description
              status
            }
          }
        `,
      });
    },
  },
};
</script>
