import { Record } from 'immutable'


export const ReducerRecord = Record({
    types: [ 'Rain'],
    currentType: 'Rain',
    running: false,
    backgroundColor: '#000',
    color: '#fff'
})


export const moduleName = 'main'

export const CHANGE_TYPE = `${moduleName}/CHANGE_TYPE`
export const STOP_RUNNING = `${moduleName}/STOP_RUNNING`
export const START_RUNNING = `${moduleName}/START_RUNNING`
export const CHANGE_BACKGROUND_COLOR = `${moduleName}/CHANGE_BACKGROUND_COLOR`
export const CHANGE_COLOR = `${moduleName}/CHANGE_COLOR`

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch(type) {
        case CHANGE_TYPE:
            return state
                .set('currentType', payload.type)
        case STOP_RUNNING:
            return state
                .set('running', false)
        case START_RUNNING:
            return state
                .set('running', true)
        case CHANGE_BACKGROUND_COLOR:
            return state
                .set('backgroundColor', payload.color)
        case CHANGE_COLOR:
            return state
                .set('color', payload.color)
        default:
            return state
    }
}


export function changeColor (color) {
    return {
        type: CHANGE_COLOR,
        payload: { color }
    }
}

export function changeBackgroundColor (color) {
    return {
        type: CHANGE_BACKGROUND_COLOR,
        payload: { color }
    }
}

export function stop () {
    return {
        type: STOP_RUNNING
    }
}

export function start() {
    return {
        type: START_RUNNING
    }
}

export function changeType (type) {
    return {
        type: CHANGE_TYPE,
        payload: { type }
    }
}
