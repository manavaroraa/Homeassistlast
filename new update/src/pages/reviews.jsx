import React, { useState, useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useActions, useStore } from "../configureStore";
import queryString from "query-string";
import List from "../components/Review/List";
import ReactPaginate from "react-paginate";
import LanguageContext from "../providers/languageProvider";

const ReviewsAccount = (props) => {
  const history = useHistory();

  const user = useStore((state) => state.user.profile);
  const received = useStore((state) => state.review.reviews_received);
  const my = useStore((state) => state.review.me_reviews);
  const received_ct = useStore((state) => state.review.reviews_received_ct);
  const my_ct = useStore((state) => state.review.me_reviews_ct);
  const received_starts = useStore(
    (state) => state.review.reviews_received_stars
  );
  const my_stars = useStore((state) => state.review.me_reviews_stars);
  const meList = useActions((state) => state.review.meReviews);
  const receivedList = useActions((state) => state.review.reviewsReceived);

  const query = queryString.parse(props.location.search);
  const queryOffset = parseInt(query.start) || "";
  const queryPageNumber = parseInt(query.pageNumber) || "";
  const querySubTab = parseInt(query.subtab);

  const [offset, setOffset] = useState(parseInt(queryOffset) || 0);
  const [pageNumber, setPageNumber] = useState(parseInt(queryPageNumber) || 0);
  const [subTab, setSubTab] = useState(querySubTab || 1);

  const loading = useStore((state) => state.review.isLoading);
  const PER_PAGE = 5;

  const [qs, setQs] = useState(`limit=${PER_PAGE}`);

  const { lang } = useContext(LanguageContext);

  const handleSubTab = (subtab) => {
    setSubTab(subtab);
    setQs(`limit=${PER_PAGE}`);
  };

  const handlePageClick = (selected) => {
    const offset = Math.ceil(selected * PER_PAGE);
    const pageNumber = offset / PER_PAGE;

    setOffset(offset);
    setPageNumber(pageNumber);
    setQs(`limit=${PER_PAGE}&start=${offset}&pageNumber=${pageNumber}`);

    return;
  };

  useEffect(() => {
    if (subTab == 1) {
      meList({ id: user.id, queryString: qs });
    } else {
      receivedList({ id: user.id, queryString: qs });
    }

    history.replace({
      pathname: "/conta",
      search: `?tab=${props.tab}&subtab=${subTab}&${qs}`,
      state: { some: "state" },
    });
  }, [subTab, qs]);

  const changeComponent = (subTab) => {
    switch (subTab) {
      case 1:
        return (
          <>
            <List stars={my_stars} data={my} isMy={true} />
            {my_ct > PER_PAGE && (
              <div id="react-paginate">
                {Math.ceil(my_ct / PER_PAGE) > 1 && (
                  <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Próximo"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(my_ct / PER_PAGE)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    forcePage={pageNumber}
                    onPageChange={({ selected }) => handlePageClick(selected)}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                )}
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <List stars={received_starts} data={received} />
            {received_ct > PER_PAGE && (
              <div id="react-paginate">
                {Math.ceil(received_ct / PER_PAGE) > 1 && (
                  <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Próximo"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(received_ct / PER_PAGE)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    forcePage={pageNumber}
                    onPageChange={({ selected }) => handlePageClick(selected)}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                )}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <Constainer>
      <Box>
        <BoxLinks>
          <MyLink
            onClick={() => handleSubTab(1)}
            className={subTab === 1 ? "active" : "not-active"}
          >
            <span>{lang?.reviews?.title1}</span>
          </MyLink>
          <MyLink
            onClick={() => handleSubTab(2)}
            className={subTab === 2 ? "active" : "not-active"}
          >
            <span>{lang?.reviews?.title2}</span>
          </MyLink>
        </BoxLinks>
      </Box>
      <BoxContent>
        {!loading && <Box>{changeComponent(subTab)}</Box>}
      </BoxContent>
    </Constainer>
  );
};

export default withRouter(ReviewsAccount);

const Constainer = styled(Box)`
  padding: 0rem 1rem 1rem 1rem;
  border-radius: 0.3rem;
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    width: 300px;
    overflow: auto;
  }
  @media (max-width: ${(props) => props.theme.queries.i5}) {
    width: 250px;
  }
`;

const BoxLinks = styled(Box)`
  padding: 0;
  height: 50px;
  display: flex;

  .active {
    background-color: #f4f5f7;
  }
`;

const MyLink = styled(Box)`
  border: 1px solid #e4e7eb;
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 600;
  padding: 0 1rem;
  cursor: pointer;
  transition: 0.3s;

  :hover,
  :focus {
    background-color: #f4f5f7;
  }
`;

const BoxContent = styled(Box)`
  align-items: center;
  padding: 1rem 0;
`;
