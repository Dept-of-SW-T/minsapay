import styled from "styled-components";
import { ModeratorHeader } from "../../components/moderator/moderator-header";
import { moderatorFirebase } from "../../features/moderator-firebase-interaction";
import { useEffect, useState } from "react";
import { UserElement } from "../../components/moderator/user-element";
import { SingleList } from "../../components/moderator/single-list";
import { onSnapshot, doc } from "firebase/firestore";
import { UserInfo } from "../../components/moderator/user-info";
import { SearchElement } from "../../components/moderator/search-element";

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
  align-items: start;
  width: 100vw;
`;

// const ButtonsWrapper = styled.div`
//   display: grid
// `;

export default function ModeratorHome() {
  const [userElementList, setUserElementList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [idFilter, setIdFilter] = useState(null);

  const onUserSelect = (id) => {
    setSelectedUser(
      moderatorFirebase.usersList[moderatorFirebase.usersIndex[id]],
    );
  };

  const contains = (str1, str2) => {
    for (let i = 0; i < str1.length; i++) {
      if (i >= str2.length) return true;
      if (str1.charAt(i) != str2.charAt(i)) return false;
    }
    return true;
  };

  const changeUserElementList = () => {
    const tempList = [];
    for (let i = 0; i < moderatorFirebase.usersList.length; i++) {
      if (
        idFilter !== null &&
        !contains(moderatorFirebase.usersList[i].id, idFilter.toString())
      )
        continue;
      tempList.push(moderatorFirebase.usersList[i]);
    }

    setUserElementList(
      tempList.map((user) => {
        return (
          <UserElement
            userName={user.data().username}
            balance={user.data().balance}
            key={user.id}
            id={user.id}
            onUserSelect={onUserSelect}
          />
        );
      }),
    );
  };

  useEffect(changeUserElementList, [idFilter]);

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await moderatorFirebase.init();
      setUserElementList(
        moderatorFirebase.usersList.map((user) => {
          return (
            <UserElement
              username={user.data().username}
              key={user.data().username}
            />
          );
        }),
      );
    };
    init();
    unsubscribe = onSnapshot(
      moderatorFirebase.usersCollectionRef,
      (usersSnapshot) => {
        moderatorFirebase.usersList = [];
        usersSnapshot.forEach((user) => {
          moderatorFirebase.usersList.push(user);
          moderatorFirebase.usersIndex[user.id] =
            moderatorFirebase.usersList.length - 1;
        });
        for (let i = 0; i < moderatorFirebase.usersList.length; i++) {
          moderatorFirebase.usersRef[moderatorFirebase.usersList[i].id] = doc(
            moderatorFirebase.usersCollectionRef,
            moderatorFirebase.usersList[i].id,
          );
        }
        changeUserElementList();
      },
    );

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <ModeratorHeader />
      <SearchElement searchFunc={setIdFilter} />
      <BodyDiv>
        <SingleList dataList={userElementList} />
        {selectedUser === null ? null : <UserInfo userId={selectedUser.id} />}
      </BodyDiv>
    </Wrapper>
  );
}
