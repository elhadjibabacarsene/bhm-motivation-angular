import {Action, createReducer, on} from "@ngrx/store";
import {initialState, RecommandationState} from "./recommandation.state";
import {getRecommandationSuccess} from "./recommandation.action";


// @ts-ignore
const _recommandationReducer = createReducer(initialState, on(getRecommandationSuccess, (state, action) => {
  return action.recommandation
}))

export function recommandationReducer(state: any, action: Action){
    return _recommandationReducer(state, action)
}
