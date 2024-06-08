import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-auto-rows: max-content;
  align-items: center;
  justify-content: center;
  gap: 1% 0;
  height: 80%;
  width: 50%;
  background-color: white;
  border-radius: 40px;
  font-family: "BMDOHYEON";
`;

const Title = styled.span`
  font-size: 2em;
  font-family: "BMDOHYEON";
  margin-bottom: 1%;
`;

export default function TeamList({ datalist }) {
  return (
    <>
      <Title>팀 목록</Title>
      <Wrapper>{datalist}</Wrapper>
    </>
  );
}
