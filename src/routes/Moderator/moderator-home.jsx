import styled from "styled-components";
import { ModeratorHeader } from "../../components/moderator/moderator-header";
import { moderatorFirebase } from "../../features/moderator-firebase-interaction";
import { useEffect, useState } from "react";
import { UserElement } from "../../components/moderator/user-element";
import { SingleList } from "../../components/moderator/single-list";
import { onSnapshot } from "firebase/firestore";
import { UserInfo } from "../../components/moderator/user-info";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
`;

export default function ModeratorHome() {
  const [userElementList, setUserElementList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const onUserSelect = (id) => {
    console.log(id);
    for (let i = 0; i < moderatorFirebase.usersList.length; i++) {
      if (moderatorFirebase.usersList[i].id === id) {
        setSelectedUser(moderatorFirebase.usersList[i]);
        break;
      }
    }
  };

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await moderatorFirebase.init();
      setUserElementList(
        moderatorFirebase.usersList.map((user) => {
          return <UserElement username={user.username} key={user.username} />;
        }),
      );
    };
    init();
    unsubscribe = onSnapshot(
      moderatorFirebase.usersCollectionRef,
      (usersSnapshot) => {
        moderatorFirebase.usersList = [];
        usersSnapshot.forEach((user) =>
          moderatorFirebase.usersList.push(user.data()),
        );
        setUserElementList(
          moderatorFirebase.usersList.map((user) => {
            return (
              <UserElement
                userName={user.username}
                balance={user.balance}
                key={user.id}
                id={user.id}
                onUserSelect={onUserSelect}
              />
            );
          }),
        );
      },
    );

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  console.log(userElementList);

  return (
    <Wrapper>
      <ModeratorHeader />
      <BodyDiv>
        <SingleList dataList={userElementList} />
        {selectedUser === null ? null : (
          <UserInfo selectedUser={selectedUser} />
        )}
      </BodyDiv>
    </Wrapper>
  );
}
