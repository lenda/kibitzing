<template >
  <div class="ui raised card">
    <div class="content">
      <div class="description">
        <p>{{ content }}</p>
      </div>
    </div>
    <div class="extra content">
      <button class="ui primary button">Reply</button>
      <div class="right floated author">
        <i class="user big icon"></i> {{ user_id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pdf_id', 'content', 'user_id']

}
</script>

<style scoped>

</style>
