import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RecommandationState} from "./recommandation.state";

export const RECOMMANDATION_STATE_NAME = 'recommandation';

const getRecommandationState = createFeatureSelector<RecommandationState>(RECOMMANDATION_STATE_NAME)

export const getRecommandationSelector = createSelector(
    getRecommandationState,
    (state: RecommandationState) => state.recommandation
)
