import React, {FC, ReactElement, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import IItem from "../models/IItem";

type PropsType = {
    item: IItem,
    index: number,
    changeActive: (id: number) => void,
    moveItem: (dragIndex: number, hoverIndex: number) => void,
}

interface DragItem {
    index: number
    id: string
    type: string
}

const ListItem: FC<PropsType> = ({item, index, changeActive, moveItem}): ReactElement => {
    const DND_ITEM_TYPE = 'item';

    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
        >({
        accept: DND_ITEM_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            console.log('hover')
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: DND_ITEM_TYPE,
        item: () => {
            return { id: item.index, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref));

    function clickHandler(event: React.MouseEvent) {
        event.preventDefault();
        changeActive(item.index);
    }

    return (
        <div
            ref={ref} data-handler-id={handlerId}
            className={`list__item list-item 
            ${(item.active ? "_active" : "")} 
            ${(isDragging ? "_drag" : "")}
            `}
        >
            <p className="list-item__info">{item.name}</p>
            <button
                onClick={clickHandler}
                className="list-item__button"
            ></button>
        </div>
    )

};


export default ListItem;