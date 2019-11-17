define(['./note'], function notepad(note) {

    var notes = [
        new note('pick up the kids', 'dont forget to pick  up the kids'),
        new note('get milk', 'we need two gallons of milk')
    ];

    var y;
    return {
        noteTitles: function () {
            var val = '';//this value must be initialized
            for (var i = 0; i < notes.length; i++) {
                val += notes[i].title + ' ';
            }
            return val;
        }
    };
});