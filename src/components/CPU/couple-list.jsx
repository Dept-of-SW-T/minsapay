import styled from "styled-components";

// function splitIntoChunk(arr, chunk) {
//   // 주어진 길이를 chunk 단위로 자르고 마지막에 나머지 넣기
//   const result = [];
//   for (let index = 0; index < arr.length; index += chunk) {
//     let tempArray;
//     tempArray = arr.slice(index, index + chunk);
//     result.push(tempArray);
//   }
//   return result;
// }

const Wrapper = styled.div`
  width: 96vw;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-auto-rows: max-content;
  /* grid-template-rows: auto 1fr; */
  gap: 2vw 1vw;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  align-items: start;
`;
// const TwoElementDiv = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 13px;
// `;

export default function CoupleList({ dataList }) {
  // dataList를 두 개찍 짝지어서 화면에 나열하는 list
  // const dataCoupled = splitIntoChunk(dataList, 2).map((value, index) => {
  //   return (
  //     <TwoElementDiv key={index}>
  //       {value[0]}
  //       {value[1]}
  //     </TwoElementDiv>
  //   );
  // });
  return <Wrapper>{dataList}</Wrapper>;
}
