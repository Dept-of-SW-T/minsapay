import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.span``;

export function SearchElement({ searchFunc }) {
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
      <form onSubmit={onSubmit}>
        <input type="text" value={searchVal} onChange={onChange} />
      </form>
    </Wrapper>
  );
}
