const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const ITEMREQUEST = 'ITEMREQUEST'
const ITEMSUCCESS = 'ITEMSUCCESS'
const ITEMFAILURE = 'ITEMFAILURE'

const initialState = {
    items: [],
    error: ''
}

const reqItem = () => {
    return {
        type: ITEMREQUEST,
    }
}

const SucItem = items => {
    return {
        type: ITEMSUCCESS,
        payload: items
    }
}

const ErrItem = error => {
    return {
        type: ITEMFAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEMREQUEST: return {
            ...state
        }
        case ITEMSUCCESS: return {
            items: action.payload,
            error: ''
        }
        case ITEMFAILURE: return {
            items: [],
            error: action.payload
        }
    }
}

const fetchItems = () => {
    return function (dispatch) {
        dispatch(reqItem())
        axios.get('https://jsonplaceholder.typicode.com/dusers')
            .then(response => {
                const items = response.data.map(item => item.id)
                dispatch(SucItem(items))
            })
            .catch(error => {
                dispatch(ErrItem(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => (console.log(`store.getItem()`, store.getState())))
store.dispatch(fetchItems())

// const fetchUsers = () => {
//     return function (dispatch) {
//         dispatch(fetchUsersRequest())
//         axios.get('https://jsonplaceholder.typicode.com/dusers')
//             .then(response => {
//                 // response is the array of users
//                 const users = response.data.map(user => user.id)
//                 dispatch(fetchUsersSuccess(users))
//             })
//             .catch(error => {
//                 // error.message is error description
//                 dispatch(fetchUsersFailure(error.message))
//             })
//     }
// }


// const store = createStore(reducer, applyMiddleware(thunkMiddleware))
// store.subscribe(() => { console.log(`store.getState()`, store.getState()) })
// store.dispatch(fetchUsers())



// const redux = require('redux')
// const createStore = redux.createStore
// const applyMiddleware = redux.applyMiddleware
// const thunkMiddleware = require('redux-thunk').default
// const axios = require('axios')

// console.log('found')

// const initialState = {
//     loading: false,
//     users: [],
//     error: ''
// }

// const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
// const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
// const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// const fetchUsersRequest = () => {
//     return {
//         type: FETCH_USERS_REQUEST
//     }
// }

// const fetchUsersSuccess = users => {
//     return {
//         type: FETCH_USERS_SUCCESS,
//         payload: users
//     }
// }

// const fetchUsersFailure = error => {
//     return {
//         type: FETCH_USERS_FAILURE,
//         payload: error
//     }
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FETCH_USERS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case FETCH_USERS_SUCCESS:
//             return {
//                 loading: false,
//                 users: action.payload,
//                 error: ''
//             }
//         case FETCH_USERS_FAILURE:
//             return {
//                 loading: false,
//                 users: [],
//                 error: action.payload
//             }
//     }
// }

// const fetchUsers = () => {
//     return function (dispatch) {
//         dispatch(fetchUsersRequest())
//         axios.get('https://jsonplaceholder.typicode.com/dusers')
//             .then(response => {
//                 // response is the array of users
//                 const users = response.data.map(user => user.id)
//                 dispatch(fetchUsersSuccess(users))
//             })
//             .catch(error => {
//                 // error.message is error description
//                 dispatch(fetchUsersFailure(error.message))
//             })
//     }
// }

// const store = createStore(reducer, applyMiddleware(thunkMiddleware))
// store.subscribe(() => { console.log(`store.getState()`, store.getState()) })
// store.dispatch(fetchUsers())
