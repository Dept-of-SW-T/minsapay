import styled from "styled-components";

function splitIntoChunk(arr, chunk) {
  const result = [];
  for (let index = 0; index < arr.length; index += chunk) {
    let tempArray;
    tempArray = arr.slice(index, index + chunk);
    result.push(tempArray);
  }
  return result;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TwoElementDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

export default function CoupleList({ dataList }) {
  const dataCoupled = splitIntoChunk(dataList, 2).map((value) => {
    return (
      <TwoElementDiv>
        {value[0]}
        {value[1]}
      </TwoElementDiv>
    );
  });
  return <Wrapper>{dataCoupled}</Wrapper>;
}
