<template>
  <div>
    <div class="flex z-[5] items-center relative justify-center md:mx-8">
      <div class="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
        v-for="(item, i) in steps" :key="i">
        <div :class="`   ${stepNumber >= i
            ? 'bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900'
            : 'bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70'
          }`"
          class="transition duration-150 icon-box md:h-12 md:w-12 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-1 md:text-lg text-base font-medium">
          <span v-if="stepNumber <= i"> {{ i + 1 }}</span>
          <span v-else class="text-3xl">
            <Icon icon="bx:check-double" />
          </span>
        </div>

        <div class="absolute top-1/2 h-[2px] w-full" :class="stepNumber >= i
            ? 'bg-slate-900 dark:bg-slate-900'
            : 'bg-[#E0EAFF] dark:bg-slate-700'
          "></div>
        <div
          class="absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100"
          :class="stepNumber >= i
              ? ' text-slate-900 dark:text-slate-300'
              : 'text-slate-500 dark:text-slate-300 dark:text-opacity-40'
            ">
          <p class="w-max">{{ item.title }}</p>
        </div>
      </div>
    </div>

    <div class="conten-box mt-14 border-t border-slate-100 dark:border-slate-700 -mx-6 px-6 pt-6">
      <form @submit.prevent="submit">
        <div v-for="(step, index) in steps" :key="index">
          <div v-if="stepNumber === index">
            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              <div class="lg:col-span-3 md:col-span-2 col-span-1">
                <h4 class="text-base text-slate-800 dark:text-slate-300 mb-6">
                  {{ step.title }}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Step1 -->
        <div v-if="stepNumber === 0">
          <Card>
            <!-- 라이브 제목 입력 -->
            <Textinput label="라이브 제목" placeholder="라이브 제목을 입력하세요" name="liveTitle" v-model="liveTitle" />
            <br>

            <!-- 라이브 한줄 요약 입력 -->
            <Textinput label="라이브 한줄 요약" placeholder="라이브 한줄 요약을 입력하세요" name="liveSummary" v-model="liveSummary" />
            <br>

            <!-- 대표 이미지 등록 -->
            <div class="flex flex-col md:flex-row items-start md:items-center">
              <label class="label-style">
                대표 이미지 등록
              </label>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="flex-shrink: 0;">
                <img :src="imageSrc" alt="대표 이미지 미리보기" style="width: 100px; height: 100px" />
              </div>
              <div style="margin-left: 20px;">
                <p>최대 용량 : 1mb</p>
                <p>권장 사이즈 : 400 x 400</p>
                <input type="file" id="imageUpload" @change="handleImageUpload"
                  accept="image/jpeg, image/png, image/gif" class="mb-2" />
              </div>
            </div>
            <br>

            <!-- 라이브 예정일/시간 선택 -->
            <Textinput label="라이브 예정일/시간" type="datetime-local" name="liveDateTime" v-model="liveDateTime" />
          </Card>
        </div>

        <div class="mt-10 flex justify-between items-center">
          <div v-if="stepNumber > 0">
            <Button @click.prevent="prev()" text="Prev" btnClass="btn-dark" />
          </div>
          <div v-if="stepNumber < steps.length - 1" class="flex justify-end w-full">
            <Button @click.prevent="next()" text="Next" btnClass="btn-dark" />
          </div>
          <div v-else class="flex justify-end w-full">
            <Button @click.prevent="save()" text="Save" btnClass="btn-dark" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import Card from "@/components/Card";

export default {
  components: {
    Button,
    Icon,
    Card
  },

  setup() {
    let steps = [
      {
        id: 1,
        title: "라이브 정보 등록",
      },
      {
        id: 2,
        title: "상품 정보 등록",
      },
      {
        id: 3,
        title: "공지사항 등록",
      },
    ];
    const toast = useToast();
    let stepNumber = ref(0);

    const submit = () => {
      let totalSteps = steps.length;
      const isLastStep = stepNumber.value === totalSteps - 1;
      if (isLastStep) {
        stepNumber = totalSteps - 1;
        toast.success("Form Submitted", {
          timeout: 2000,
        });
      } else {
        stepNumber.value++;
      }
    };

    const prev = () => {
      if (stepNumber.value > 0) {
        stepNumber.value--;
      }
    };

    const next = () => {
      if (stepNumber.value < steps.length - 1) {
        stepNumber.value++;
      }
    };

    const save = () => {
      toast.success("Form Saved", {
        timeout: 2000,
      });
    };

    return {
      submit,
      prev,
      next,
      save,
      steps,
      stepNumber,
    };
  },
};
</script>

<style lang="scss" scoped></style>
