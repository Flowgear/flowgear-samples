"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Keys = /** @class */ (function () {
    function Keys() {
    }
    Keys.CLIENTSIDE_ACTIVETASKS_OTHER = "ActiveTasksOther";
    Keys.GEN_SNAPSHOTTIME = "01";
    Keys.GEN_POD = "02";
    Keys.GEN_ROLE = "03";
    Keys.GEN_INSTANCE = "04";
    Keys.GEN_INSTANCEVERSION = "05";
    Keys.GEN_MACHINESTARTTIME = "06";
    Keys.GEN_STARTTIME = "07";
    Keys.GEN_CPULOAD = "08";
    Keys.GEN_LOADBALANCERLOAD = "09";
    Keys.GEN_THREADS = "0A";
    Keys.GEN_PROCESSMEMORYMB = "0B";
    Keys.GEN_PROCESSASSEMBLIES = "0C";
    Keys.GEN_MEMORYLOAD = "0D";
    Keys.GEN_PLATFORMLOG = "0E";
    Keys.GEN_PLATFORMLOGERROR = "0F";
    Keys.GEN_DATABASEQUERY = "10";
    Keys.GEN_DATABASEQUERYRETRY = "11";
    Keys.GEN_DATABASEQUERYFAILURE = "12";
    Keys.GEN_CACHEINTERACTION = "13";
    Keys.GEN_CACHEINTERACTIONRETRY = "14";
    Keys.GEN_CACHEINTERACTIONFAILURE = "15";
    Keys.GEN_MESSAGINGINTERACTION = "16";
    Keys.GEN_MESSAGINGINTERACTIONRETRY = "17";
    Keys.GEN_MESSAGINGINTERACTIONFAILURE = "18";
    Keys.GEN_PLATFORMOUTOFMEMORYEXCEPTION = "19";
    Keys.GEN_COMMITTEDMEMORYMB = "20";
    Keys.API_DROPPOINTSCONNECTED = "40";
    Keys.API_DROPPOINTSRECEIVEQUEUEUNRECEIVEDMB = "41";
    Keys.API_DROPPOINTSSENDQUEUEUNSENTMB = "42";
    Keys.ENG_SITEID = "80";
    Keys.ENG_SITEHOSTS = "81";
    Keys.ENG_ACTIVETASKS = "82";
    Keys.ENG_CACHEDWORKFLOWS = "83";
    Keys.ENG_CACHEDNODES = "84";
    Keys.ENG_NODEINVOKESTART = "85";
    Keys.ENG_NODEINVOKECOMPLETE = "86";
    Keys.ENG_NODEINVOKEEXCEPTION = "87";
    Keys.ENG_TOPWORKFLOWSTART = "88";
    Keys.ENG_SUBWORKFLOWSTART = "89";
    Keys.ENG_WORKFLOWDATABASEREAD = "8A";
    Keys.ENG_ACTIVITYLOGPREVIEWWRITE = "8B";
    Keys.ENG_ACTIVITYLOGBIGOBJECTWRITE = "8C";
    Keys.ENG_ACTIVITYLOGSTARTLOGBACKLOG = "8D";
    Keys.ENG_ACTIVITYLOGFINISHLOGBACKLOG = "8E";
    Keys.ENG_TOPWORKFLOWCONTINUATION = "8F";
    Keys.ENG_ACTIVETASKS_API = "90";
    Keys.ENG_ACTIVETASKS_ALWAYSON = "91";
    Keys.ENG_ACTIVETASKS_OTHER = "92";
    Keys.PODS = [1, 3, 5, 6, 7];
    Keys.CHART_GROUPS = [
        {
            "Name": "Resources",
            "Charts": {
                "CPU Load": Keys.GEN_CPULOAD,
                "Memory Load": Keys.GEN_MEMORYLOAD,
                "Committed Memory": Keys.GEN_COMMITTEDMEMORYMB,
                "Process Memory": Keys.GEN_PROCESSMEMORYMB,
                "Load Balancer Load": Keys.GEN_LOADBALANCERLOAD,
                "Out of Memory Errors": Keys.GEN_PLATFORMOUTOFMEMORYEXCEPTION,
                "Threads": Keys.GEN_THREADS,
                "Loaded Assemblies": Keys.GEN_PROCESSASSEMBLIES
            }
        },
        {
            "Name": "Subsystems",
            "Charts": {
                "Database Calls": Keys.GEN_DATABASEQUERY,
                "Database Retries": Keys.GEN_DATABASEQUERYRETRY,
                "Database Failures": Keys.GEN_DATABASEQUERYFAILURE,
                "Cache Calls": Keys.GEN_CACHEINTERACTION,
                "Cache Retries": Keys.GEN_CACHEINTERACTIONRETRY,
                "Cache Failures": Keys.GEN_CACHEINTERACTIONFAILURE,
                "Messaging Calls": Keys.GEN_MESSAGINGINTERACTION,
                "Messaging Retries": Keys.GEN_MESSAGINGINTERACTIONRETRY,
                "Messaging Failures": Keys.GEN_MESSAGINGINTERACTIONFAILURE
            }
        },
        {
            "Name": "DropPoints",
            "Charts": {
                "DropPoints": Keys.API_DROPPOINTSCONNECTED,
                "Unreceived (MB)": Keys.API_DROPPOINTSRECEIVEQUEUEUNRECEIVEDMB,
                "Unsent (MB)": Keys.API_DROPPOINTSSENDQUEUEUNSENTMB
            }
        },
        {
            "Name": "Tasks",
            "Charts": {
                "Site Hosts": Keys.ENG_SITEHOSTS,
                "Active Tasks": Keys.ENG_ACTIVETASKS,
                "Cached Workflows": Keys.ENG_CACHEDWORKFLOWS,
                "Cached Nodes": Keys.ENG_CACHEDNODES,
                "Node Starts": Keys.ENG_NODEINVOKESTART,
                "Node Completes": Keys.ENG_NODEINVOKECOMPLETE,
                "Node Errors": Keys.ENG_NODEINVOKEEXCEPTION,
                "Workflow Starts": Keys.ENG_TOPWORKFLOWSTART,
                "Subworkflow Starts": Keys.ENG_SUBWORKFLOWSTART,
                "Workflow Continuations": Keys.ENG_TOPWORKFLOWCONTINUATION,
                "Workflow Database Reads": Keys.ENG_WORKFLOWDATABASEREAD
            }
        },
        {
            "Name": "Logging",
            "Charts": {
                "Log Writes": Keys.GEN_PLATFORMLOG,
                "Log Errors": Keys.GEN_PLATFORMLOGERROR,
                "Activity Log Preview Writes": Keys.ENG_ACTIVITYLOGPREVIEWWRITE,
                "Activity Log Blob Writes": Keys.ENG_ACTIVITYLOGBIGOBJECTWRITE,
                "Activity Log Start Backlog": Keys.ENG_ACTIVITYLOGSTARTLOGBACKLOG,
                "Activity Log Finish Backlog": Keys.ENG_ACTIVITYLOGFINISHLOGBACKLOG
            }
        }
    ];
    return Keys;
}());
exports.Keys = Keys;
//# sourceMappingURL=keys.js.map