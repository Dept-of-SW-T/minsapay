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
const FourElementDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

export default function QuadList({ dataList, redundancyElement }) {
  // datalist를 4개씩 짝찢고 마지막에 보족한 만큼 dummy element를 추가해준다.
  const dataQuaded = splitIntoChunk(dataList, 4).map((value, index) => {
    while (value.length < 4) {
      value.push(redundancyElement);
    }
    return (
      <FourElementDiv key={index}>
        {value[0]}
        {value[1]}
        {value[2]}
        {value[3]}
      </FourElementDiv>
    );
  });
  return <Wrapper>{dataQuaded}</Wrapper>;
}
