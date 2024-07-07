import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  display: flex;
`;

const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1.2em;
  /* width: 23.5%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
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
      <form onSubmit={onSubmit}>
        <input type="text" value={searchVal} onChange={onChange} />
      </form>
    </Wrapper>
  );
}
