<script setup lang="ts">
import Question from "@/components/Question.vue";
import {ref, watch} from "vue";
import quizData from "@/assets/questions.json";
import { shuffleArray } from "./utilities/shuffle";

const resetTest = () => {
  if (!completed.value) {
    const confirmed = confirm("Opravdu si přejete resetovat test?")
    if (!confirmed) {
      return
    }
  }
  localStorage.removeItem("currentQuestionIndex")
  localStorage.removeItem("allQuestions")
  localStorage.removeItem("numOfCurrentlyAnswered")
  localStorage.removeItem("numOfCorrectlyAnswered")
  localStorage.removeItem("numOfIncorrectlyAnswered")
  localStorage.removeItem("indexesOfShuffeledQuestions")
  localStorage.removeItem("completed")
  window.location.reload()
}

const allQuestiotnsLocalStorage = localStorage.getItem('allQuestions') || null
const allQuestions = ref(allQuestiotnsLocalStorage !== null ? JSON.parse(allQuestiotnsLocalStorage) : shuffleArray(quizData.questions))
localStorage.setItem('allQuestions', JSON.stringify(allQuestions.value))

const currentQuestionIndex = ref(Number(localStorage.getItem("currentQuestionIndex")) || 0)
const currentQuestion = ref(allQuestions.value[currentQuestionIndex.value])
const numOfCorrectlyAnswered = ref(Number(localStorage.getItem("numOfCorrectlyAnswered")) || 0)
const numOfIncorrectlyAnswered = ref(Number(localStorage.getItem("numOfIncorrectlyAnswered")) || 0)
const numOfAnsweredQuestions = ref(Number(localStorage.getItem("numOfCurrentlyAnswered")) || 0)
const completed = ref(localStorage.getItem("completed") === "true" || false)
localStorage.setItem('completed', JSON.stringify(completed.value))

watch(currentQuestionIndex, (newVal) => {
  localStorage.setItem("currentQuestionIndex", JSON.stringify(newVal))
})
watch(numOfCorrectlyAnswered, (newVal) => {
  localStorage.setItem("numOfCorrectlyAnswered", JSON.stringify(newVal))
})
watch(numOfIncorrectlyAnswered, (newVal) => {
  localStorage.setItem("numOfIncorrectlyAnswered", JSON.stringify(newVal))
})
watch(currentQuestionIndex, (newVal) => {
  localStorage.setItem("currentQuestionIndex", JSON.stringify(newVal))
})
watch(numOfAnsweredQuestions, (newVal) => {
  localStorage.setItem("numOfCurrentlyAnswered", JSON.stringify(newVal))
})
watch(completed, (newVal) => {
  localStorage.setItem("completed", JSON.stringify(newVal))
})
watch(allQuestions, (newVal) => {
  localStorage.setItem("allQuestions", JSON.stringify(newVal))
})


const getSpatneOtazek = () => {
  if (numOfIncorrectlyAnswered.value === 1){
    return "1 špatně zopdovězená otázka"
  }
  else {
    return `${numOfIncorrectlyAnswered.value} špatně zodpovězených otázek`
  }
}

const getDobreHlaska = () => {
  const messages = [
    `No výborně, vy jste rozený manažer!`,
    `Výborně, vy jste rozený psycholog!`,
    `Výborně, vy jste rozený manažerský psycholog!`,
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

const getSpatneHlaska = () => {
  const messages = [
    `${getSpatneOtazek()}? Váš výsledek je opravdu katastrofální. Pokud se nebudete více snažit, tak se budu zlobit!`,
    `${getSpatneOtazek()}? Vy asi nebudete dobrý manažer... Natož student, viďte...`,
    `${getSpatneOtazek()}? Už od prvního dojmu jsem poznal, že na to nemáte...`,
    `${getSpatneOtazek()}? Chybí vám vnitřní motivace...`,
    `${getSpatneOtazek()}? Vy jste během testu myslel jen na konec pracovní doby, viďte...`,
    `${getSpatneOtazek()}? Psychopatů denně člověk potká několik, ale někdo s vašim výsledkem, to je opravdu vzácné...`
  ];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

const goToNextQuestion = () => {
  if (currentQuestionIndex.value + 1 >= allQuestions.value.length) {
    completed.value = true;
    return
  }
  else {
    currentQuestionIndex.value++
    currentQuestion.value = allQuestions.value[currentQuestionIndex.value]
  }
  numOfAnsweredQuestions.value++
}

const handleAnswerChecked = (isCorrect: boolean) => {
  if (isCorrect) {
    numOfCorrectlyAnswered.value++
  } else {
    numOfIncorrectlyAnswered.value++
  }
}

const handleNextQuestion = () => {
  if (currentQuestionIndex.value < allQuestions.value.length) {
    goToNextQuestion()
  }
}

</script>

<template>
  <header class="">
    <nav class="navbar is-primary">
      <div class="has-text-black-bis navbar-brand is-size-5 p-2">
        Psychotest MPL
      </div>
    </nav>
  </header>
  <main class="section pt-2">
    <div class="questionare pb-3">
      <span class="has-text-weight-light">{{ numOfAnsweredQuestions + 1 }} / {{ allQuestions.length }} </span>
      <div v-if="completed">
        <div v-if="numOfIncorrectlyAnswered === 0">
          <p class="has-text-success">{{getDobreHlaska()}}</p>
        </div>
        <div v-else>
          <p class="has-text-danger">{{getSpatneHlaska()}}</p>
        </div>
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
    <span class="has-text-weight-light">Správně zodpovězeny: <span class="has-text-success pl-1 pr-1">{{ numOfCorrectlyAnswered }}</span> | Špatně zodpovězeny: <span class="has-text-danger pl-1 pr-1">{{ numOfIncorrectlyAnswered }}</span></span>
    <div>
      <button class="button mt-3 is-small" @click="resetTest">
      <span class="icon mr-1">
        <i class="fas fa-sync"></i>
      </span>
        Resetovat test
      </button>
    </div>


  </main>
</template>
