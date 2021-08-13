import {createAction, props} from "@ngrx/store";
import {SubscribeModel} from "../../models/subscribe.model";

export const TO_SUBSCRIBE = '[subscribe page] to_subscribe';



export const toSubscribe = createAction(TO_SUBSCRIBE,
  props<{subscribe: SubscribeModel}>()
);
