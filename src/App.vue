<script setup lang="ts">
import Question from "@/components/Question.vue";
import {ref} from "vue";
import quizData from "@/assets/questions.json";
import { shuffleArray } from "./utilities/shuffle";

const allQuestions = ref(shuffleArray(quizData.questions))
const currentQuestionIndex = ref(0)
const currentQuestion = ref(allQuestions.value[currentQuestionIndex.value])
const numOfCorrectlyAnswered = ref(0)
const numOfIncorrectlyAnswered = ref(0)
const numOfAnsweredQuestions = ref(0)
const completed = ref(false)

const goToNextQuestion = () => {
  if (currentQuestionIndex.value + 1 >= allQuestions.value.length) {
    currentQuestionIndex.value = 0
    completed.value = true;
    return
  }
  currentQuestionIndex.value++
  currentQuestion.value = allQuestions.value[currentQuestionIndex.value]
}

const handleAnswerChecked = (isCorrect: boolean) => {
  console.log('was correct:')
  if (isCorrect === true) {
    numOfCorrectlyAnswered.value++
  } else {
    numOfIncorrectlyAnswered.value++
  }
  numOfAnsweredQuestions.value++
}

const handleNextQuestion = () => {
  if (currentQuestionIndex.value < allQuestions.value.length - 1) {
    goToNextQuestion()
  }
}

</script>

<template>
  <header class="pb-3">
    <nav class="navbar is-primary">
      <div class="navbar-brand is-size-5 p-2">
        Psychotest MPL
      </div>
    </nav>
  </header>
  <main class="section pt-0">
    <div class="questionare pb-3">
      <span class="has-text-weight-light">{{ numOfAnsweredQuestions + 1 }} / {{ allQuestions.length }} </span>
      <div v-if="completed">
        A to je vše vážení, gratulujeme k dokončení testu.
      </div>
      <div v-else>
        <Question 
            :question="currentQuestion.question" 
            :options="currentQuestion.options" 
            :correct-answer="currentQuestion.correct_answer" 
            @answer-checked="handleAnswerChecked"
            @next-question-clicked="handleNextQuestion"
            />
      </div>

    </div>
    <span class="has-text-weight-light">Správně zodpovězeny: {{ numOfCorrectlyAnswered }} | Špatně zodpovězeny: {{ numOfIncorrectlyAnswered }}</span>

  </main>
</template>
