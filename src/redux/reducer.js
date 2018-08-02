import {combineReducers} from 'redux'
import mainReducer, { moduleName as mainModule } from '../ducks/main'

export default combineReducers({
    [mainModule]: mainReducer,
})
