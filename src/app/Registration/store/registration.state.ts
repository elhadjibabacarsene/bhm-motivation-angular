import {RecommandationState} from "../state/recommandation.state";
import {recommandationReducer} from "../state/recommandation.reducer";


export interface RegistrationState{
  recommandation: RecommandationState
}

export const registrationReducer = {
  recommandation: recommandationReducer
}
