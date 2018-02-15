// change this to true to see test results on the black diamond section.
export const BLACK_DIAMOND = true;

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const UNDO = 'UNDO'
const REDO = 'REDO'


const initialState = {
    currentValue: 0,
    previousValues: [],
    futureValues: []
}

export default function counter(state = initialState,action) {
    switch(action.type) {
        case INCREMENT:
            return Object.assign({},state,{
                currentValue: state.currentValue + action.amount, 
                previousValues: [state.currentValue, ...state.previousValues],
                futureValues: []
            })
        case DECREMENT: 
            return Object.assign({},state,{
                currentValue: state.currentValue - action.amount, 
                previousValues: [state.currentValue, ...state.previousValues],
                futureValues: []
            })
        case UNDO:
            return Object.assign({},state,{
                currentValue: state.previousValues[0], 
                previousValues: state.previousValues.slice(1,state.previousValues.length), 
                futureValues: [state.currentValue, ...state.futureValues]
            })
        case REDO:
            return Object.assign({},state,{
                currentValue: state.futureValues[0], 
                previousValues: [state.currentValue, ...state.previousValues], 
                futureValues:state.futureValues.slice(1,state.futureValues.length)
            })
        default:
            return state;
    }
}

export function undo() {
    return {type: UNDO}
}

export function redo() {
    return {type: REDO}
}

export function increment(amount)  {
    return {
        amount: amount,
        type: INCREMENT
    };
}

export function decrement(amount) {
    return {
        amount: amount,
        type: DECREMENT
    };
}
