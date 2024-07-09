import { useState } from "react";
import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  width: 60%; // 크기 줄이기
  border: 2px solid ${BORDER_GRAY};
  border-radius: 15px;
  padding: 0.3rem;
  margin-top: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 2.5rem; // 고정된 높이 추가
`;

const Text = styled.span`
  font-family: "TheJamsil";
  font-size: 1em; // 글자 크기 줄이기
  padding: 0 10px;
  background-color: white;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 2px solid ${BORDER_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%; // Wrapper와 같은 높이로 설정
`;

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%; // Wrapper와 같은 높이로 설정
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.3rem; // 패딩 줄이기
  font-size: 1em; // 글자 크기 줄이기
  border: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  outline: none;
  box-sizing: border-box;
  height: 100%; // Wrapper와 같은 높이로 설정
`;

export function SearchElement({ searchFunc, inputLabel }) {
  const [searchVal, setSearchVal] = useState("");

  const onChange = (event) => {
    setSearchVal(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchFunc(searchVal);
  };

  return (
    <Wrapper>
      <Text>{inputLabel}</Text>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput type="text" value={searchVal} onChange={onChange} />
      </StyledForm>
    </Wrapper>
  );
}
