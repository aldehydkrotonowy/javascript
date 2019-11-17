import handlebars from 'handlebars';
import $ from 'jquery';
import template from './html/404.handlebars';

export default (ctx, next) => {
    let message = "uuups, there is no such page";
    $('#app').html(handlebars.compile(template)({
        message
    }))
}