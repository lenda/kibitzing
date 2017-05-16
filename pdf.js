window.onload = function(){
var url = 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf';
PDFJS.disableWorker = true;
// The workerSrc property shall be specified.
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
var pageNumberGlobal = 1;
var numberOfPagesGlobal;
var pageRendering = false;
var pageNumPending = null;

function renderCanvas (){
    pageRendering = true;

    PDFJS.getDocument(url).then(function(pdf) {
      // you can now use *pdf* here
    pdf.getPage(pageNumberGlobal).then(function(page) {
        numberOfPagesGlobal = pdf.numPages;
        document.getElementById('page_count').textContent = numberOfPagesGlobal;


    document.getElementById('page_num').innerHTML = pageNumberGlobal;



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
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderCanvas(pageNumPending);
        pageNumPending = null;
      }
    });
});
});
}
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderCanvas(num);
  }
}

renderCanvas();

function onNextPage(){
    console.log("inside onNextPage");
    if(pageNumberGlobal >= numberOfPagesGlobal) return;
    pageNumberGlobal++;
    queueRenderPage();
}

function onPrevPage(){
    console.log("inside onPrevPage")
    if(pageNumberGlobal <= 1) return;
    pageNumberGlobal--;
    queueRenderPage();
}
document.getElementById('next').addEventListener('click', onNextPage);
document.getElementById('prev').addEventListener('click', onPrevPage);

};
