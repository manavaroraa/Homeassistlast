import { request } from "../utils/api";

export const MeReviews = (id, payload) => {
  return request({
    method: "get",
    baseUrl: "public",
    route: `reviews?uid=${id}&${payload}`,
  });
};

export const ReviewsReceived = (id, payload) => {
  return request({
    method: "get",
    baseUrl: "public",
    route: `reviews?wid=${id}&${payload}`,
  });
};

export const Get = (id) => {
  return request({
    method: "get",
    baseUrl: "api",
    route: `reviews/${id}`,
  });
};

export const Create = (payload) => {
  return request({
    method: "post",
    baseUrl: "api",
    route: `reviews`,
    payload,
  });
};

export const Update = (id, payload) => {
  return request({
    method: "put",
    baseUrl: "api",
    route: `reviews/${id}`,
    payload,
  });
};

export const Delete = (id) => {
  return request({
    method: "delete",
    baseUrl: "api",
    route: `reviews/${id}`,
  });
};
