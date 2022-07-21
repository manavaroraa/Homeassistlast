import { thunk, action } from "easy-peasy";
import { getAll, listCategories } from "../services/categories";
import { get } from "lodash";
import history from "../utils/history";

const categories = {
  isLoading: false,
  error: "",
  categories: [],
  categoriesList: [],
  //get all
  getAll: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await getAll(payload);
      action.setModels({ data: response.data, lang: payload });
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Error" });
      action.setLoading({ loading: false });
    }
  }),
  setModels: action((state, payload) => {
    let categories = payload?.data?.results;
    if (categories?.length > 0)
      categories = categories.map((item) => {
        item.name = Reflect.get(item, payload?.lang) || item.name;
        return item;
      });
    state.categories = categories;
  }),
  //end get all

  //list
  list: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await listCategories();
      action.setCategoriesList({ data: response.data, lang: payload });
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Error" });
      action.setLoading({ loading: false });
    }
  }),
  setCategoriesList: action((state, payload) => {
    let categories = payload?.data;
    // console.log(payload.data);

    const setNodeLang = (item) => {
      item.label = Reflect.get(item, payload?.lang) || item.name;
      if (item?.nodes?.length > 0) {
        item.nodes.forEach((node) => setNodeLang(node));
      }
      return item;
    };
    if (categories?.length > 0)
      categories = categories.map((item) => {
        return setNodeLang(item);
      });
    state.categoriesList = categories;
  }),
  //end list

  setLoading: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isLoading = loading;
  }),
  setError: action((state, payload) => {
    const message = get(payload, "message", false);
    state.error = message;
  }),
};

export default categories;
