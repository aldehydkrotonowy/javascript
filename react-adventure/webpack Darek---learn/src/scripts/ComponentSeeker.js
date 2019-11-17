import NavbarMobile from './components/NavbarMobile';
import NavbarDesktop from './components/NavbarDesktop';
import HeroDesktop from './components/HeroDesktop';
import HeroMobile from './components/HeroMobile';
import Slides from './components/Slides';
import Betslip from './components/Betslip';
import Footer from "./components/Footer";

const components = {
    'NavbarMobile': NavbarMobile,
    'NavbarDesktop': NavbarDesktop,
    'HeroDesktop': HeroDesktop,
    'HeroMobile': HeroMobile,
    'Slides': Slides,
    'Betslip': Betslip,
    'Footer': Footer
};
const componentAttr = 'data-component';

class ComponentSeeker {
    constructor(rootNode, sharedStore) {
        this.seekComponents(rootNode, sharedStore);
    }

    seekComponents(rootNode, sharedStore) {
        Object.keys(components).forEach((componentName) => {
            let componentElements = rootNode.querySelectorAll(`[${componentAttr}="${componentName}"]`);
            componentElements.forEach((element) =>
                new components[componentName](element, sharedStore)
            );
            console.log(`${componentName}: ${componentElements.length}`);
        });
    }
}

export default ComponentSeeker;