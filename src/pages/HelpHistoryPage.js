import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryList from '../components/HistoryList';

const HelpHistoryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/participation/myapplication') // 실제 요청 API 주소로 바꿔야 함
      .then((res) => {
        const list = res.data.data.map(item => ({
          postId: item.postId,
          title: item.title,
          date: '5월 22일',
          time: '오후 3:00~5:30',
          status: item.status === 'IN_PROGRESS' ? '진행 중' : '완료'
        }));
        setData(list);
      });
  }, []);

  return (
    <div style={{ maxWidth: 360, margin: '0 auto', padding: 16 }}>
      <h2>도움요청 내역</h2>
      <HistoryList data={data} type="help" />
    </div>
  );
};

export default HelpHistoryPage;
