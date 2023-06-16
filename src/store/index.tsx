import { AnyAction, configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

const reducer: any = (
  state: ReturnType<typeof reducers>,
  action: AnyAction
) => {
  return reducers(state, action);
};

const makeStore = (): any => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
  });

  (store as any).sagaTask = sagaMiddleware.run(sagas);

  return store as any;
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
