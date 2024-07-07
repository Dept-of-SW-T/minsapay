import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-auto-rows: max-content;
  align-items: center;
  justify-content: center;
  gap: 1% 0;
  height: 80%;
  width: 80%;
  background-color: white;
  border-radius: 40px;
  font-family: "TheJamsil";
  margin-bottom: 2vh;
`;

const Title = styled.span`
  font-size: 1.5em;

  font-family: "MaruBuriSemiBold";
  margin-bottom: 3%;
`;

export default function TeamList({ datalist }) {
  return (
    <>
      <Wrapper>
        <Title>부스를 선택하세요</Title>
        {datalist}
      </Wrapper>
    </>
  );
}
