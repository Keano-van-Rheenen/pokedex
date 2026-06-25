<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { getPokemonById, getEvolutionChainById } from '@/api/pokeApi'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close'])

const pokemon = ref(null)
const evolution = ref([])

const favourites = ref(
  JSON.parse(localStorage.getItem('favourites') ?? '[]')
)

const isFavourite = computed(() =>
  favourites.value.includes(props.id)
)

async function loadPokemon() {
  pokemon.value = await getPokemonById(props.id)
  evolution.value = await getEvolutionChainById(props.id)
}

function toggleFavourite() {
  if (isFavourite.value) {
    favourites.value = favourites.value.filter(id => id !== props.id)
  } else {
    favourites.value.push(props.id)
  }

  localStorage.setItem(
    'favourites',
    JSON.stringify(favourites.value)
  )
}

function formatName(name) {
  return name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

onMounted(loadPokemon)
watch(() => props.id, loadPokemon)
</script>

<template>
  <div v-if="pokemon" class="pokemon-detail">

    <div class="hero">
      <img :src="pokemon.image" :alt="pokemon.name" class="hero-image">

      <div class="pokemon-id">
        #{{ pokemon.id }}
      </div>

      <h1>
        {{ formatName(pokemon.name) }}
      </h1>

      <div class="types">
        <img v-for="type in pokemon.types" :key="type.name" :src="type.image" :alt="type.name" class="type-image">
      </div>
    </div>

    <div class="section">
      <h2>Evolution</h2>

      <div v-if="evolution.length" class="evo-chain">
        <div
          v-for="(evo, index) in evolution"
          :key="evo.id"
          class="evo-item"
        >
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`"
            :alt="evo.name"
          >

          <div class="name">
            {{ formatName(evo.name) }}
          </div>

          <div v-if="index < evolution.length - 1" class="arrow">
            →
          </div>
        </div>
      </div>

      <div v-else class="empty">
        No evolution data
      </div>
    </div>

  </div>
</template>

<style scoped>
.pokemon-detail {
  position: relative;
  box-sizing: border-box;

  height: calc(100vh - 112px);

  width: 100%;
  padding: 20px;

  color: #e5e7eb;

  overflow: hidden;
}

.hero {
  text-align: center;
  margin-bottom: 24px;
}

.hero-image {
  width: 140px;
  height: 140px;

  image-rendering: pixelated;
}

.pokemon-id {
  margin-top: 8px;
  color: #9ca3af;
}

.hero h1 {
  margin: 8px 0 12px;

  font-size: 2rem;
  font-weight: 700;

  color: #ffffff;
}

.types {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.type-image {
  height: 24px;
  width: auto;
}

.section {
  margin-top: 24px;
}

.section h2 {
  margin: 0 0 12px;

  font-size: 1.1rem;
  color: #ffffff;
}

.evo-chain {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.evo-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
}

.evo-item img {
  width: 120px;
  height: 120px;
  image-rendering: pixelated;
}

.name {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.arrow {
  font-size: 26px;
  opacity: 0.6;
}

.empty {
  color: #9ca3af;
}

.row {
  display: none;
}

@media (max-width: 600px) {
  .evo-chain {
    flex-direction: column;
    gap: 12px;
  }

  .evo-item {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .evo-item img {
    width: 100px;
    height: 100px;
  }
}
</style>