<template >
    <div class="tree-item" @click="updateCurrentPDF">
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
        updateCurrentPDF: function(){
            console.log('hello', this.url)
            this.$emit('updateCurrentPDF', this.url)
        }
    }

}
</script>

<style scoped>

</style>
