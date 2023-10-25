import React from 'react';
import { SampleResponse } from '../types/sampleTypes';

export class SampleRow extends React.Component<
    {
        data: SampleResponse,
        headings: string[]
    },
    {
    }
>
{

    render() {
        if (!this.props.data) {
            return null;
        }

        return (
            <tr>
                {this.props.headings.map((val: string, index: number) => {
                    return this.renderDataValues(val, index)
                })}
            </tr>
        );
    }

    renderDataValues(val: string, index: number) {
        if (val == "OrderTotal") {
            return <td key={index} className={"text-align-right"}>{this.props.data[val]}</td>;
        }
        return <td key={val}>{this.props.data[val]}</td>;
    }
}