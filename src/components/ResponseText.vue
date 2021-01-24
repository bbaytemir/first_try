<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container box">
        <p>{{ result }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ResponseText",
  props: {
    result: String
  },
};
</script>