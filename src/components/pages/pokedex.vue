<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { MDCDrawer } from '@material/drawer'

import Pokecard from '../pokemon/pokecard.vue'
import PokeDetail from '../pokemon/pokedetail.vue'
import { getPokemons } from '@/api/pokeApi'

const scrollContainer = ref(null)

const allPokemons = ref([])
const visibleCount = ref(20)

const selectedPokemonId = ref(null)

let detailDrawer

const visiblePokemons = computed(() =>
  allPokemons.value.slice(0, visibleCount.value)
)

function loadMore() {
  if (visibleCount.value >= allPokemons.value.length) return
  visibleCount.value += 20
}

function onScroll() {
  const element = scrollContainer.value
  if (!element) return

  const scrollTop = element.scrollTop
  const clientHeight = element.clientHeight
  const scrollHeight = element.scrollHeight

  if (scrollTop + clientHeight >= scrollHeight - 150) {
    loadMore()
  }
}

function openDetail(id) {
  selectedPokemonId.value = id
  detailDrawer.open = true
}

onMounted(async () => {
  allPokemons.value = await getPokemons()

  scrollContainer.value?.addEventListener('scroll', onScroll)

  detailDrawer = MDCDrawer.attachTo(
    document.querySelector('.pokemon-sheet')
  )
})

onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="pokedex-scroll" ref="scrollContainer">
    <div class="pokedex-grid">
      <Pokecard
        v-for="p in visiblePokemons"
        :key="p.id"
        :id="p.id"
        :name="p.name"
        :src="p.image"
        @select="openDetail(p.id)"
      />
    </div>
  </div>

  <aside class="mdc-drawer mdc-drawer--modal pokemon-sheet">
    <div class="mdc-drawer__content">
      <PokeDetail
        v-if="selectedPokemonId"
        :id="selectedPokemonId"
      />
    </div>
  </aside>

  <div class="mdc-drawer-scrim"></div>
</template>

<style>

.pokedex-scroll {
  height: 100%;
  overflow-y: auto;
}

.pokedex-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.pokemon-sheet {
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;

  width: 100vw !important;
  height: 100vh !important;
  max-width: none !important;
}

.pokemon-sheet .mdc-drawer__content {
  height: 100%;
  overflow-y: auto;
}

@media (max-width: 800px) {
  .pokedex-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>