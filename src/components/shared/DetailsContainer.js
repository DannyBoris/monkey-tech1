import React from "react";
import styled from "styled-components";
import { MOBILE_BREAKPOINT } from "../../utils";

const DetailsContainer = ({ Icon, text }) => (
  <DetailsWrapper>
    <IconWrapper>
      <Icon />
    </IconWrapper>
    <TextWrapper>{text}</TextWrapper>
  </DetailsWrapper>
);

export default DetailsContainer;

const IconWrapper = styled.div`
  border-radius: 50%;
  background: #373737;
  width: fit-content;
  padding: 7px 10px;
`;

const TextWrapper = styled.p`
  text-align: center;
  color: #656565;
  font-weight: 600;
  font-size: 18px;
  width: 75%;
  ${MOBILE_BREAKPOINT} {
    width: 350px;
  }
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
