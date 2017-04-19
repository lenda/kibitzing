const PDFJS = require('pdfjs-dist');
var pdfWorker = require('pdfjs-dist/build/pdf.worker')

var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';

// // Disable workers to avoid yet another cross-origin issue (workers need
// // the URL of the script to be loaded, and dynamically loading a cross-origin
// // script does not work).
// // PDFJS.disableWorker = true;
//
// // The workerSrc property shall be specified.
//
// // Asynchronous download of PDF
// var loadingTask = PDFJS.getDocument(url);
// loadingTask.promise.then(function(pdf) {
//   console.log('PDF loaded');
//
//   // Fetch the first page
//   var pageNumber = 1;
//   pdf.getPage(pageNumber).then(function(page) {
//     console.log('Page loaded');
//
//     var scale = 1.5;
//     var viewport = page.getViewport(scale);
//
//     // Prepare canvas using PDF page dimensions
//     var canvas = document.getElementById('the-canvas');
//     var context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//
//     // Render PDF page into canvas context
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     };
//     var renderTask = page.render(renderContext);
//     renderTask.then(function () {
//       console.log('Page rendered');
//     });
//   });
// }, function (reason) {
//   // PDF loading error
//   console.error(reason);
// });
var fs = require('fs');
var data = new Uint8Array(fs.readFileSync('2013hmda-guide.pdf'));
// var worker = require('webworkerify')("./node_modules/pdfjs-dist/build/pdf.worker");
//
PDFJS.disableWorker = true;
PDFJS.workerSrc = "./node_modules/pdfjs-dist/build/pdf.worker";

PDFJS.getDocument(data).then(function(pdf) {
    console.log("#1");
    pdf.getPage(1).then(function(page) {
        console.log('Number of pages: ' + pdf.numPages);

        var scale = 1.5;
        var viewport = page.getViewport(scale);

        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        console.log("just before page render");
        page.render(renderContext);
    });
});




console.log("working");
