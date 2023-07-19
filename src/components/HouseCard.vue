<template>
  <section class="row bg-light elevation-5 rounded" data-bs-toggle="collapse" :data-bs-target="`#${houseProp.id}`">
    <div class="col-12 col-md-4 p-0">
      <img class="img-fluid card-img rounded" :src="houseProp.imgUrl" :alt="houseProp.description">
    </div>
    <div class="col-12 col-md-8 p-3">
      <h2>Posted By: {{ houseProp.creator.name }}</h2>
      <h3>${{ houseProp.price }}</h3>
      <div v-if="account.id == houseProp.creatorId" class="d-flex justify-content-end align-items-center">
        <!-- TODO Buttons -->
        <i @click="setActiveHouse()" class="mdi mdi-update fs-5" data-bs-toggle="modal" data-bs-target="#formModal"></i>
        <i @click="removeHouse()" class="mdi mdi-trash-can fs-5 p-3"></i>
      </div>
    </div>
    <div class="col-12">
      <div class="collapse" :id="houseProp.id">
        <section class="row">
          <div class="col-6">
            <p>Number of Bedrooms: {{ houseProp.bedrooms }}</p>
            <p>Number of Bathrooms: {{ houseProp.bathrooms }}</p>
          </div>
          <div class="col-6">
            <h4>Description</h4>
            <p>{{ houseProp.description }}</p>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';
import { House } from '../models/House.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';
/* -------------------------------------------------------------------------- */
export default {
  props: {
    houseProp: { type: House, required: true }
  },
  /* -------------------------------------------------------------------------- */
  setup(props) {
    return {
      account: computed(() => AppState.account),
      /* -------------------------------------------------------------------------- */
      setActiveHouse() {
        housesService.setActiveHouse(props.houseProp)
      },
      async removeHouse() {
        try {
          const isSure = await Pop.confirm('Are you sure you want to delete this house?')
          if (!isSure) {
            return
          }
          await housesService.removeHouse(props.houseProp.id)
        } catch (error) {
          Pop.error(error.message, '[REMOVE HOUSE]')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-img {
  object-fit: cover;
  min-height: 100%;
  max-height: 30vh;
}
</style>