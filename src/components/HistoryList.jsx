import React from 'react';
import HistoryListItem from './HistoryListItem';

const HistoryList = ({ data, type }) => {
  return (
    <div>
      {data.map(item => (
        <HistoryListItem key={item.postId} item={item} type={type} />
      ))}
    </div>
  );
};

export default HistoryList;
