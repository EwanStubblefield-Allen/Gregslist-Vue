<template>
  <div class="container-fluid">
    <section class="row">
      <div id="house" class="col-12 p-4 d-flex">
        <h1>Houses</h1>
        <button @click="setForm()" class="btn btn-info ms-3" type="button" data-bs-toggle="modal" data-bs-target="#formModal" aria-expanded="false" aria-controls="houseCollapse">
          House Form
        </button>
      </div>
    </section>

    <section class="row">
      <div v-for="house in houses" :key="house.id" class="col-10 m-auto my-3">
        <HouseCard :houseProp="house" />
      </div>
    </section>
  </div>

  <ModalComponent>
    <template #header>
      House Form
    </template>
    <template #body>
      <HouseForm />
    </template>
  </ModalComponent>
</template>

<script>
import HouseCard from '../components/HouseCard.vue';
import HouseForm from '../components/HouseForm.vue';
import ModalComponent from '../components/ModalComponent.vue';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js'

export default {
  setup() {
    onMounted(() => {
      logger.log('[HOUSE PAGE MOUNTED]')
      getHouses()
    })
    async function getHouses() {
      try {
        await housesService.getHouses()
      } catch (error) {
        Pop.error(error.message, '[GETTING HOUSES]')
      }
    }
    /* -------------------------------------------------------------------------- */
    return {
      houses: computed(() => AppState.houses),
      /* -------------------------------------------------------------------------- */
      setForm() {
        AppState.activeHouse = {}
      }
    };
  },
  components: { HouseCard, HouseForm, ModalComponent }
}
</script>

<style lang="scss" scoped></style>