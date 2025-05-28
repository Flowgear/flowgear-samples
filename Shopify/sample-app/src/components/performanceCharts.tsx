import React from 'react';
import { Flowgear } from './flowgearSdk';
import { TimeChart } from './timeChart';
import { DonutChart } from './donutChart';
import { Keys } from '../types/keys';
import { KeyValueGroupReport } from '../types/keyValueGroupReport';
import { Utility } from '../utility';

export class PerformanceCharts extends React.Component<
    {
        pod: number,
        siteId: string,
        timeSecs: number
    },
    {
        perfKeyFields: string,
        perfChartData: any[],
    }
    >
{

    constructor(props) {
        super(props);

        this.state = {

            perfKeyFields: Keys.ENG_SITEID,
            perfChartData: null,
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (Utility.isDifferent(this.props, prevProps)) {
            this.handleRefresh();
        }
    }

    render() {

        if (!this.state.perfChartData) {
            return null;
        }

        return (
            <div>
                <div className="big-text">{"Performance"}</div>
                <div>
                    <div className="chart-block">
                        <TimeChart
                            timeProperty={Keys.GEN_SNAPSHOTTIME}
                            series={{
                                "All": Keys.ENG_ACTIVETASKS,
                            }}
                            title={"Active Workflows"}
                            data={this.state.perfChartData} />
                    </div>

                    <div className="chart-block">
                        <TimeChart
                            timeProperty={Keys.GEN_SNAPSHOTTIME}
                            series={{
                                "API": Keys.ENG_ACTIVETASKS_API,
                                "Always On": Keys.ENG_ACTIVETASKS_ALWAYSON,
                                "Other": Keys.ENG_ACTIVETASKS_OTHER,

                            }}
                            title={"Active Workflows by Mode"}
                            data={this.state.perfChartData} />
                    </div>

                    <div className="chart-block">
                        <TimeChart
                            timeProperty={Keys.GEN_SNAPSHOTTIME}
                            series={{
                                "Workflows": Keys.ENG_TOPWORKFLOWSTART,
                                "Sub-Workflows": Keys.ENG_SUBWORKFLOWSTART,
                            }}
                            title={"Workflow Starts"}
                            data={this.state.perfChartData} />
                    </div>

                    <div className="chart-block">
                        <TimeChart
                            timeProperty={Keys.GEN_SNAPSHOTTIME}
                            series={{
                                "Total": Keys.ENG_NODEINVOKESTART,
                                "Errors": Keys.ENG_NODEINVOKEEXCEPTION
                            }}
                            title={"Node Invokes"}
                            data={this.state.perfChartData} />
                    </div>
                </div>
            </div>
        );
    }


    handleRefresh() {


        if (this.props.timeSecs == 0) {
            this.setState({
                perfChartData: null
            } as any);
            return;
        }

        var endDate = new Date();
        var startDate = new Date();
        startDate.setSeconds(startDate.getSeconds() - this.props.timeSecs);

        this.handleGetPerfData(startDate, endDate);


    }

    async handleGetPerfData(startDate: Date, endDate: Date) {

        var timeResSecs: string | number = 14400;

        if (this.props.timeSecs <= 3600) {
            // up to 1 hour, use a 1 minute resolution
            timeResSecs = 60
        } else if (this.props.timeSecs <= 14400) {
            // up to 4 hours, use a 5 minute resolution
            timeResSecs = 300;
        } else if (this.props.timeSecs <= 86400) {
            // up to 1 day, use a 15 minute resolution
            timeResSecs = 900;
        } else {
            // more than 1 day, use a 4 hour resolution
            timeResSecs = 14400;
        }

        var urlTemplate = "https://api{0}.flowgear.net/sites/{1}/performance/?startDate={2}&endDate={3}&keyFields={4}&timeResSecs={5}";

        var url = Utility.formatString(
            urlTemplate,
            [
                this.props.pod,
                this.props.siteId,
                Utility.formatUtcDate(startDate, "yyyy-MM-dd hh:mm"),
                Utility.formatUtcDate(endDate, "yyyy-MM-dd hh:mm"),
                this.state.perfKeyFields,
                timeResSecs
            ]);


        var perfChartData: any[] = (await Flowgear.Sdk.invoke(url)).response;

        this.prepareChartData(perfChartData);

        var saveThis = this;

        if (perfChartData.length == 0) {
            perfChartData = this.generateDummyPerfChartData();
        }

        this.setState(
            {
                perfChartData: null
            },
            () => {
                saveThis.setState({
                    perfChartData: perfChartData
                })
            });

    }

    prepareChartData(chartData: Array<any>) {

        for (var i = 0; i < chartData.length; i++) {
            var dateTime = chartData[i][Keys.GEN_SNAPSHOTTIME];

            // if you're gonna put this back, make sure it looks ok
            if (this.props.timeSecs <= 86400) {
                // if we're looking at less than 24 hrs, format hh:mm
                chartData[i][Keys.GEN_SNAPSHOTTIME] = Utility.formatDate(new Date(chartData[i][Keys.GEN_SNAPSHOTTIME]), "hh:mm");
            } else {
                chartData[i][Keys.GEN_SNAPSHOTTIME] = Utility.formatDate(new Date(chartData[i][Keys.GEN_SNAPSHOTTIME]), "dd/MM hh:mm");
            }

            // other invoke types is the difference between total tasks and api + always on tasks
            chartData[i][Keys.CLIENTSIDE_ACTIVETASKS_OTHER] = chartData[i][Keys.ENG_ACTIVETASKS] - (chartData[i][Keys.ENG_ACTIVETASKS_API] + chartData[i][Keys.ENG_ACTIVETASKS_ALWAYSON]);

            // implement the series name property. this is a composite of multiple properties but must be bound from a single property
            var siteId: string = chartData[i][Keys.ENG_SITEID];

        }
    }

    generateDummyPerfChartData() {

        var data: any[] = new Array();

        var currentDateTime = Date.now();

        for (var i = 0; i < 60; i++) {

            var row = new Object();
            row[Keys.GEN_SNAPSHOTTIME] = Utility.formatDate(new Date(currentDateTime), "hh:mm");
            data.unshift(row);

            currentDateTime -= 60000;
        }

        return data;

    }

}