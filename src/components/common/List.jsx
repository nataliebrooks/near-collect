import * as React from "react";
import styled, { keyframes } from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`;

const gradientAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const LoadingRoot = styled.div`
  animation: ${gradientAnimation} 2s linear infinite;
  background: linear-gradient(45deg, #298fee, #11c958, #a120bb, #d6612a);
  background-size: 600% 600%;
  color: #fff;
  padding: 8px;
`;

export function Loading() {
  return <LoadingRoot>Loading...</LoadingRoot>;
}

function List({ loadData, renderListItem }) {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [error, setError] = React.useState();

  async function loadMore() {
    setLoading(true);
    try {
      const { data, hasNextPage: newHasNextPage } = await loadData(
        items.length
      );
      setItems((current) => [...current, ...data]);
      setHasNextPage(newHasNextPage);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <div className="overflow-auto" ref={rootRef}>
      <ul className="list-none">
        {items.map((item) => (
          <li key={item.key}>
            { renderListItem(item) }
          </li>
        ))}
        {hasNextPage && (
          <ListItem ref={infiniteRef}>
            <Loading />
          </ListItem>
        )}
      </ul>
    </div>
  );
}

export default List;
