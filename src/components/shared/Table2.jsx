import React, { useState, useEffect  } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';


function InfiniteListWithVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div
      // This where we set our scrollable root component.
      ref={rootRef}
    >
    <ul>
      {items.map(item => <li className="list-group-item" key={item.key} >List Item {listItem}</li>)}
    </ul>
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {(loading || hasNextPage) && (
          <ListItem ref={sentryRef}>
            <Loading />
          </ListItem>
        )}
    </div>
  );
}



const Table2 = () => {
  const [listItems, setListItems] = useState(Array.from(Array(30).keys(), n => n + 1));
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function fetchMoreListItems() {
    setTimeout(() => {
      setListItems(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
      setIsFetching(false);
    }, 2000);
  }

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }
  
  return (
    <>
      <ul className="list-group mb-2">
        {listItems.map(listItem => <li className="list-group-item" key={listItem} >List Item {listItem}</li>)}
      </ul>
      {isFetching && 'Fetching more list items...'}
    </>
  );
};

export default Table2;

