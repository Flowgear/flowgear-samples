import { useEffect, useState } from "react";
import { SampleServices } from "../services/SampleServices";
import SampleRow from "./SampleRow";
import { SampleType } from "../types/SampleType";

const SampleTable = ({refresh}: {refresh: boolean}) => {

    const [headings, setHeadings] = useState<string[]>([]);
    const [items, setItems] = useState<SampleType[]>([]);

    useEffect(() => {

        const refreshItems = async () => {
            let items = await SampleServices.getItems();
            items.sort((a, b) => new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime());
            
            if (items[0]) {
                let itemHeadings = Object.keys(items[0]);
                setHeadings(itemHeadings);
            }
            setItems(items);
        };

        refreshItems();

    }, [refresh]);

    return (
        <div className="table-wrapper">
            <div className="table-scroll">
                <table className={"table"}>
                    <thead>
                    <tr>
                        {headings.map((val: string, index: number) => {
                            if (val === "OrderTotal") {
                                return <th key={index} className={"text-align-right"}>{val}</th>;
                            }
                            return <th key={index}>{val}</th>;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <SampleRow
                                key={index}
                                item={item}
                                headings={headings}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}

export default SampleTable;