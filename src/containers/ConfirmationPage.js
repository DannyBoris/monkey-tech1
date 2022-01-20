import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../assets/ico-04.svg";
import DetailsContainer from "../components/shared/DetailsContainer";
import { MOBILE_BREAKPOINT } from "../utils";
import ConfirmationRideCard from "../components/ConfirmationRideCard";

const ConfirmationPage = ({ history }) => {
  let currentRide = useSelector((state) => state.currentRide);
  useEffect(() => {
    if (!currentRide) history.push("/");
    else currentRide.access_token = localStorage.getItem("USER_PIN");
  }, []);

  return (
    <Container>
      <DetailsContainer
        Icon={CheckIcon}
        text="Thanks for using the Jungle FastRider ticket system - your access code
        is now ready"
      />
      <ConfirmationRideCard {...currentRide} />
    </Container>
  );
};

export default ConfirmationPage;

const Container = styled.div`
  height: 100vh;
  background: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  ${MOBILE_BREAKPOINT} {
    width: 100%;
  }
`;
