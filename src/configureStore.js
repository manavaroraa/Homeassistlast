import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, createTypedHooks } from "easy-peasy";
import model from "./models";

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks();

export {
  useStoreActions as useActions,
  useStoreDispatch as useDispatch,
  useStoreState as useStore,
};

const store = createStore(model, {
  compose: composeWithDevTools({ realtime: true, trace: true }),
});

export default store;
