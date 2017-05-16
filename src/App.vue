<template>
    <div id="app">

        <nav>
            <div class="ui fixed inverted menu">
                <div class="ui container">
                    <a href="#" class="header item">
                        <i class="comments icon"></i>
                        Kibitzing
                    </a>

                    <a v-if="!loggedIn" href="#" class="item">Register</a>
                    <a v-if="!loggedIn" href="#" class="item">Login</a>
                    <a v-else href="#" class="item">{{ 'Hello, ' + activeUser.name }}</a>
                    <input type="file" v-if="loggedIn" id="file-chooser">
                    <button v-if="loggedIn" @click="uploadPDF">upload PDF</button>

                </div>
            </div>
        </nav>
        <div class="ui stackable two column grid" v-if="!loggedIn" id="login-register-forms">
            <div class="row">
                <div class="column">
                    <form class="ui form" id="login-form">
                        <h4 class="ui dividing header">Login</h4>
                        <div class=" six wide field">
                            <label>Email</label>
                            <input placeholder="Email" type="email">
                        </div>
                        <div class=" six wide field">
                            <label>Password</label>
                            <input placeholder="Password" type="password">
                        </div>
                        <button type="button" name="button">Login</button>
                        <button type="button" name="button">Login With Google Account</button>
                    </form>
                </div>
                <div class="column">
                    <form v-if="!loggedIn" class="ui form" id="register-form">
                        <h4 class="ui header">Don't have an account?</h4>
                        <h4 class="ui dividing header">Register</h4>
                        <div class="six wide field">
                            <label>First name</label>
                            <input placeholder="First Name" type="text">
                        </div>
                        <div class=" six wide field">
                            <label>Last name</label>
                            <input placeholder="Last Name" type="text">
                        </div>
                        <div class=" six wide field">
                            <label>Email</label>
                            <input placeholder="Email" type="email">
                        </div>
                        <div class=" six wide field">
                            <label>Password</label>
                            <input placeholder="Password" type="password">
                        </div>
                        <button type="button" name="button">Register</button>
                        <button type="button" name="button">Register With Google Account</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="main-content" v-if="loggedIn">
            <div class="ui grid">
                <div class="three wide column left-column">
                    <div class="tree">
                        <app-folder :model="rootFolder" v-on:select="viewPDF($event)">



                            </app-folder>
                    </div>
                </div>
                <div class="eight wide column middle-column">
                    <div>
                        <button class="ui left labeled icon button" id="prev" @click="onPrevPage"><i class="left arrow icon"></i>Prev</button>

                        <button class="ui right labeled icon button" id="next" @click="onNextPage"><i class="right arrow icon"></i>Next</button>
                        &nbsp; &nbsp;
                        <span>Page: <span id="page_num" v-if="currentPDF.pageNumber">{{ currentPDF.pageNumber }}</span> / <span id="page_count">{{ currentPDF.numberOfPages }}</span></span>
                    </div>
                    <canvas id="the-canvas" ref="pdfcanvas"></canvas>
                </div>
                <div class="four wide column right-column">
                    <div class="ui one stackable cards">
                        <div class="ui raised card">
                            <div class="content">
                                <div class="description">
                                    <p>This is a fake comment</p>
                                </div>
                            </div>
                            <div class="extra content">
                                <button class="ui primary button">Reply</button>
                                <div class="right floated author">
                                    <i class="user big icon"></i> Matt
                                </div>
                            </div>
                        </div>
                        <div class="ui raised card">

                            <div class="ui form">
                                <textarea placeholder="Type your comment here."></textarea>
                            </div>
                            <div class="extra content">
                                <button class="ui primary button">Submit</button>
                                <div class="right floated author">
                                    <i class="user big icon"></i> You
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
window.Vue = require('vue')
import Folder from "./components/Folder.vue"

export default {
    components: {
        'app-folder': Folder
    },
    data: function(){
        return {
            filename: 'resume',
            rootFolder: {
                id: 1,
                path: '/',
                folders: [
                    {path: '/state law',
                    id: 2,
                    folders: [
                        {path: '/state law/important',
                        id: 4,
                        folders: [
                            {path: '/state law/important/super important',
                            id: 5,
                            folders: [],
                            files: []
                        }
                    ],
                    files: []
                }
            ],
            files: [
                {path: '/state law/HMDA Guidelines',
                id: 1,
                url: 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf'}
            ]
        },
        {path: '/personal',
        id: 3,
        folders: [],
        files: []
    }
],
files: []
},
loggedIn: true,
activeUser: {
    name: 'Ellie',
    pic: null,
    email: null
},
currentPDF: {
    numberOfPages: null,
    pageNumber: null,
    url: 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf',
    pageRendering: false,
    pageNumPending: null,
    pdfName: null
}
}
},
methods: {
    renderFileSystem: function(){

    },
    userLogin: function(){
        this.loggedIn = true;

    },
    userRegister: function(){

    },
    uploadPDF: function(){
        var t = this;
        // uploading to AWS
        var config = new AWS.Config({
            accessKeyId: process.env.AKID, secretAccessKey: process.env.SAK
        });
        AWS.config = config;
        var bucketName = 'pdf-dev-learning'
        var bucket = new AWS.S3({
            params: {
                Bucket: bucketName
            }
        });
        var fileChooser = document.getElementById('file-chooser')
        var file = fileChooser.files[0];
        if(file){
            var params = {
                Key: file.name,
                ContentType: file.type,
                Body: file
            };
            bucket.upload(params, function(err, data){
                if (err) {
                    console.log(err)
                } else if (data) {
                    console.log("Upload Success", data.Location);
                }
            })
        }else{
            console.log('no file to upload...')
            return
        }
        // end of AWS upload

        //now add it to our tree view and create any folders needed and post new folders & files to db
        var newFilesPath = 'personal/resumes/resume.pdf'
        function insertFile (currentFolder, currentPath, userInput){
            if(!userInput) userInput = newFilesPath.split('/')
            if(!currentFolder) currentFolder = t.rootFolder
            if(!currentPath) currentPath = '/'
            if(userInput.length === 1){
                console.log(currentFolder.path, 'Im the path tobe inserted into')
                currentFolder.files.push({path: currentPath + userInput[0], url: 'https://s3-us-west-1.amazonaws.com/pdf-dev-learning/EleanorsResume.pdf'})
                return
            }

            currentPath += userInput.shift() + '/';
                for (let childFolder of currentFolder.folders) {
                    if ((childFolder.path + '/') === currentPath) {
                        currentFolder = childFolder
                        return insertFile(currentFolder, currentPath, userInput)
                    }
                }
                t.createFolder(currentPath, currentFolder)
                for(let childFolder of currentFolder.folders){
                    if(childFolder.path + '/' === currentPath){
                        currentFolder = childFolder
                    }
                }
                return insertFile(currentFolder, currentPath, userInput)
        }
        insertFile()
    },

    renamePDF: function(){

    },

    viewPDF: function(url){
        console.log("hi from the app component");
        var t = this;
        t.currentPDF.pageNumber = 1;

        PDFJS.disableWorker = true;
        // The workerSrc property shall be specified.
        PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        console.log('hey!!!!!' , url)
        t.currentPDF.url = url

        // function renderCanvas (){
        //     t.currentPDF.pageRendering = true;
        //     t.currentPDF.url = 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf'
        //     PDFJS.getDocument(t.currentPDF.url).then(function(pdf) {
        //         // you can now use *pdf* here
        //         pdf.getPage(t.currentPDF.pageNumber).then(function(page) {
        //
        //             t.currentPDF.numberOfPages = pdf.numPages;
        //
        //             var scale = 1.5;
        //             var viewport = page.getViewport(scale);
        //             var canvas = t.$refs.pdfcanvas;
        //             var context = canvas.getContext('2d');
        //             canvas.height = viewport.height;
        //             canvas.width = viewport.width;
        //
        //             var renderContext = {
        //                 canvasContext: context,
        //                 viewport: viewport
        //             };
        //             var renderTask = page.render(renderContext);
        //             renderTask.promise.then(function() {
        //                 t.currentPDF.pageRendering = false;
        //                 if (t.currentPDF.pageNumPending !== null) {
        //                     // New page rendering is pending
        //                     renderCanvas(t.currentPDF.pageNumPending);
        //                     t.currentPDF.pageNumPending = null;
        //                 }
        //             });
        //         });
        //     });
        // }
        // function queueRenderPage(num) {
        //     if (t.currentPDF.pageRendering) {
        //         t.currentPDF.pageNumPending = num;
        //     } else {
        //         t.renderCanvas(num);
        //     }
        // }

        t.renderCanvas();

        // function onNextPage(){
        //     if(t.currentPDF.pageNumber >= t.currentPDF.numberOfPages) return;
        //     t.currentPDF.pageNumber++;
        //     t.queueRenderPage();
        // }
        //
        // function onPrevPage(){
        //     if(t.currentPDF.pageNumber <= 1) return;
        //     t.currentPDF.pageNumber--;
        //     t.queueRenderPage();
        // }
        // document.getElementById('next').addEventListener('click', onNextPage);
        // document.getElementById('prev').addEventListener('click', onPrevPage);
    },
    queueRenderPage: function(num) {
        var t = this;
        if (t.currentPDF.pageRendering) {
            t.currentPDF.pageNumPending = num;
        } else {
            t.renderCanvas(num);
        }
    },
    onNextPage: function(){
        var t = this;
        if(t.currentPDF.pageNumber >= t.currentPDF.numberOfPages) return;
        t.currentPDF.pageNumber++;
        t.queueRenderPage();
    },
    onPrevPage: function(){
        var t = this;
        if(t.currentPDF.pageNumber <= 1) return;
        t.currentPDF.pageNumber--;
        t.queueRenderPage();
    },
    renderCanvas: function(){
        var t = this;
        t.currentPDF.pageRendering = true;
        t.currentPDF.url = 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf'
        PDFJS.getDocument(t.currentPDF.url).then(function(pdf) {
            // you can now use *pdf* here
            pdf.getPage(t.currentPDF.pageNumber).then(function(page) {

                t.currentPDF.numberOfPages = pdf.numPages;

                var scale = 1.5;
                var viewport = page.getViewport(scale);
                var canvas = t.$refs.pdfcanvas;
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function() {
                    t.currentPDF.pageRendering = false;
                    if (t.currentPDF.pageNumPending !== null) {
                        // New page rendering is pending
                        t.renderCanvas(t.currentPDF.pageNumPending);
                        t.currentPDF.pageNumPending = null;
                    }
                });
            });
        });
    },

    createFolder: function(currentPath, currentFolder){
        var t = this;
        //curentpath:  '/personal/resumes'
        //currentFolder: 'personal'
        var newPath = currentPath.slice(0, -1)
        console.log(currentFolder.path, 'im the new folders parent folder');
        console.log(newPath, 'i should the the folders name');
        currentFolder.folders.push({path: newPath, folders: [], files: []})

    },
    renameFolder: function(){

    },
    createComment: function(){

    },
    editComment: function(){

    },
    createThread: function(){

    },



}
}
</script>

<style>
#login-register-forms {
    padding-top: 100px;

}

#login-form {
    padding-left: 20%;

}

#register-form {
    padding-left: 20%;

}
.main-content {
    margin-top: 80px;
}
.left-column{
    margin-left: 10px;
}
.middle-column{
    border: 2px solid black;
    height: 100%;
}
.right-column{

}
#the-canvas{
    width: 100%;
    height: 100%;
}
.sub-folder{
    margin-left: 15px;
}
.pdf{
    margin-left: 50px;
}
.tree-item {
    padding-left: 1em;
}
</style>
