<template>
  <div v-if="countryDetails && countryDetails.name">
    <div class="d-flex justify-content-center">
      <img
        :src="`https://flagcdn.com/w320/${countryDetails.alpha2Code.toLowerCase()}.png`"
        alt=""
        class="mb-4"
      />
    </div>
    <h2>{{ countryDetails.name.common }}</h2>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center mb-4"
      >
        <p class="fw-bold">Capital</p>
        <p>{{ countryDetails.capital[0] }}</p>
      </li>
      <li
        class="list-group-item d-flex justify-content-between align-items-center mb-4"
      >
        <p class="fw-bold">Area</p>
        <p>{{ countryDetails.area }}km<sup>2</sup></p>
      </li>
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <p class="fw-bold">Borders:</p>
        <p v-if="countryDetails.borders.length === 0">
          An Island has no borders.
        </p>
        <RouterLink
          v-else
          v-for="(border, index) in countryDetails.borders"
          :key="index"
          :to="`/list/${border}`"
        >
          {{ border }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const countryDetails = ref(null);

const fetchCountryDetails = async () => {
  try {
    let response = await fetch(`https://ih-countries-api.herokuapp.com/countries/${route.params.alpha3Code}`);
    let result = await response.json();
    countryDetails.value = result;
  } catch (error) {
    console.error("Error fetching country details:", error);
  }
};

onMounted(() => {
  fetchCountryDetails();
});
</script>
