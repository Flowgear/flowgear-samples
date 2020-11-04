﻿import * as React from 'react';
import { Flowgear } from './flowgearSdk';
import { TimeChart } from './timeChart';
import { DonutChart } from './donutChart';
import { Keys } from '../types/keys';
import { KeyValueGroupReport } from '../types/keyValueGroupReport';
import { Utility } from '../utility';

export class KeyValueCharts extends React.Component<
    {
        pod: number,
        siteId: string,
        timeSecs: number
    },
    {
        keyValueReportData: KeyValueGroupReport[],
        isDummyKeyValueReportData: boolean
    }
    >
{

    constructor(props) {
        super(props);

        this.state = {
            keyValueReportData: null,
            isDummyKeyValueReportData: false
        };
    }


    componentDidUpdate(prevProps, prevState) {
        if (Utility.isDifferent(this.props, prevProps)) {
            this.handleRefresh();
        }
    }

    render() {

        if (!this.state.keyValueReportData) {
            return null;
        }

        var panels = this.state.keyValueReportData.map(d => d.DashboardPanel).filter((value, index, self) => self.indexOf(value) === index);

        return (
            <div>
                {
                    this.state.isDummyKeyValueReportData
                        ?
                        <div className="empty-state" style={{ paddingLeft: "50px", textAlign: "left" }}>
                            {"This area shows activity in your Site generated by Key-Values."}
                            <div className="empty-state-extra">
                                {"Get Started by setting up "}
                                <a
                                    href="#"
                                    onClick={() => {
                                        Flowgear.Sdk.openUrl("#sites/" + this.props.siteId + "/keyvaluegroups");
                                    }}>Key/Value Groups.</a>
                            </div>
                        </div>
                        :
                        null
                }

                {
                    panels.map(panel => {

                        return (
                            <div className="row" key={panel}>
                                <div className="big-text">{panel}</div>
                                <div>
                                    {this.state.keyValueReportData.filter(f => f.DashboardPanel == panel).map((report, index) => {
                                        return (
                                            <div className="chart-block" key={index}>
                                                <DonutChart
                                                    key={report.Group}
                                                    title={report.DisplayName}
                                                    values={report.Values} />
                                            </div>

                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );

    }

    async handleRefresh() {

        if (this.props.timeSecs == 0) {
            this.setState({
                keyValueReportData: null
            } as any);
            return;
        }

        // end date is 5 mins from now so that differences in datetime don't prevent new records from showing
        var endDate = new Date();
        endDate.setSeconds(endDate.getSeconds() + 300);

        var startDate = new Date();
        startDate.setSeconds(startDate.getSeconds() - this.props.timeSecs);

        this.handleGetKeyValueData(startDate, endDate);

    }

    async handleGetKeyValueData(startDate: Date, endDate: Date) {

        var urlTemplate = "https://api{0}.flowgear.net/sites/{1}/keyvalues/report/?startDate={2}&endDate={3}";

        var url = Utility.formatString(
            urlTemplate,
            [
                this.props.pod,
                this.props.siteId,
                Utility.formatUtcDate(startDate, "yyyy-MM-dd hh:mm"),
                Utility.formatUtcDate(endDate, "yyyy-MM-dd hh:mm")
            ]);

        var result = (await Flowgear.Sdk.invoke(url));
        if (!result.success) {
            return;
        }

        var keyValueReportData: any[] = result.response;
        var isDummyKeyValueReportData = false;

        var saveThis = this;

        if (keyValueReportData.length == 0) {
            keyValueReportData = this.generateDummyKeyValueReportData();
            isDummyKeyValueReportData = true;
        }

        keyValueReportData = keyValueReportData.sort((a: KeyValueGroupReport, b: KeyValueGroupReport) => {
            if (a.DashboardPanel < b.DashboardPanel) {
                return -1;
            } else if (a.DashboardPanel > b.DashboardPanel) {
                return 1;
            } else if (a.DashboardIndex < b.DashboardIndex) {
                return -1;
            } else if (a.DashboardIndex > b.DashboardIndex) {
                return 1;
            } else {
                return 0;
            }
        });

        this.setState(
            {
                keyValueReportData: null
            },
            () => {
                saveThis.setState({
                    keyValueReportData: keyValueReportData,
                    isDummyKeyValueReportData: isDummyKeyValueReportData
                })
            });
    }

    generateDummyKeyValueReportData() {

        return [
            {
                "Group": "Example",
                "DisplayName": "Example Customer Sync",
                "DashboardPanel": null,
                "DashboardIndex": 0,
                "Values": {
                    "InProgress": 4,
                    "Warning": 16,
                    "Success": 80
                }
            },
            {
                "Group": "Example",
                "DisplayName": "Example Order Sync",
                "DashboardPanel": null,
                "DashboardIndex": 0,
                "Values": {
                    "Warning": 5,
                    "Error": 5,
                    "Success": 40
                }
            }];

    }



}