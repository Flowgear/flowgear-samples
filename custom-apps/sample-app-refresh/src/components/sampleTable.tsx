import React from 'react';
import { SampleRow } from './sampleRow';
import { SampleResponse } from '../types/sampleTypes';

export class SampleTable extends React.Component<
    {
        headings: string[]
        tableData: SampleResponse[],
    },
    {
        
    }
>
{

    render() {
        if (!this.props.tableData) {
            return null;
        }

        if (this.props.tableData.length == 0) {
            return (
                <div className="header-text" style={{ paddingTop: "80px" }}>{"No data returned."}</div>
            );
        }
        return (
            <div className="table-wrapper">
                <div className="header-text">{"Sample Orders"}</div>
                <div className="table-scroll">
                    <table className={"table"}>
                        <thead>
                            {this.renderHeadings()}
                        </thead>
                        <tbody>
                            {this.props.tableData.map((row, rowIndex) => {
                                return <SampleRow key={rowIndex} data={row} headings={this.props.headings} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderHeadings() {
        return (<tr>
            {this.props.headings.map((val: string, index: number) => {
                if (val == "OrderTotal") {
                    return <th key={index} className={"text-align-right"}>{val}</th>;
                }
                return <th key={index}>{val}</th>;
            })}
        </tr>);
    }

    
}