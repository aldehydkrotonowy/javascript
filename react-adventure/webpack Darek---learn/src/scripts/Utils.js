class Utils {

    constructor() {
    }

    updateState(state, newState) {
        state.set(this, {
            ...state.get(this),
            ...newState
        });
    }

    j2is(el, style) {
        const sJson = JSON.stringify(style);
        const inlineStyle = sJson
            .replace(/([{}"])/g, '')
            .replace(/,/g, ';')
            .replace(/[A-Z]/g, (match) => {
                return match.toLowerCase() !== 'x' &&
                match.toLowerCase() !== 'y' ?
                    '-' + match.toLowerCase() : match;
            });
        el.style.cssText = inlineStyle;
    }

    viewport() {
        let e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }

}

export default Utils;