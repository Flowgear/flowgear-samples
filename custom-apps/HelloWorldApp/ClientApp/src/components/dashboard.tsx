import * as React from 'react';
import { Flowgear } from './flowgearSdk';
import { TimeChart } from './timeChart';
import { DonutChart } from './donutChart';
import { Keys } from '../types/keys';
import { KeyValueGroupReport } from '../types/keyValueGroupReport';
import { Utility } from '../utility';
import { PerformanceCharts } from './performanceCharts';
import { KeyValueCharts } from './keyValueCharts';

export class Dashboard extends React.Component<
    {

    },
    {
        themeClass: string,
        pod: number,
        siteId: string,
        timeSecs: number,
    }
    >
{

    constructor(props) {
        super(props);

        this.state = {
            themeClass: null,

            pod: null,

            siteId: null,

            timeSecs: 60 * 60 * 24,
        };
    }


    async componentDidMount() {

        this.handleRefresh();

    }

    render() {

        var saveThis = this;


        return (
            <div className={"app-container " + this.state.themeClass}>

                <nav className="navbar navbar-fixed-top command-container" style={{ marginTop: "0px", marginLeft: "0px" }}>
                    {this.renderFilters()}
                </nav>

                <div className="app-contentarea">
                    {this.renderCharts()}
                </div>

            </div>
        );
    }

    renderFilters() {

        var saveThis = this;

        return (
            <div className="container-fluid" style={{ textAlign: "center" }}>
                <div className="btn-group" role="group">
                    <button
                        type="button"
                        className={"btn btn-" + (this.state.timeSecs == 3600 ? "primary" : "default")}
                        onClick={() => this.setTimeSecs(3600)}
                    >1 hour</button>
                    <button
                        type="button"
                        className={"btn btn-" + (this.state.timeSecs == 86400 ? "primary" : "default")}
                        onClick={() => this.setTimeSecs(86400)}
                    >1 day</button>

                    <button
                        type="button"
                        className={"btn btn-" + (this.state.timeSecs == 604800 ? "primary" : "default")}
                        onClick={() => this.setTimeSecs(604800)}
                    >1 week</button>
                </div>
            </div>
        );
    }

    renderCharts() {

        return (
            <div className="container-fluid">

                <div >
                    <div className="row">
                        <PerformanceCharts pod={this.state.pod} siteId={this.state.siteId} timeSecs={this.state.timeSecs} />
                    </div>

                    <div >
                        <KeyValueCharts pod={this.state.pod} siteId={this.state.siteId} timeSecs={this.state.timeSecs} />
                    </div>
                </div>

            </div>
        );

    }

    setTimeSecs(timeSecs: number) {

        var saveThis = this;

        this.setState({
            timeSecs: 0
        }, () => {

            this.setState({
                timeSecs: timeSecs
            });
        });

    }


    async handleRefresh() {

        var context = await Flowgear.Sdk.getContext();

        this.setState({
            themeClass: context.theme ? "theme-" + context.theme : "",
            pod: context.pod,
            siteId: context.siteId
        } as any);
    }


}