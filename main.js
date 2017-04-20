window.onload = function(){
var url = 'http://s3-us-west-1.amazonaws.com/pdf-dev-learning/2013hmda-guide.pdf';
PDFJS.disableWorker = true;
// The workerSrc property shall be specified.
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
var pageNumberGlobal = 1;
function renderCanvas (){

    PDFJS.getDocument(url).then(function(pdf) {
      // you can now use *pdf* here
    pdf.getPage(pageNumberGlobal).then(function(page) {
        document.getElementById('page_count').textContent = pdf.numPages;


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
    page.render(renderContext);
});
});
}

renderCanvas();

function onNextPage(){
    console.log("inside onNextPage")
    pageNumberGlobal++;
    renderCanvas();
}

function onPrevPage(){
    console.log("inside onPrevPage")
    pageNumberGlobal--;
    renderCanvas();
}
document.getElementById('next').addEventListener('click', onNextPage);
document.getElementById('prev').addEventListener('click', onPrevPage);

};
