import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as TicketIcon } from "../assets/ico-01.svg";
import { ReactComponent as ClockIcon } from "../assets/ico-03.svg";
import { ReactComponent as LocationIcon } from "../assets/ico-02.svg";
import RidesList from "../components/RidesList";
import { bookRide } from "../redux/actions";
import { ERRORS, isPinValid, MOBILE_BREAKPOINT } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import DetailsContainer from "../components/shared/DetailsContainer";

const Homepage = ({ history, rides }) => {
  const currentRide = useSelector((state) => state.currentRide);
  const [data, setData] = useState({ pin: "", ride_id: "" });
  const [searchError, setSearchError] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const cachedUserPin = localStorage.getItem("USER_PIN") ?? "";
    setData({ ...data, pin: cachedUserPin });
  }, []);

  const listRef = useRef(null);

  const detailsData = [
    {
      text: "Enter you park ticket #PIN number, then select the desired ride while noting the stated return time",
      Icon: TicketIcon,
    },
    {
      text: "Press 'submit' to confirm and retrieve your access code",
      Icon: LocationIcon,
    },
    {
      text: "When the time comes, use the special FastRider line to cut out a considerable wait time",
      Icon: ClockIcon,
    },
  ];
  const setRideId = (id) => setData({ ...data, ride_id: id });

  const handleError = (text) => {
    setSearchError(text);
    setTimeout(() => {
      setSearchError("");
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRide = rides.find((r) => r.id === data.ride_id);
    const currentHour = new Date().getHours();
    if (currentHour < 9 || currentHour > 19) handleError(ERRORS.PARK_CLOSED);
    else if (!data.pin) handleError(ERRORS.ENTER_PIN);
    else if (!isPinValid(data.pin)) handleError(ERRORS.INVALID_PIN);
    else if (!data.ride_id) handleError(ERRORS.CHOOSE_RIDE);
    else if (selectedRide.remaining_tickets === 0)
      handleError(ERRORS.NO_TICKETS);
    else if (new Date(currentRide?.return_time) > new Date()) {
      handleError(ERRORS.RIDE_ALREADY_BOOKED);
    } else dispatch(bookRide(data, history));
  };

  useEffect(() => {
    if (listRef.current) {
      let observer = new IntersectionObserver(
        (entries) => setIsButtonVisible(entries[0].isIntersecting),
        {
          root: null,
          threshold: 0.05,
        }
      );
      observer.observe(listRef.current);
    }
  }, [listRef.observer]);

  return (
    <InnerContainer>
      <DetailsSection>
        {detailsData.map((item, index) => (
          <DetailsContainer key={index} {...item} />
        ))}
      </DetailsSection>
      <SmallFormError show={searchError}>
        {searchError || "placeholder"}
      </SmallFormError>
      <InputContainer onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setData({ ...data, pin: e.target.value })}
          placeholder="#PIN"
          value={data.pin || "JN-8080-8080-QQ"}
          error={searchError}
        />
        <Button isVisible={isButtonVisible} type="submit">
          Submit
        </Button>
      </InputContainer>

      <RidesList
        _ref={listRef}
        setRideId={setRideId}
        rideId={data.ride_id}
        currentRide={currentRide}
      />
      <Lifter />
    </InnerContainer>
  );
};

export default Homepage;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  align-items: center;
`;

const DetailsSection = styled.section`
  display: flex;
  ${MOBILE_BREAKPOINT} {
    flex-direction: column;
  }
`;

const InputContainer = styled.form`
  width: 100%;
  display: flex;
  height: 50px;
  margin-bottom: 50px;
  padding: 0 6px;
`;

const Input = styled.input`
  flex: 0.75;
  border: ${(props) => (props.error ? "3px solid red" : "")};
  transition: border 0.3s;
  ${MOBILE_BREAKPOINT} {
    flex: 1;
  }
`;

const Button = styled.button`
  flex: 0.25;
  background: gray;
  color: white;
  font-weight: 700;
  border: none;
  background: #4c4c4b;
  cursor: pointer;
  ${MOBILE_BREAKPOINT} {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 1;
    height: 60px;
    font-size: 20px;
    opacity: ${(props) => (props.isVisible ? "1" : "0")};
    transition: 0.3s opacity ease;
  }
`;

const SmallFormError = styled.span`
  color: red;
  font-size: small;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  align-self: flex-start;
`;

const Lifter = styled.div`
  ${MOBILE_BREAKPOINT} {
    margin-top: 30px;
    height: 30px;
  }
`;
