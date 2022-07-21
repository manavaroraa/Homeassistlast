import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Edit from "../components/Review/Edit";
import queryString from "query-string";
import { useActions, useStore } from "../configureStore";

const RegisterRatings = () => {
  const query = queryString.parse(window.location.search);
  const worker_id = parseInt(query?.wid) || 0;
  const is_plataform_review = query?.ipr;
  const review_id = parseInt(query?.rid) || 0;

  const get = useActions((action) => action.review.get);
  const review = useStore((state) => state.review.review);

  useEffect(() => {
    if (review_id) get(review_id);
  }, [review_id]);

  return (
    <Container>
      <Edit
        model={review}
        isPlataformReview={!!is_plataform_review}
        workerId={worker_id}
      />
    </Container>
  );
};

export default RegisterRatings;

const Container = styled(Box)`
  max-width: ${(props) => props.theme.queries.xl};
  margin: 5rem auto;
  @media (max-width: ${(props) => props.theme.queries.xl}) {
    padding: 0 1rem;
  }
`;
