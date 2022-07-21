import { thunk, action } from "easy-peasy";
import { toaster } from "evergreen-ui";
import { get } from "lodash";
import {
  Create,
  Delete,
  Get,
  MeReviews,
  ReviewsReceived,
  Update,
} from "../services/review";
import history from "../utils/history";

const review = {
  isLoading: false,
  error: "",
  me_reviews: [],
  reviews_received: [],
  me_reviews_ct: 0,
  reviews_received_ct: 0,
  me_reviews_stars: [],
  reviews_received_stars: [],
  review: {},

  meReviews: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await MeReviews(payload.id, payload.queryString);
      action.setMeReviews(response.data);
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Error" });
      action.setLoading({ loading: false });
    }
  }),

  reviewsReceived: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await ReviewsReceived(payload.id, payload.queryString);
      action.setReviewsReceived(response.data);
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Error" });
      action.setLoading({ loading: false });
    }
  }),

  get: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      const response = await Get(payload);
      action.setReview(response.data);
      action.setLoading({ loading: false });
    } catch (error) {
      action.setError({ message: "Error" });
      action.setLoading({ loading: false });
    }
  }),

  create: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      await Create(payload);
      action.setLoading({ loading: false });
      history.push(`/conta?tab=5&subtab=1`);
      toaster.success("Avaliação criada com sucesso", {
        duration: 6,
        id: "success-me",
      });
    } catch (error) {
      action.setError({ message: "Error" });
      if (error?.response?.data?.message.includes("you have not contacted")) {
        toaster.danger(
          "Você não pode escrever uma avaliação para um trabalhador que você não contatou",
          {
            duration: 10,
            id: "error-me",
          }
        );
      } else if (
        error?.response?.data?.message.includes("review of yourself")
      ) {
        toaster.danger("Você não pode escrever uma avaliação sobre si mesmo", {
          duration: 10,
          id: "error-me",
        });
      } else if (error?.response?.data?.message.includes("for same worker")) {
        toaster.danger(
          "Você não pode escrever mais de uma avaliação para o mesmo trabalhador",
          {
            duration: 10,
            id: "error-me",
          }
        );
      } else {
        toaster.danger("Ocorreu um erro, tente novamente mais tarde.", {
          duration: 10,
          id: "error-me",
        });
      }
      action.setLoading({ loading: false });
    }
  }),

  update: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      await Update(payload.id, payload.model);
      action.setLoading({ loading: false });
      history.push(`/conta?tab=5&subtab=1`);
      toaster.success("Avaliação alterada com sucesso", {
        duration: 6,
        id: "success-me",
      });
    } catch (error) {
      action.setError({ message: "Error" });
      if (error?.response?.data?.message.includes("you have not contacted")) {
        toaster.danger(
          "Você não pode escrever uma avaliação para um trabalhador que você não contatou",
          {
            duration: 10,
            id: "error-me",
          }
        );
      } else if (
        error?.response?.data?.message.includes("review of yourself")
      ) {
        toaster.danger("Você não pode escrever uma avaliação sobre si mesmo", {
          duration: 10,
          id: "error-me",
        });
      } else if (error?.response?.data?.message.includes("for same worker")) {
        toaster.danger(
          "Você não pode escrever mais de uma avaliação para o mesmo trabalhador",
          {
            duration: 10,
            id: "error-me",
          }
        );
      } else {
        toaster.danger("Ocorreu um erro, tente novamente mais tarde.", {
          duration: 10,
          id: "error-me",
        });
      }
      action.setLoading({ loading: false });
    }
  }),

  delete: thunk(async (action, payload) => {
    try {
      action.setLoading({ loading: true });
      await Delete(payload);
      action.setLoading({ loading: false });
      window.location.reload();
      toaster.success("Avaliação removida com sucesso", {
        duration: 6,
        id: "success-me",
      });
    } catch (error) {
      action.setError({ message: "Error" });
      if (
        error?.response?.data?.message.includes("You do not have permission")
      ) {
        toaster.danger("Você não tem permissão para remover a avaliação", {
          duration: 10,
          id: "error-me",
        });
      } else {
        toaster.danger("Ocorreu um erro, tente novamente mais tarde.", {
          duration: 10,
          id: "error-me",
        });
      }
      action.setLoading({ loading: false });
    }
  }),

  setMeReviews: action((state, payload) => {
    state.me_reviews = payload.results;
    state.me_reviews_ct = payload.ct;
    state.me_reviews_stars = {
      stars: payload.stars,
      stars_personality: payload.stars_personality,
      stars_ethic: payload.stars_ethic,
      stars_follow_instructions: payload.stars_follow_instructions,
      stars_deadlines: payload.stars_deadlines,
      stars_quality: payload.stars_quality,
      stars_punctuality: payload.stars_punctuality,
    };
  }),
  setReviewsReceived: action((state, payload) => {
    state.reviews_received = payload.results;
    state.reviews_received_ct = payload.ct;
    state.reviews_received_stars = {
      stars: payload.stars,
      stars_personality: payload.stars_personality,
      stars_ethic: payload.stars_ethic,
      stars_follow_instructions: payload.stars_follow_instructions,
      stars_deadlines: payload.stars_deadlines,
      stars_quality: payload.stars_quality,
      stars_punctuality: payload.stars_punctuality,
    };
  }),
  setReview: action((state, payload) => {
    state.review = payload.results;
  }),

  setError: action((state, payload) => {
    const message = get(payload, "message", false);
    state.error = message;
  }),
  setLoading: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isLoading = loading;
  }),
};

export default review;
