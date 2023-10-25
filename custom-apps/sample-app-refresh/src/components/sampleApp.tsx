import React from 'react';
import { Flowgear } from 'flowgear-webapp';
import { SampleResponse } from '../types/sampleTypes';
import { UrlTemplates } from '../utility/urlTemplates';
import { SampleTable } from './sampleTable';

export class SamppleApp extends React.Component<
    {

    },
    {
        sampleResponse: SampleResponse[]
        headings: string[]
    }
>
{

    constructor(props) {
        super(props);

        this.state = {
            sampleResponse: null,
            headings: null
        };
    }

    async componentDidMount() {
        await this.refreshData();
    }

    renderSearchBar() {
        return (
            <nav className="navbar navbar-fixed-top command-container">
                <div className="command-container-center-controls">
                    <button className="btn btn-primary" onClick={async () => { await this.refreshData(); }} style={{marginRight: "5px"}}>Refresh</button>
                </div>
            </nav>
        );
    }

    render() {

        return (
            <div>
                {this.renderSearchBar()}

                <div className="app-contentarea">
                    <SampleTable tableData={this.state.sampleResponse} headings={this.state.headings} />
                </div>
            </div>
        );
    }


    async refreshData() {
        try {
            var response = await Flowgear.Sdk.invoke<SampleResponse[]>(
                "GET",
                UrlTemplates.WORKLOW_API_INVOKE_GET_DATA);

            response.sort((a, b) => new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime());

            if (response[0]) {
                var headings = Object.keys(response[0]);
            }

            this.setState({
                sampleResponse: response,
                headings: headings
            });
        }
        catch (ex: any) {
            var errorObject = JSON.parse(ex.message);
            Flowgear.Sdk.setAlert("Error getting data. " + errorObject.errorMessage, Flowgear.Sdk.AlertMessageTypes.Error, Flowgear.Sdk.AlertDismissOptions.Auto);
            throw ex;
        }
    }

}