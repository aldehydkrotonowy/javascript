import $ from 'jquery';
import handlebars from 'handlebars';
import template from './html/about.handlebars'

export default (ctx, next) => {
    let user = 'Norbert'
    $('#app').html(handlebars.compile(template)({
        user,
    }))
}