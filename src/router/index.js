// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import CountriesList from "../Components/CountriesList.vue";
import CountriesDetails from "../Components/CountriesDetails.vue";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: CountriesList
  },
  {
    path: '/list/:alpha3Code',
    name: 'CountriesDetails',
    component: CountriesDetails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;