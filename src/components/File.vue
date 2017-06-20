<template >
    <div class="tree-item" @click="select">
        <i class="file pdf outline icon"></i>{{fileName}}
    </div>
</template>

<script>
export default {
    props: ['path', 'url', 'id'],
    computed: {
        fileName: function(){
            var lastIdx = this.path.lastIndexOf('/');
            return this.path.slice(lastIdx+1)
        }
    },
    methods: {
        select: function(){
            console.log('hello from the file component', this.url)
            console.log('I am the file id:', this.id);
            this.$emit('select', {url: this.url, id: this.id, path: this.path})
        }
    }

}
</script>

<style scoped>

</style>
