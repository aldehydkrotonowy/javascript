// Action Createors exercise

let nextIndex = 0;

export const addTodo = text => ({
    type: ADD_TODO,
    id: nextIndex++,
    text
})

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id: id    
})

export const setVisibilityFilter = filter => ({
    type: SET_VISIBILITY_FILTER,
    filter
})

export const visibilityFilters = {
    SHOW_ALL: SHOW_ALL,
    SHOW_COMPLETED: SHOW_COMPLETED,
    SHOW_ACTIVE: SHOW_ACTIVE
}



// REDUCERS : TODO

const todo = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    type: action.type,
                    completed: false
                }
            ]
        case 'TOGGLE_TODO':
            return state.map( todo => {
                (todo.id === action.id) ? {...todo, completed: !todo.completed} : {todo}
            })
        default:
            return state
    }
}

// REDUCERS : FILTERS

const visibilityFilter = (state = visibilityFilters.SHOW_ALL, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state

    }
} 