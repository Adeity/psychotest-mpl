<script setup lang="ts">
import {shuffleArray} from "@/utilities/shuffle.ts";
import {ref, defineEmits, type Ref, nextTick} from 'vue';

const props = defineProps<{
  question: string,
  options: Array<{option: string, key: string}>,
  correctAnswer: string
}>()

const selectedOption: Ref<string> = ref("")
const answered: Ref<boolean> = ref(false)
const isAnswerCorrect: Ref<boolean | null> = ref(null)
const emit = defineEmits(['answerChecked', 'nextQuestionClicked'])
const optionsRendered: Ref<Array<{option: string, key: string}>> = ref(shuffleArray([...props.options]))

console.log(optionsRendered)

const resetValues = async () => {
  selectedOption.value = ""
  answered.value = false
  isAnswerCorrect.value = null
  await nextTick()
  optionsRendered.value = shuffleArray([...props.options])
}

const handleAnswer = () => {
  answered.value = true;
  isAnswerCorrect.value = selectedOption.value === props.correctAnswer;
  emit('answerChecked', isAnswerCorrect.value);
}

const nextPage = () => {
  resetValues()
  emit('nextQuestionClicked')
}

const handleChange = (e: Event, option: string) => {
  selectedOption.value = option
  if(answered) {
    e.preventDefault();
    return;
  }
}

const wasAnsweredInCorrectly = (option:string) => {
  if (!answered.value || selectedOption.value != option) {
    return
  }
  if (selectedOption.value == props.correctAnswer && option == props.correctAnswer) {
    if (option === props.correctAnswer) {
      return false;
    } else if (option !== props.correctAnswer) {
      return false
    }
  }
  return true
}
</script>

<template>
  <div class="is-size-5 mb-3">{{question}}</div>
  <div class="radios is-flex-direction-column">
    <div v-for="option in optionsRendered" :class="{ 'is-correct': answered && option.key == props.correctAnswer, 'is-incorrect': wasAnsweredInCorrectly(option.key)}">
        <label>
          <input type="radio" name="rsvp" :value="option.key"  @change="handleChange($event, option.key)" :checked="selectedOption === option.key" />
          {{ option.option }}
        </label>
    </div>
  </div>
  <button v-if="!answered" class="button is-primary mt-3" @click="handleAnswer">Odpovědět</button>
  <button v-if="answered" class="button is-primary mt-3" @click="nextPage">Další otázka</button>
</template>

<style scoped>
</style>