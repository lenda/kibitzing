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
        </div>
      </div>
    </nav>

    <div ref="mymodal" class="ui modal">
      <div class="header">Header</div>
      <div class="content">
        <input type="file" id="file-chooser">
        <p>Enter the path for the new PDF</p>
        <input type="text" v-model="PDFLaunchpad.filePath" >
        <button @click="uploadPDF">Upload</button>
      </div>
    </div>

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
          <div v-if="foldersLoaded" class="tree">
            <app-folder :model="rootFolder" v-on:selectPDF="viewPDF($event)">
            </app-folder>

          </div>
          <div v-else class="">
            <img src="./assets/loading.png" alt="load" class="load">
          </div>
          <br>
          <button v-if="loggedIn" @click="openModal">upload PDF</button>
        </div>
        <div class="eight wide column middle-column">
          <div>
            <button class="ui left labeled icon button" id="prev" @click="onPrevPage"><i class="left arrow icon"></i>Prev</button>

            <button class="ui right labeled icon button" id="next" @click="onNextPage"><i class="right arrow icon"></i>Next</button>
            &nbsp; &nbsp;
            <span>Page: <span id="page_num" v-if="currentPDF.pageNumber">{{ currentPDF.pageNumber }}</span> / <span id="page_count">{{ currentPDF.numberOfPages }}</span></span>
          </div>
          <div ref="canvasContainer">
            <canvas id="the-canvas" ref="pdfcanvas"></canvas>
            <div class="textLayer" ref="textlayerdiv"></div>
          </div>
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
import { TextLayerBuilder } from 'pdfjs-dist/lib/web/text_layer_builder'

export default {
  created: function(){
    this.loadFileSystem()
  },

  components: {
    'app-folder': Folder
  },

  data: function(){
    return {
      foldersLoaded: false,
      PDFLaunchpad: {
        fileName: '',
        filePath: '',
        fileUrl: ''
      },
      rootFolder: {},
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
    loadFileSystem: function(){
      //ajax call to populate data
      this.$http.get('http://localhost:8000/api/folders/').then(function(folders){

        this.$http.get('http://localhost:8000/api/pdfs').then(function(pdfs){
          var fileSystem = {
            path: '/',
            id: 1,
            files: {},
            folders: {}
          }

          for (var folder of folders.body) {
            if(folder.path.length === 1){
              continue;
            }
            var folderPathArr = folder.path.split('/').slice(1)
            var folderName = folderPathArr[folderPathArr.length - 1]
            var depthLvl = folderPathArr.length
            if(depthLvl === 1){
              fileSystem.folders[folderName] = {
                path: folder.path,
                folders: {},
                files: {},
                id: folder.id
              };
            } else {
              var curFolder = fileSystem;
              for(var i = 0; i < folderPathArr.length; i++) {
                var cur = folderPathArr[i]
                if(curFolder.folders[cur]){
                  curFolder = curFolder.folders[cur]
                } else {
                  curFolder.folders[cur] = {
                    path: folder.path,
                    folders: {},
                    files: {},
                    id: folder.id
                  };
                  curFolder = curFolder.folders[cur]
                }
              }
            }

          }
          for (var pdf of pdfs.body) {
            if(pdf.path)
            var filePathArr = pdf.path.split('/').slice(1)
            var depthLvl = filePathArr.length
            var fileName = filePathArr[depthLvl - 1]
            var curFolder = fileSystem;
            if(depthLvl === 1) {
              curFolder.files[fileName] = pdf;
            }else {
              for (var i = 0; i < filePathArr.length - 1; i++) {
                var cur = filePathArr[i]
                if(curFolder.folders[cur]){
                  curFolder = curFolder.folders[cur]
                }
              }
              curFolder.files[fileName] = pdf;
            }
          }
          this.rootFolder = fileSystem;
          this.foldersLoaded = true;
        })
      })
    },

    userLogin: function(){
      this.loggedIn = true;

    },
    userRegister: function(){

    },
    uploadPDF: function(){
      const t = this;
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
          Body: file,
          ACL: 'public-read'
        };
        bucket.upload(params, function(err, data){
          if (err) {
            console.log(err)
          } else if (data) {
            console.log("Upload Success", data.Location);
            t.PDFLaunchpad.fileUrl = data.Location;
            var newFilesPath = t.PDFLaunchpad.filePath
            t.PDFLaunchpad.fileName = newFilesPath.slice(newFilesPath.lastIndexOf('/') + 1)
            var newRoot = Object.assign({}, t.rootFolder)
            t.insertFile(null, null, null, newRoot)
            t.rootFolder = newRoot
            t.loadFileSystem()
            t.closeModal()
          }
        })
      }else{
        console.log('no file to upload...')
        return
      }
    },

    insertFile: function (){
      this.$http.post('http://localhost:8000/api/pdfs', {
        path: this.PDFLaunchpad.filePath,
        url: this.PDFLaunchpad.fileUrl
      }).then(function(uploaded){
      })
    },

    renamePDF: function(){

    },

    viewPDF: function(url){
      console.log("hi from the app component");
      const t = this;
      t.currentPDF.pageNumber = 1;
      PDFJS.disableWorker = true;
      PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
      t.currentPDF.url = url
      t.renderCanvas();

    },
    queueRenderPage: function(num) {
      const t = this;
      if (t.currentPDF.pageRendering) {
        t.currentPDF.pageNumPending = num;
      } else {
        t.renderCanvas(num);
      }
    },
    onNextPage: function(){
      const t = this;
      if(t.currentPDF.pageNumber >= t.currentPDF.numberOfPages) return;
      t.currentPDF.pageNumber++;
      t.queueRenderPage();
    },
    onPrevPage: function(){
      const t = this;
      if(t.currentPDF.pageNumber <= 1) return;
      t.currentPDF.pageNumber--;
      t.queueRenderPage();
    },
    renderCanvas: function(){
      const t = this;
      t.currentPDF.pageRendering = true;
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
          // most likely won't work since $refs are virtual dom - you need the actual dom
          var canvasOffset = $('#the-canvas').offset();
          console.log('the canvas offset is ',canvasOffset)


          var textLayerDiv = t.$refs.textlayerdiv;
          textLayerDiv.height = viewport.height;
          textLayerDiv.width = viewport.width;
          $('.textLayer').offset({top: canvasOffset.top, left: canvasOffset.left})

          page.getTextContent().then(function(textContent) {
            console.log(textContent, "im the textContent");
            var textLayer =     new TextLayerBuilder({textLayerDiv: textLayerDiv, pageIndex: t.currentPDF.pageNumber - 1, viewport: viewport});
            textLayer.setTextContent(textContent);
            var renderContext = {
              canvasContext: context,
              viewport: viewport,
              textLayer: textLayer
            };
            textLayer.render()
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
              t.currentPDF.pageRendering = false;
              if (t.currentPDF.pageNumPending !== null) {
                // New page rendering is pending
                t.renderCanvas(t.currentPDF.pageNumPending);
                t.currentPDF.pageNumPending = null;
              }
            })
          });
        });
      });
    },

    createFolder: function(currentPath, currentFolder){
      const t = this;

      var newPath = currentPath.slice(0, -1)
      var folderName = newPath.slice(newPath.lastIndexOf('/') + 1)
      currentFolder.folders[folderName] = {path: newPath, folders: {}, files: {}};

    },
    renameFolder: function(){

    },
    getOffset: function (elt) {
      var rect = elt.getBoundingClientRect(), bodyElt = document.body;

      return {
        top: rect.top + bodyElt .scrollTop,
        left: rect.left + bodyElt .scrollLeft
      }
    },
    setOffset: function (elt, top, left) {
        elt.top = top;
        elt.npleft = left
    },

    createComment: function(){

    },
    editComment: function(){

    },
    createThread: function(){

    },

    openModal: function(){
      const t = this;
      t.modalOpen = true;
      t.$refs.mymodal.setAttribute('class', 'ui modal active')
      t.PDFLaunchpad.filePath = '/'
    },

    closeModal: function(){
      const t = this;
      t.modalOpen = false;
      t.$refs.mymodal.setAttribute('class', 'ui modal')
    }
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
.load {
  height: 100px;
  width: 100px;
  animation: rotate 2s infinite;
  -webkit-animation: rotate 2s infinite;
}
/* Chrome, Safari, Opera */
@-webkit-keyframes rotate {
  50% {-webkit-transform: rotate(360deg);}
}

/* Standard syntax */
@keyframes rotate {
  50% {transform: rotate(360deg);}
}

/*divs will show up! */
::selection { background:rgba(0,0,255,0.3); }
::-moz-selection { background:rgba(0,0,255,0.3); }

.textLayer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    color: #000;
    font-family: sans-serif;
    overflow: hidden;
}

.textLayer > div {
    color: transparent;
    position: absolute;
    line-height: 1;
    white-space: pre;
    cursor: text;
}

.textLayer .highlight {
    margin: -1px;
    padding: 1px;

    background-color: rgba(180, 0, 170, 0.2);
    border-radius: 4px;
}

.textLayer .highlight.begin {
    border-radius: 4px 0px 0px 4px;
}

.textLayer .highlight.end {
    border-radius: 0px 4px 4px 0px;
}

.textLayer .highlight.middle {
    border-radius: 0px;
}

.textLayer .highlight.selected {
    background-color: rgba(0, 100, 0, 0.2);
}

</style>
