import styled from "styled-components";

import device from "../utils/breakPoints";

export const StyledContainer = styled.div`
  position: relative;
  margin: 2em auto;
  width: 95%;
  @media ${device.laptop} {
    width: 70%;
  }
`;
export const StyledCalenderBox = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.gray};
  border-top: none;
  display: flex;
  & > div {
    margin-top: 0;
    flex-basis: 14.28%;
    border-right: 1px solid ${(props) => props.theme.gray};

    &:last-child {
      border-right: none;
    }
  }
`;

export const StyledDayBox = styled.div`
  width: 100%;
  min-height: 100px;
  margin: 0px;
  overflow-y: auto;
  border-bottom: 1px solid ${(props) => props.theme.gray};
  font-size: 16px;
  color: ${(props) => (props.isMuted ? props.theme.gray : "#000")};
  &:last-child {
    border-bottom: none;
  }

  & > p {
    padding: 2px 8px;
  }

  @media ${device.laptop} {
    height: 10vh;
    font-size: 1.2vw;
  }

  @media ${device.desktop} {
    height: 10vh;
    font-size: 1.4vw;
  }
`;

export const StyledTitleBox = styled.div`
  background-color: ${(props) => props.theme.blue};
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const StyledCalendarTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  color: #fff;
  background-color: ${(props) => props.theme.deepGray};
  width: 100%;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.gray};
  border-bottom: none;
`;

export const StyledIconButton = styled.button`
  background-color: transparent;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  &:hover {
    border-color: white;
  }

  &:not(active) {
    border: 1px solid transparent;
  }
`;

export const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : "fit-content")};
  background-color: ${(props) => props.theme.deepBlue};
  transition: background-color 500ms;
  color: #fff;
  padding: 8px;
  font-weight: 500;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.blue};
  }
`;

export const StyledBox = styled.div`
  width: ${(props) => (props.width ? props.width : "auto")};
  display: ${(props) => (props.display ? props.display : "block")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};

  //margin
  margin: ${(props) =>
    props.margin || props.m ? props.margin || props.m : "0"}px;
  margin-top: ${(props) => (props.mt ? props.mt : "0")}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : "0")}px;
  margin-right: ${(props) => (props.mr ? props.mr : "0")}px;
  margin-left: ${(props) => (props.ml ? props.ml : "0")}px;

  //padding
  padding: ${(props) =>
    props.padding || props.p ? props.padding || props.p : "0"}px;
  padding-top: ${(props) => (props.pt ? props.pt : "0")}px;
  padding-bottom: ${(props) => (props.pb ? props.pb : "0")}px;
  padding-right: ${(props) => (props.pr ? props.pr : "0")}px;
  padding-left: ${(props) => (props.pl ? props.pl : "0")}px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.gray};
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  &:focus,
  &:active {
    border: 2px solid ${(props) => props.theme.blue};
  }
  @media ${device.laptop} {
    font-size: 1.4vw;
  }
`;

export const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 16px;

  @media ${device.laptop} {
    font-size: 1.1vw;
  }
`;

export const StyledEvent = styled.div`
  background-color: ${(props) => props.theme.deepBlue};
  padding: 2px;
  border-radius: 3px;
  width: 100%;
  color: #fff;
  cursor: pointer;
  margin-bottom: 2px;
`;
