<script setup>
const props = defineProps({
  mapelList: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <div>
      <!-- Button trigger modal -->
      <i
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        class="bi bi-menu-button-fill"
      ></i>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Pilih Pelajaran
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="list-group">
            <router-link
              v-for="(item, index) in mapelList"
              :key="index"
              class="list-group-item list-group-item-action"
              :to="`/${item.path}`"
            >
              {{ item.mapel }}
            </router-link>
          </div>

          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
