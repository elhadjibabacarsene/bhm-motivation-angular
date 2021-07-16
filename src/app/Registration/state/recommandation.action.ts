import {createAction, props} from "@ngrx/store";
import {DemandeDeRecommandation, ResultRecommandation} from "../models/recommandation.model";

export const GET_RECOMMANDATION_ACTION = '[recommandation page] get recommandation';
export const GET_RECOMMANDATION_SUCCESS = '[recommandation page] get recommandation success';
export const UPDATE_RECOMMANDATION_ACTION = '[recommandation page] update recommandation';



export const getRecommandation = createAction(GET_RECOMMANDATION_ACTION,
  props<{demande: DemandeDeRecommandation}>()
);

export const updateRecommandation = createAction(UPDATE_RECOMMANDATION_ACTION,
  props<{recommandation: ResultRecommandation}>()
);

export const getRecommandationSuccess = createAction(
  GET_RECOMMANDATION_SUCCESS,
  props<{recommandation: ResultRecommandation}>()
);
