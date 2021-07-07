import React from 'react';
import { Flowgear } from './flowgearSdk';
import { Utility } from '../utility';

const google = window.google;

export class DonutChart extends React.Component<
    {
        key?: string,
        values: { [index: string]: number },
        title: string,
    },
    {

    }
    >

{

    private chartRef = React.createRef<HTMLDivElement>();

    MAX_CONCURRENT_LINES = 20;

    componentDidMount() {

        this.initChart();

    }

    initChart() {

        var saveThis = this;

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {

            var table = new google.visualization.DataTable();
            table.addColumn("string");
            table.addColumn("number");

            var hadRows = false;

            Object.keys(saveThis.props.values).map(key => {
                var value = saveThis.props.values[key];

                if ((!key) || (!value)) {
                    return;
                }

                table.addRow([key, value]);
                hadRows = true;
            });

            if (!hadRows) {
                table.addRow(["No data", 1]);
            }

            var options: google.visualization.PieChartOptions = {
                legend: { position: 'bottom' },
                pieHole: 0.6,
                colors: hadRows ? Utility.getFgColours() : ["#eeeeee"],
                chartArea: {
                    width: "100%"
                },
                pieSliceTextStyle: {
                    // label doesn't look good on donut charts
                    opacity: 0
                },
                backgroundColor: "transparent",
            };

            var chart = new google.visualization.PieChart(this.chartRef.current);

            chart.draw(table, options);

        });

    }



    render() {

        return (
            <div style={{ width: "100%" }}>
                <div style={{ textAlign: "center" }}>{this.props.title}</div>
                <div style={{ width: "100%" }} ref={this.chartRef} />
            </div>
        );

    }
}