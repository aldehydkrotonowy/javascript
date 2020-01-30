import $ from 'jquery'
import handlebars from 'handlebars'
import template from './html/home.handlebars'
import testP from './html/testPartial.handlebars';

handlebars.registerPartial('partialTemplate',testP);


export default (ctx, next) => {
    let user = 'Jonh'
    $('#app').html(handlebars.compile(template)({
        user,
    }))
}