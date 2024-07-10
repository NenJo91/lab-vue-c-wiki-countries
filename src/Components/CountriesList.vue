<template>
  <div>
  <h1 class="text-center">Countries List</h1>
  <div class="container" v-if="countries">
    <div class="row">
      <div class="col-sm-4">
        <ul class="list-group py-4">
          <!-- path: "/list/:alpha3Code", -->
          <RouterLink
            :to="`/list/${country.alpha3Code}`"
            v-for="(country, index) in countries"
            :key="index"
          >
            <div class="">
              <li
                class="list-group-item d-flex flex-column justify-content-center align-items-center"
              >
                <img
                  :src="`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`"
                  alt=""
                  class="mb-2 country-flag"
                />
                <p>{{ country.name.common }}</p>
              </li>
            </div>
          </RouterLink>
        </ul>
      </div>
      <div class="col-sm-8"><RouterView /></div>
    </div>
  </div>
</div>
  
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const countries = ref([]);

const fetchCountries = async () => {
  try {
    let response = await fetch("https://ih-countries-api.herokuapp.com/countries");
    let result = await response.json();
    let sortedCountries = result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    console.log(sortedCountries);
    countries.value = sortedCountries;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

onMounted(() => {
  fetchCountries();
});

</script>
