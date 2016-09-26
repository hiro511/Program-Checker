// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
}else{
  alert('The File APIs are not fully supported in this browser.');
}

var clipboard = new Clipboard('.btn');

function escapeSourceCode(code) {
  var targets = ["&", "<", ">" ,'"', "'"];
  var escapes = ["&amp;", "&lt;", "&gt;", "&quot;", "&#39;"];

  for(var i=0; i<targets.length; i++){
    code = code.replace(new RegExp(targets[i], 'g'), escapes[i]);
  }
  return code;
}

function refreshInlineFrame(){
  // var run = document.getElementById('#run-view');
  document.getElementsByTagName('iframe')[0].contentWindow.location.replace("http://ideone.com/");
}

function createCommands(filename){
  var programName = filename.split('.')[0];
  return  '<pre><strong id="commands-copy">gcc -o ' + programName + ' ' +
          filename + ' ; ./' + programName + '</strong></pre>';
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var file = evt.dataTransfer.files[0]; // FileList object.
  reader = new FileReader();
  reader.onload = function (event) {
    var sourceCode = escapeSourceCode(event.target.result);
    document.getElementById('list').innerHTML = sourceCode;
    document.getElementById('filename').innerHTML = '<h4><strong>' + file.name + '</strong></h4>';
    document.getElementById('commands').innerHTML = createCommands(file.name);
  };

  reader.readAsText(file);

  refreshInlineFrame();
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
