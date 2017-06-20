
<template>
    <div class="component tree-item">
        <i class="angle down icon"></i>
        <i class="folder open icon"></i>{{folderName}}


        <app-file v-show="hasFiles" v-for="file of model.files" :key="file.id" :id="file.id" :path="file.path" :url="file.url" v-on:select="selectPDF($event)"></app-file>
            <folder v-show="hasFolders" v-for="folder of model.folders" :model="folder" :key="folder.id" v-on:selectPDF="selectPDF($event)" @dblclick.native.stop="createSubfolder(folder.path)" v-on:handleFolderCreate="handleFolderCreate"></folder>
    </div>
</template>

<script>
import Vue from 'vue'
import File from "./File.vue"
    var folder = Vue.component('folder', {
    components: {
        'app-file': File
    },
    props: {
        model: Object,

    },
    data: function(){
        return {
        }
    },
    methods: {
        selectPDF(pdf) {
            console.log("folder " + this.folderName +" received ",pdf);
            this.$emit('selectPDF', pdf);
        },
        createSubfolder(parentFolderPath) {
          this.handleFolderCreate(parentFolderPath)

        },
        handleFolderCreate(parentFolderPath){
          console.log('hello from handleFolderCreate', parentFolderPath)
          this.$emit('handleFolderCreate', parentFolderPath);

        }

    },
    computed: {
        hasFolders: function(){
            return this.model.folders
        },
        hasFiles: function(){
            return this.model.files
        },
        folderName: function(){
            if(this.model.path === '/') return '/'
            var lastIdx = this.model.path.lastIndexOf('/');
            return this.model.path.slice(lastIdx+1)
        }
    }
})
export default folder
</script>

<style>

</style>
