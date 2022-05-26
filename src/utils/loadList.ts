import IElement from "../models/IElement";
import itemsList from "../data/list.json";

export default async function loadList(): Promise<IElement[]> {
    return Object.entries(itemsList).map((element) => {
        return {
            key: element[0],
            item: {
                index: Number.parseInt(element[1].index),
                name: element[1].name,
                active: JSON.parse(element[1].active)
            }
        }
    });
}