import actionTypes from './ActionTypes';

export const toggleBetslip = (state) => {
    return {
        type: actionTypes.TOGGLE_BETSLIP,
        state
    };
};

export const toggleMenuMobile = (state) => {
    return {
        type: actionTypes.TOGGLE_MENU_MOBILE,
        state
    };
};