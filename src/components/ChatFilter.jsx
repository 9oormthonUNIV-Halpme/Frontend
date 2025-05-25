import React from 'react';
import styled from 'styled-components';

const ChatFilter = ({ current, setFilter }) => {
  const filters = ['전체', '도움요청', '봉사참여'];

  return (
    <FilterWrapper>
      <FilterContainer>
        {filters.map(f => (
          <FilterButton
            key={f}
            $isActive={current === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </FilterButton>
        ))}
      </FilterContainer>
    </FilterWrapper>
  );
};
export default ChatFilter;


const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;  
  justify-content: flex-start;
  margin: 0;
  padding: 0;    
`;
const FilterContainer = styled.div`
  display: flex;
  height: 62px;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

const FilterButton = styled.button`
  margin-right: 13px;
  padding: 6px 12px;
  height: 30px;
  background-color: ${({ $isActive }) => ($isActive ? '#3EC6B4' : '#F5F5F5')};
  color: ${({ $isActive }) => ($isActive ? 'white' : 'black')};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;
