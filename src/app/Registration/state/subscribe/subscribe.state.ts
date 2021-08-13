import {SubscribeModel} from "../../models/subscribe.model";

export interface SubscribeState{
  subscribe: SubscribeModel | null
}

export const initialState: SubscribeState = {
  subscribe: null
}
