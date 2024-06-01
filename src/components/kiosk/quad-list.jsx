import styled from "styled-components";

/* function splitIntoChunk(arr, chunk) {
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
`; */

// 바닥에서 얘 쫌 띄워봐
const Wrapper = styled.div`
  // 자세한 거 고치기
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 0 auto;
  @media only screen and (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-auto-rows: max-content;
  /* grid-template-rows: auto 1fr; */
  gap: 2vw 1vw;
  align-items: start;

  /* overflow: scroll; */
  //-ms-overflow-style: none; /* IE and Edge */
  //scrollbar-width: none; /* Firefox */
  //&::-webkit-scrollbar {
  //  display: none; /* Chrome, Safari, Opera*/
  //}
`;

export default function QuadList({ dataList }) {
  /*   // datalist를 4개씩 짝찢고 마지막에 보족한 만큼 dummy element를 추가해준다.
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
  return <Wrapper>{dataQuaded}</Wrapper>; */
  return <Wrapper>{dataList}</Wrapper>;
}
