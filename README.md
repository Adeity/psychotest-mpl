# Psychotest MPL

A web-based quiz application for managerial and psychological knowledge, built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/). The app presents randomized multiple-choice questions and tracks user progress and results.

## Features

- Randomized order of questions and options for each session
- Progress and results saved in local storage
- Immediate feedback on answers
- Reset and retake functionality
- Responsive UI using [Bulma](https://bulma.io/) CSS framework

## Project Structure

- `src/App.vue` – Main application logic and quiz flow
- `src/components/Question.vue` – Question display and answer handling
- `src/assets/questions.json` – Question data
- `src/utilities/shuffle.ts` – Utility for shuffling arrays
- `src/assets/main.css` – Custom styles

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

## License

MIT

---
Questions are stored in [src/assets/questions.json](src/assets/questions.json). Main logic is in [src/App.vue](src/App.vue) and [src/components/Question.vue](src/components/Question.vue).