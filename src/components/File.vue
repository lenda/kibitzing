<template >
    <div class="tree-item">
        <i class="file pdf outline icon"></i>{{fileName}}
    </div>
</template>

<script>
export default {
    props: ['name'],
    computed: {
        fileName: function(){
            var lastIdx = this.name.lastIndexOf('/');
            return this.name.slice(lastIdx+1)
        }
    }

}
</script>

<style scoped>

</style>
