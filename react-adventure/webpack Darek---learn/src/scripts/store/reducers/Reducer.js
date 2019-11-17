import {initialState} from '../InitialState';
import actionTypes from '../Actions/ActionTypes';

const toggleBetslip = (state, action) => {
    return {
        ...state,
        betslip: {
            isToggled: action.state
        }
    };
};

const toggleMenuMobile = (state, action) => {
    return {
        ...state,
        navbarMobile: {
            menuIsOpen: action.state
        }
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_BETSLIP:
            return toggleBetslip(state, action);
        case actionTypes.TOGGLE_MENU_MOBILE:
            return toggleMenuMobile(state, action);
        default:
            return state;
    }
};

export default reducer;