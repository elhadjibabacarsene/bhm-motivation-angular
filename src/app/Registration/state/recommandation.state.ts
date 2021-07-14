import {DemandeDeRecommandation, ResultRecommandation} from "../models/recommandation.model";


export interface RecommandationState{
  recommandation: ResultRecommandation | null
}

export const initialState: RecommandationState = {
  recommandation: null
}
