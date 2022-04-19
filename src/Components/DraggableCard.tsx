import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({toDo, index}:IDragabbleCardProps) {
  console.log(toDo, "has been render")
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

/**
  현재 문제점? : react.js에서 component의 State가 변하면 해당 component의 모든 children은 다시 렌더링 된다.
  하나 움직이면 전부 다 렌더링 되고 있다.
  => react.memo 사용필요하다.
  react.memo : 제발 이 conponent는 렌더링 하지마 라고 말하는 역할 한다. = prop이 변하지 않았다면 DraggableCard를 다시 렌더링 하지 마라
 */