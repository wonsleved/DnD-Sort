import React, {FC, ReactElement, useEffect, useState} from 'react';
import update from 'immutability-helper';
import IElement from "../models/IElement";
import IItem from "../models/IItem";
import loadList from "../utils/loadList";
import ListItem from "./list-item.component";

import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd'

const List: FC = (): ReactElement => {
    const [list, setList] = useState<IElement[]>([]);

    function sortList(el1: IElement, el2: IElement) {
        return el1.item.index - el2.item.index;
    }

    useEffect(() => {
        loadList()
            .then(loadedList => {
                setList(_ => loadedList.sort(sortList));
            });
    }, []);

    const viewList: React.ReactElement[] =
        list.map<React.ReactElement>(
            (element, index) =>
                renderItem(element.item, index)
        );

    function renderItem(item: IItem, index: number) {
        return (<ListItem
            key={item.index}
            index={index}
            moveItem={moveItem}
            item={item}
            changeActive={changeActive}
        />)
    }

    function changeActive(id: number) {
        setList(list => list.map(el => {
            if (el.item.index === id)
                el.item.active = !el.item.active;
            return el;
        }));
    }

    function moveItem(dragIndex: number, hoverIndex: number) {
        setList(prevItems =>
                update(prevItems, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevItems[dragIndex] as IElement],
                ],
            }),);
    }

    const options = {
        enableMouseEvents: true,
    }

    return (
        <DndProvider backend={TouchBackend} options={options}>
            <div className="list">
                {viewList}
            </div>
        </DndProvider>
    )

};


export default List;