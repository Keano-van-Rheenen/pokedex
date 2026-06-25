<script setup>
import { ref, watch, onMounted } from 'vue'
import { getPokemonById } from '@/api/pokeApi'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close'])

const pokemon = ref(null)

async function loadPokemon() {
  pokemon.value = await getPokemonById(props.id)
}

function formatName(name) {
  return name
    .split('-')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ')
}

onMounted(loadPokemon)
watch(() => props.id, loadPokemon)
</script>

<template>
  <div
    v-if="pokemon"
    class="pokemon-detail"
  >
    <div class="mdc-card hero-card">

      <button
        class="mdc-icon-button close-btn"
        @click="emit('close')"
        title="Close"
      >
        ✕
      </button>

      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        class="hero-image"
      >

      <div class="pokemon-id">
        #{{ pokemon.id }}
      </div>

      <h1>
        {{ formatName(pokemon.name) }}
      </h1>

      <div class="types">
        <div
          v-for="type in pokemon.types"
          :key="type.name"
          class="type-chip"
        >
          <img
            :src="type.image"
            :alt="type.name"
          >

          <span>
            {{ formatName(type.name) }}
          </span>
        </div>
      </div>

    </div>

    <div class="mdc-card section-card">
      <div class="section-content">

        <h2>Stats</h2>

        <div
          v-for="stat in pokemon.stats"
          :key="stat.name"
          class="stat-row"
        >
          <span class="stat-name">
            {{ formatName(stat.name) }}
          </span>

          <div class="stat-track">
            <div
              class="stat-fill"
              :style="{
                width: `${Math.min(stat.base / 255 * 100, 100)}%`
              }"
            />
          </div>

          <span class="stat-value">
            {{ stat.base }}
          </span>
        </div>

      </div>
    </div>

    <div class="mdc-card section-card">
      <div class="section-content">

        <h2>Abilities</h2>

        <div class="ability-list">
          <div
            v-for="ability in pokemon.abilities"
            :key="ability.name"
            class="ability"
          >
            <span>
              {{ formatName(ability.name) }}
            </span>

            <span
              v-if="ability.isHidden"
              class="hidden-badge"
            >
              Hidden
            </span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.pokemon-detail {
  box-sizing: border-box;
  min-height: 100%;
  padding: 16px;
  overflow-x: hidden;
}

/* HERO */

.hero-card {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  padding: 32px 24px;
  margin-bottom: 16px;

  border-top: 6px solid #4caf50;

  background:
    linear-gradient(
      180deg,
      rgba(76, 175, 80, .12),
      transparent 240px
    );
}

.close-btn {
  position: absolute;
  left: 12px;
  top: 12px;

  border: none;
  background: transparent;

  cursor: pointer;

  font-size: 24px;
  line-height: 1;
}

.hero-image {
  width: 192px;
  height: 192px;

  image-rendering: pixelated;
}

.pokemon-id {
  margin-top: 8px;
  opacity: .6;
  font-size: .95rem;
}

.hero-card h1 {
  margin: 8px 0 16px;

  text-transform: capitalize;
  font-size: 3rem;
  line-height: 1.1;
}

.types {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.type-chip {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;

  border-radius: 999px;

  background: rgba(255,255,255,.06);
}

.type-chip img {
  height: 24px;
}

/* CARDS */

.section-card {
  margin-bottom: 16px;
}

.section-content {
  padding: 24px;
}

.section-content h2 {
  margin: 0 0 20px;
}

/* STATS */

.stat-row {
  display: grid;
  grid-template-columns: 150px 1fr 50px;

  gap: 12px;
  align-items: center;

  margin-bottom: 8px;
}

.stat-name {
  text-transform: capitalize;
}

.stat-track {
  height: 8px;

  border-radius: 999px;
  overflow: hidden;

  background: rgba(255,255,255,.12);
}

.stat-fill {
  height: 100%;
  background: #4caf50;
}

.stat-value {
  text-align: right;
  font-weight: 600;
}

/* ABILITIES */

.ability-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ability {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;

  border-radius: 12px;

  background: rgba(255,255,255,.05);
}

.hidden-badge {
  padding: 4px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  color: white;
  background: #4caf50;
}

/* MOBILE */

@media (max-width: 700px) {
  .hero-card h1 {
    font-size: 2rem;
  }

  .hero-image {
    width: 160px;
    height: 160px;
  }

  .stat-row {
    grid-template-columns: 90px 1fr 40px;
  }
}
</style>