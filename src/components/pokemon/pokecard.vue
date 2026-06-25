<script setup>
defineProps({
    src: String,
    name: String,
    id: Number,
    detail: String
})

defineEmits(['select'])
</script>

<template>
  <div class="mdc-card pokemon-card" @click="$emit('select')">
    <img class="pokemon-card__image" :src="src" :alt="name" />

    <div class="pokemon-card__content">
      <span class="pokemon-card__id">#{{ id }}</span>
      <h2 class="pokemon-card__name">{{ name }}</h2>
    </div>
  </div>
</template>

<style>
.pokemon-card {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.pokemon-card__image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    background: #f5f5f5;
    display: block;
    padding: 0.75rem;
    box-sizing: border-box;
}

.pokemon-card__content {
    color: white;
    padding: 0.75rem;
    text-align: center;
}

.pokemon-card__id {
    display: block;
    color: #757575;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

.pokemon-card__name {
    margin: 0;
    font-size: clamp(0.875rem, 2vw, 1.25rem);
    font-weight: 500;

    /* Prevent long names from breaking layout */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>