<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { MDCDrawer } from '@material/drawer'

import Pokecard from '../pokemon/pokecard.vue'
import PokeDetail from '../pokemon/pokedetail.vue'
import MdcTabs from '../mdc-tabs.vue'
import { getPokemons } from '@/api/pokeApi'
import EvolutionChain from '../pokemon/evolution-chain.vue'

const props = defineProps({
  search: {
    type: String,
    default: ''
  }
})

const scrollContainer = ref(null)

const allPokemons = ref([])
const visibleCount = ref(20)

const selectedPokemonId = ref(null)
const activeTab = ref('pokemon')

const favourites = ref(
  JSON.parse(localStorage.getItem('favourites') ?? '[]')
)

let detailDrawer

const favouritePokemons = computed(() =>
  allPokemons.value.filter(p =>
    favourites.value.includes(p.id)
  )
)

const filteredPokemons = computed(() =>
  favouritePokemons.value.filter(p =>
    p.name.toLowerCase().includes(props.search.toLowerCase())
  )
)

const visiblePokemons = computed(() =>
  filteredPokemons.value.slice(0, visibleCount.value)
)

function loadMore() {
  if (visibleCount.value >= filteredPokemons.value.length) return
  visibleCount.value += 20
}

function onScroll() {
  const element = scrollContainer.value
  if (!element) return

  const { scrollTop, clientHeight, scrollHeight } = element

  if (scrollTop + clientHeight >= scrollHeight - 150) {
    loadMore()
  }
}

function openDetail(id) {
  selectedPokemonId.value = id
  activeTab.value = 'pokemon'
  detailDrawer.open = true
}

function closeDetail() {
  selectedPokemonId.value = null
  detailDrawer.open = false
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

    <div v-if="!visiblePokemons.length" class="empty">
      No favourites yet
    </div>
  </div>

  <aside class="mdc-drawer mdc-drawer--modal pokemon-sheet">
    <div class="mdc-drawer__content">

      <MdcTabs v-model="activeTab" />

      <div class="tab-content">
        <PokeDetail
          v-if="activeTab === 'pokemon' && selectedPokemonId"
          :id="selectedPokemonId"
          @close="closeDetail"
        />

        <div v-else-if="activeTab === 'evolutions'" class="evolutions-placeholder">
          <EvolutionChain
            :id="selectedPokemonId"
            @close="closeDetail"
          />
        </div>
      </div>

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

.empty {
  text-align: center;
  padding: 24px;
  color: #9ca3af;
}

.pokemon-sheet {
  top: 64px !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;

  width: 100vw !important;
  height: calc(100vh - 64px) !important;
  max-width: none !important;
}

.pokemon-sheet .mdc-drawer__content {
  height: 100%;
  overflow-y: auto;
}

.tab-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 800px) {
  .pokedex-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .pokemon-sheet {
    top: 56px !important;
    height: calc(100vh - 56px) !important;
  }
}
</style>