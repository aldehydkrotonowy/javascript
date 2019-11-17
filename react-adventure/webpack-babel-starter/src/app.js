
import './styles/index.scss';

import $ from 'jquery'
import 'bootstrap'
import Navigo from 'navigo'


const router = new Navigo()

router.on('/', () => import('./home').then(module => module.default()));
router.on('/about', () => import('./about').then(module => module.default()));
router.notFound(() => import('./404').then(module => module.default()));
router.resolve();

// if (k === 1){
//   import(/* webpackChunkName: "lodash" */ 'lodash').then((_) => {
//     let a = _.join(['Hello', 'it works']);
//     console.log(a);
//   }).catch(error => 'An error occurred while loading the component');
// }

$(window).on('load', () => {
    // $('#app').html('<h1>We are ready!</h1>')
    $(document).on('click', '[data-path]', (e) => {
      e.preventDefault()
      router.navigate($(e.target).attr('href'))
  })
})

export default func