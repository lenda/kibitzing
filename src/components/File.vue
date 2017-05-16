<template >
    <div class="tree-item" @click="select">
        <i class="file pdf outline icon"></i>{{fileName}}
    </div>
</template>

<script>
export default {
    props: ['path', 'url'],
    computed: {
        fileName: function(){
            var lastIdx = this.path.lastIndexOf('/');
            return this.path.slice(lastIdx+1)
        }
    },
    methods: {
        select: function(){
            console.log('hello', this.url)
            this.$emit('select', this.url)
        }
    }

}
</script>

<style scoped>

</style>
