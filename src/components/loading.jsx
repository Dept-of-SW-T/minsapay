import { useState } from "react";

export default function returnLoading() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(true);

  // 로딩이 완료되었음을 알리는 함수
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <MainContent onLoadingComplete={handleLoadingComplete} />
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function Loading() {
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}></div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function MainContent({ onLoadingComplete }) {
  // 모든 컴포넌트가 로드된 후에 호출
  useState(() => {
    // 예시: 데이터 로드 시뮬레이션
    setTimeout(() => {
      onLoadingComplete();
    }, 3000);
  }, []);

  return <div>Content loaded!</div>;
}

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  loadingSpinner: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 2s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};
