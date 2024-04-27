<template>
  <div class="text-right mb-3">

    <Modal title="카테고리 추가" label="추가" labelClass="btn inline-flex justify-center btn-dark btn-sm mr-3" ref="modal1"
      @closed="resetModalData">
      <div class="text-base text-slate-600 dark:text-slate-300">
        <Textinput label="카테고리 " type="text" name="productcategory" v-model="productcategory"
          placeholder="추가 원하는 카테고리명을 입력하세요" class="mb-2" />

      </div>
      <template v-slot:footer>
        <Button text="등록" btnClass="btn-dark btn-sm" @click="$refs.modal1.closeModal(); resetModalData()" />
        <Button text="닫기" btnClass="btn-outline-dark btn-sm" @click="$refs.modal1.closeModal()" />
      </template>
    </Modal>

    <button class="btn inline-flex justify-center btn-sm  btn-dark"><span>삭제</span></button>
  </div>

  <div class="flex md:space-x-5 app_height overflow-hidden relative rtl:space-x-reverse">

    <div class="transition-all duration-150" :class="[
      width < 1280
        ? ' absolute h-full top-0 md:w-[260px] w-[200px] z-[999]'
        : 'flex-none min-w-[260px]',
      width < 1280 && mobileTodoSidebar ? 'left-0 ' : '-left-full ',
    ]">

      <Card bodyClass=" py-6 h-full flex flex-col" class="h-full">

        <div class="flex-1 h-full">

          <perfect-scrollbar class="h-full px-6">
            <ul class="list">
              <li v-for="item in fillters.slice(0, 4)" :key="item.label">
                <label class="flex items-center cursor-pointer px-2 py-3 rounded" @click="fillter = item.value" :class="fillter === item.value
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-200'
                  : '  text-slate-600 dark:text-slate-300 '
                  ">
                  <div class="flex-1 flex space-x-2 rtl:space-x-reverse">
                    <span class="text-xl" :class="[
                      fillter === item.value
                        ? ' text-slate-900 dark:text-slate-100'
                        : ' text-slate-400 dark:text-slate-400',
                    ]"></span>
                    <span class="capitalize text-sm" :class="[
                      fillter === item.value ? ' font-medium' : 'font-normal',
                    ]">{{ item.name }}</span>
                  </div>
                  <span class="flex-none font-normal capitalize text-sm">
                    {{ item.count }}</span>
                </label>
              </li>
            </ul>

          </perfect-scrollbar>
        </div>
      </Card>
    </div>
    <Transition name="overlay-fade">
      <div v-if="width < 1280 && mobileTodoSidebar"
        class="overlay bg-slate-900 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-60 backdrop-filter backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
        @click="closeMobileTodoSidebar"></div>
    </Transition>
    <div class="flex-1 md:w-[calc(100%-320px)]">
      <Card bodyClass="p-0  h-full" class="h-full">
        <perfect-scrollbar class="h-full all-todos overflow-x-hidden">
          <div
            class="md:flex justify-between items-center sticky bg-white dark:bg-slate-800 top-0 pt-6 pb-4 px-6 z-[44] border-b border-slate-100 dark:border-slate-700 rounded-t-md">
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
              <Tooltip placement="top" arrow v-if="width < 1280" theme="dark">
                <template #button>
                  <div @click="openMobileTodoSidebar"
                    class="md:h-8 md:w-8 h-6 w-6 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center md:text-base text-sm rounded-full cursor-pointer">
                    <Icon icon="heroicons-outline:menu-alt-2" />
                  </div>
                </template>
                <span> Sidebar Open</span>
              </Tooltip>
            </div>
          </div>

          <Loading :count="1" v-if="isLoading" />
          <Loading :count="isSkeletonLength" v-if="isSkeleton" />
          <Todos v-if="!isSkeleton" :todos="selectedTodo" />
        </perfect-scrollbar>

      </Card>



    </div>
  </div>
  <div class="text-center">
    <button class="btn inline-flex justify-center btn-sm btn-dark mr-3 mt-3"><span>저장</span></button>
    <button class="btn inline-flex justify-center btn-sm  btn-dark" @click="resetForm"><span>취소</span></button>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Loading from "@/components/Skeleton/Todo";
import Todos from "./Todos";
import Tooltip from "@/components/Tooltip";
import Modal from "../Modal/Modal.vue";
import Textinput from "@/components/Textinput/index.vue"
// import ref
import { computed, ref, watch, onMounted } from "vue";
import { useTodoStore } from "@/store/todo";
import { fillters } from "@/constant/data";


const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

let store = useTodoStore();
const openTodo = () => {
  store.openTodo();
};
const fillter = ref("all");

const actions = [
  {
    name: "Reset Sort",
    icon: "heroicons-outline:sort-ascending",
    doit: () => {
      store.resetSort();
    },
  },
  {
    name: "Sort A-Z ",
    icon: "heroicons-outline:sort-ascending",
    doit: () => {
      store.sortAZ();
    },
  },
  {
    name: " Sort Z-A ",
    icon: "heroicons-outline:sort-descending",
    doit: () => {
      store.sortZA();
    },
  },
];

// store computed
const todoSearch = computed(() => store.todoSearch);

const mobileTodoSidebar = computed(() => store.mobileTodoSidebar);
// dispatch openMobileTodoSidebar
const openMobileTodoSidebar = () => {
  store.openMobileTodoSidebar();
};
const closeMobileTodoSidebar = () => {
  store.closeMobileTodoSidebar();
};

const todos = computed(() => store.todosGetter);
const done = computed(() => store.isDone);
const fav = computed(() => store.isFav);
const high = computed(() => store.high);
const low = computed(() => store.low);
const team = computed(() => store.team);
const medium = computed(() => store.medium);
const update = computed(() => store.update);
const trash = computed(() => store.trashTodoGetter);
const isSkeletonLength = ref(todos.value.length);
const isSkeleton = ref(null);

// selectedTodo
// eslint-disable-next-line vue/return-in-computed-property
const selectedTodo = computed(() => {
  switch (fillter.value) {
    case 'refrigerated':
      return todos.value.filter(todo => todo.catagory.some(cat => cat.value === 'refrigerated'));
    case 'frozen':
      return todos.value.filter(todo => todo.catagory.some(cat => cat.value === 'frozen'));
    case 'room_temperature':
      return todos.value.filter(todo => todo.catagory.some(cat => cat.value === 'room_temperature'));
    // ... 나머지 경우의 수 처리
    default:
      return todos.value;
  }
});

const selectCategory = (categoryValue) => {
  fillter.value = categoryValue;
};

const isLoading = computed(() => store.isLoading);

watch(
  fillter,
  () => {
    switch (fillter.value) {
      case "all":
        fillter.value = "all";
        isSkeleton.value = true;
        isSkeletonLength.value = todos.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "done":
        fillter.value = "done";
        isSkeleton.value = true;
        isSkeletonLength.value = done.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "trash":
        fillter.value = "trash";
        isSkeleton.value = true;
        isSkeletonLength.value = trash.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "fav":
        fillter.value = "fav";
        isSkeleton.value = true;
        isSkeletonLength.value = fav.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "high":
        fillter.value = "high";
        isSkeleton.value = true;
        isSkeletonLength.value = high.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "low":
        fillter.value = "low";
        isSkeleton.value = true;
        isSkeletonLength.value = low.value.length;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "medium":
        fillter.value = "medium";
        isSkeleton.value = true;
        isSkeletonLength.value = medium.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "team":
        fillter.value = "team";
        isSkeleton.value = true;
        isSkeletonLength.value = team.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
      case "update":
        fillter.value = "update";
        isSkeleton.value = true;
        isSkeletonLength.value = update.value.length;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;

      default:
        fillter.value = "all";
        isSkeleton.value = true;
        store.mobileTodoSidebar = false;
        setTimeout(() => {
          isSkeleton.value = false;
        }, 500);
        break;
    }
  },
  { deep: true }
);

const selectedMainCategory = ref(null);
const subCategories = computed(() => {
  const category = fillters.find(cat => cat.value === selectedMainCategory.value);
  return category ? category.subCategories : [];
});

function selectMainCategory(categoryValue) {
  selectedMainCategory.value = categoryValue;
}


</script>
<style lang="scss">
.app_height {
  height: calc(var(--vh, 1vh) * 100 - 12.1rem);
}
</style>
