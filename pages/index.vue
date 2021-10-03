<template>
  <a href="/task">task</a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'Index',
})
export default class IndexPage extends Vue {
  taskList: any;
}
</script>
