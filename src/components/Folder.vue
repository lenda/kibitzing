
<template id='folder'>
    <div class="component tree-item">
        <i class="angle down icon"></i>
        <i class="folder open icon"></i>{{folderName}}


        <app-file v-show="hasFiles" v-for="file in model.files" :key="file.id" :name="file.path"></app-file>
            <folder v-show="hasFolders" v-for="folder in model.folders" :model="folder" :key="folder.id"></folder>
    </div>
</template>

<script>
import Vue from 'vue'
import File from "./File.vue"
    var folder = Vue.component('folder', {
    template: '#folder',
    components: {
        'app-file': File
    },
    props: {
        model: Object
    },
    data: function(){
        return {

        }
    },
    methods: {

    },
    computed: {
        hasFolders: function(){
            return this.model.folders.length;
        },
        hasFiles: function(){
            return this.model.files.length;
        },
        folderName: function(){
            var lastIdx = this.model.path.lastIndexOf('/');
            return this.model.path.slice(lastIdx+1)
        }
    }
})
export default folder
</script>

<style>

</style>
