import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryList from '../components/HistoryList';

const VolunteerHistoryPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/participation/myapplication')
      .then((res) => {
        const list = res.data.data.map(item => ({
          postId: item.postId,
          title: item.title,
          date: '5월 22일', // 백엔드에서 날짜 추가되면 수정
          time: '오후 2:00~4:00', // 백엔드에서 시간 추가되면 수정
          status: item.status === 'IN_PROGRESS' ? '진행 중' : '완료'
        }));
        setData(list);
      });
  }, []);

  return (
    <div style={{ maxWidth: 360, margin: '0 auto', padding: 16 }}>
      <h2>봉사참여 내역</h2>
      <HistoryList data={data} type="volunteer" />
    </div>
  );
};

export default VolunteerHistoryPage;
