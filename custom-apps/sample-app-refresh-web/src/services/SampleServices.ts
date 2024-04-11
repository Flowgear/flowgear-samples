import { Flowgear } from "flowgear-webapp";
import Config from "../utils/config";
import { SampleType } from "../types/SampleType";

export module SampleServices {

    export const getItems = async () => {

        try{
            let url = `${Config.baseUrl}workshop/sampledata`;
            if(process.env.NODE_ENV === "development"){
                url = `${Config.baseUrlDev}workshop/sampledata`;
            }
            let items = await Flowgear.Sdk.invoke<SampleType[]>("GET", url);
            return items;
        }
        catch(ex: any){
            Flowgear.Sdk.setAlert(
                `Failed to load items: ${ex.message}`, 
                Flowgear.Sdk.AlertMessageTypes.Error, 
                Flowgear.Sdk.AlertDismissOptions.Tap);

            return [];
        }

    }

}