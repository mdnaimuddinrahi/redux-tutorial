
const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE = 'BUY_ICE'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIce() {
    return {
        type: BUY_ICE,
        info: '2nd redux action'
    }
}

// (previousState, action) => newState 

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceState = {
    numofIce: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1,
        }
        default: return state
    }
}


const iceReducer = (state = initialIceState, action) => {
    switch (action.type) {
        case BUY_ICE: return {
            ...state,
            numofIce: state.numofIce + 3
        }
        default: return state
    }
}


const rootReducer = combineReducers({
    cake: cakeReducer,
    ice: iceReducer
})


const store = createStore(rootReducer, applyMiddleware(logger))
console.log(`Initial State`, store.getState())
const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyIce())
store.dispatch(buyCake())
unsubscribe()
