import React from 'react';
import { SampleType } from "../types/SampleType";

interface SampleTableRowProps {
    item: SampleType;
    headings: string[];
}

const SampleTableRow = (props: SampleTableRowProps) => {

    return (
        <tr>
            {props.headings.map((val: string, index: number) => {
                if (val === "OrderTotal") {
                    return <td key={index} className={"text-align-right"}>{props.item[val]}</td>;
                }
                return <td key={index}>{props.item[val]}</td>
            })}
    </tr>
    )
};

export default SampleTableRow;