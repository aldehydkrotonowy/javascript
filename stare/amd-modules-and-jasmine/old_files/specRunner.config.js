/*Wywala taki oto błąd
Uncaught TypeError: Cannot read property 'getEnv' of undefined
    at specRunner.js:23
    at Object.execCb (require.js:5)
    at b.check (require.js:5)
    at b.<anonymous> (require.js:5)
    at require.js:5
    at require.js:5
    at each (require.js:5)
    at b.emit (require.js:5)
    at b.check (require.js:5)
    at b.enable (require.js:5)
*/
require.config({
    urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: 'src/vendors/jquery3.1.1/jquery-3.1.1.min',
        'jasmine': 'src/vendors/jasmine2.5.2/lib/jasmine-2.5.2/jasmine',
        'jasmine-html': 'src/vendors/jasmine2.5.2/lib/jasmine-2.5.2/jasmine-html',
        spec: 'src/spec/'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});


require(['jquery', 'jasmine-html'], function ($, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 5000;
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('src/spec/notepadSpec');


    $(function () {
        require(specs, function (spec) {
            jasmineEnv.execute();
        });
    });

});