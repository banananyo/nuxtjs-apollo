<template>
  <Tutorial />
</template>

<script lang="ts">
import TaskListQuery from 'apollo/queries/task.gql';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({
  // apollo: {
  //   taskList: {
  //     query: () => TaskListQuery,
  //   }
  // }
})
export default class IndexPage extends Vue {
  taskList: any;

  // async created () {
  //   const result = await this.$apollo.queries({
  //     query: TaskListQuery
  //   })
  //   console.log(result);
  // }
}
</script>
