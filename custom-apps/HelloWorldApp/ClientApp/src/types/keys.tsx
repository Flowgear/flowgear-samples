export class Keys {

    

    static CLIENTSIDE_ACTIVETASKS_OTHER = "ActiveTasksOther";

    static GEN_SNAPSHOTTIME = "01";
    static GEN_POD = "02";
    static GEN_ROLE = "03";
    static GEN_INSTANCE = "04";
    static GEN_INSTANCEVERSION = "05";
    static GEN_MACHINESTARTTIME = "06";
    static GEN_STARTTIME = "07";
    static GEN_CPULOAD = "08";
    static GEN_LOADBALANCERLOAD = "09";
    static GEN_THREADS = "0A";
    static GEN_PROCESSMEMORYMB = "0B";
    static GEN_PROCESSASSEMBLIES = "0C";
    static GEN_MEMORYLOAD = "0D";
    static GEN_PLATFORMLOG = "0E";
    static GEN_PLATFORMLOGERROR = "0F";
    static GEN_DATABASEQUERY = "10";
    static GEN_DATABASEQUERYRETRY = "11";
    static GEN_DATABASEQUERYFAILURE = "12";
    static GEN_CACHEINTERACTION = "13";
    static GEN_CACHEINTERACTIONRETRY = "14";
    static GEN_CACHEINTERACTIONFAILURE = "15";
    static GEN_MESSAGINGINTERACTION = "16";
    static GEN_MESSAGINGINTERACTIONRETRY = "17";
    static GEN_MESSAGINGINTERACTIONFAILURE = "18";
    static GEN_PLATFORMOUTOFMEMORYEXCEPTION = "19";
    static GEN_COMMITTEDMEMORYMB = "20";

    static API_DROPPOINTSCONNECTED = "40";
    static API_DROPPOINTSRECEIVEQUEUEUNRECEIVEDMB = "41";
    static API_DROPPOINTSSENDQUEUEUNSENTMB = "42";

    static ENG_SITEID = "80";
    static ENG_SITEHOSTS = "81";
    static ENG_ACTIVETASKS = "82";
    static ENG_CACHEDWORKFLOWS = "83";
    static ENG_CACHEDNODES = "84";
    static ENG_NODEINVOKESTART = "85";
    static ENG_NODEINVOKECOMPLETE = "86";
    static ENG_NODEINVOKEEXCEPTION = "87";
    static ENG_TOPWORKFLOWSTART = "88";
    static ENG_SUBWORKFLOWSTART = "89";
    static ENG_WORKFLOWDATABASEREAD = "8A";
    static ENG_ACTIVITYLOGPREVIEWWRITE = "8B";
    static ENG_ACTIVITYLOGBIGOBJECTWRITE = "8C";
    static ENG_ACTIVITYLOGSTARTLOGBACKLOG = "8D";
    static ENG_ACTIVITYLOGFINISHLOGBACKLOG = "8E";
    static ENG_TOPWORKFLOWCONTINUATION = "8F";
    static ENG_ACTIVETASKS_API = "90";
    static ENG_ACTIVETASKS_ALWAYSON = "91";
    static ENG_ACTIVETASKS_OTHER = "92";

    static PODS = [1, 3, 5, 6, 7];
    static CHART_GROUPS = [
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


}