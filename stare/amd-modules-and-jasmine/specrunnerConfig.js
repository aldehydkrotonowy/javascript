// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: './', 
  // paths: maps ids with paths (no extension)
  paths: {
      'jasmine': ['src/vendors/jasmine2.5.2/lib/jasmine-2.5.2/jasmine'],
      'jasmine-html': ['src/vendors/jasmine2.5.2/lib/jasmine-2.5.2/jasmine-html'],
      'jasmine-boot': ['src/vendors/jasmine2.5.2/lib/jasmine-2.5.2/boot']
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});
var specs = [];

specs.push('src/spec/testJasmineSpec');
specs.push('src/spec/notepadSpec');

require(['jasmine-boot'], function () {
  require(specs, function(){
    //trigger Jasmine
    window.onload();//Jasmine hooks into this event to initialise its engine.
  })
});