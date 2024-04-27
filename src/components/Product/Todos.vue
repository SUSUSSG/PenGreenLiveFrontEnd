<template>
    <ul
      class="divide-y divide-slate-100 dark:divide-slate-700 -mb-6 h-full"
      v-if="todos"
      :class="window.width < 1024 ? 'whitespace-nowrap  overflow-x-auto ' : ''"
    >
      <li
        class="flex items-center px-6 space-x-4 py-6 hover:-translate-y-1 hover:shadow-todo transition-all duration-200 rtl:space-x-reverse"
        v-for="(item, i) in todos"
        :key="i"
      >
        <span
          class="flex-1 text-sm text-slate-600 dark:text-slate-300 truncate"
          :class="item.isDone ? 'line-through dark:text-slate-300' : ''"
        >
          {{ item.title }}
        </span>
        

      </li>
    </ul>
  </template>
  <script>
  import Icon from "@/components/Icon";
  import Tooltip from "@/components/Tooltip";
  import window from "@/mixins/window";
  
  export default {
    mixins: [window],
    components: {
      Icon,
      Tooltip,

    },  
    props: {
      todos: {
        type: Array,
        default: () => [],
      },
    },
  };
  </script>
  <style lang=""></style>
  