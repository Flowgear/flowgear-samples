import React from 'react';
import { Flowgear } from './flowgearSdk';
import { Utility } from '../utility';

const google = window.google;

export class TimeChart extends React.Component<
    {
        key?: string,
        timeProperty: string,
        series: { [index: string]: string },
        title: string,
        data: Array<any>
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

        google.charts.load('current', { 'packages': ['corechart', 'line'] });
        google.charts.setOnLoadCallback(() => {

            var hashTable = {};
            var timeProperty = saveThis.props.timeProperty;

            var seriesNames = [];

            saveThis.props.data.forEach(element => {
                var timestamp = element[timeProperty];

                if (!hashTable[timestamp]) {
                    hashTable[timestamp] = {};
                }

                Object.keys(saveThis.props.series).forEach(seriesName => {

                    
                    if (seriesNames.indexOf(seriesName) == -1) {
                        seriesNames.push(seriesName);
                    }

                    hashTable[timestamp][seriesName] = parseFloat(element[saveThis.props.series[seriesName]]);

                });

            });

            var arrayTable = new Array<any>();

            // put the series names in row 1
            arrayTable.push(["Timestamp"].concat(seriesNames));

            // load in the rest of the data as a set of rows
            Object.keys(hashTable).forEach(timestamp => {

                var cells = [timestamp];

                seriesNames.forEach(seriesName => { cells.push(hashTable[timestamp][seriesName]) });

                arrayTable.push(cells);
            });

            var options: google.visualization.LineChartOptions = {
                legend: {
                    position: "bottom",
                    textStyle: {
                        fontSize: 14
                    }
                },
                lineWidth: 3,
                colors: Utility.getFgColours(),
                theme: "dark",
                hAxis: {
                    slantedText: true,
                    showTextEvery: 10
                },
                vAxis: {
                    baseline: 0
                },
                chartArea: {
                    top: 20,
                    bottom: 100,
                    left: 50,
                    right: 0,
                    height: "100%",
                    width: "100%"
                },
                backgroundColor: "transparent"
            };

            var dataTable = google.visualization.arrayToDataTable(arrayTable);

            // charts crash the browser when there are too many
            var excluded = 0;
            while (dataTable.getNumberOfColumns() > this.MAX_CONCURRENT_LINES + 1) {
                dataTable.removeColumn(dataTable.getNumberOfColumns() - 1);
                excluded++;
            }

            if (excluded > 0) {
                Flowgear.Sdk.setAlert("Only showing first 20 lines,", Flowgear.Sdk.AlertMessageTypes.Warning, Flowgear.Sdk.AlertDismissOptions.Auto);
            }
            var chart = new google.visualization.LineChart(this.chartRef.current);

            chart.draw(dataTable, options);

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