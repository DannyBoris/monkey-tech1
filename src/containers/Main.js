import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import styled from "styled-components";
import { fetchRides } from "../redux/actions";
import { MOBILE_BREAKPOINT } from "../utils";
import ConfirmationPage from "./ConfirmationPage";
import Homepage from "./Homepage";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRides());
  }, []);


  return (
    <Container>
      <Title>The Jungle FastRider Service</Title>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/:id" exact component={ConfirmationPage} />
      </Switch>
    </Container>
  );
};

export default withRouter(Main);

const Title = styled.h2`
  color: white;
  margin-block: 60px;
  align-self: center;
`;

const Container = styled.div`
  background-color: #232323;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${MOBILE_BREAKPOINT} {
    padding: 0 16px;
  }
`;
