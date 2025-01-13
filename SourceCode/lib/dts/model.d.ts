type authentication_body = {
    username: string,
    password: string
}

type string_query = {'=': string,}|{    '!=': string}|{    "STARTSWITH": string} |{    "ENDSWITH": string} |{    "CONTAINS": string} |{    "NOT LIKE": string} |{    "IN": string} |{    "NOT IN": string} |{    "INSTANCEOF": string}|{"ON": string};

type number_query = {"=": string}|{"!=": string}|{">": string}|{">=": string}|{"<": string}|{"<=": string}

// declare var GlideRecord: GlideRecord;

type displayValueFieldOptions = 'true' | 'all';

type GlideRecord = <t extends tableNames>(table: t) => {
    addQuery(fieldData: fields[t][][]): void,
    setShowFields(fieldData: fields[t]): void,
    query: (cb?: Function) => Promise<fields[t][]>,
    setDisplayValues(option: displayValueFieldOptions): void;
}

declare const GlideRecords: (connection: any) => <tb extends tableNames>(table: tb) => {
    addQuery(fieldData: fields[tb][][]): void,
    setShowFields(fieldData: fields[tb]): void,
    query: (cb?: Function) => Promise<fields[tb][]>,
    setDisplayValues(option: displayValueFieldOptions): void;
}

type intellisenseObjectForSingleInstance = {
    extends: {
        [key: string]: {
            extendedTable: string,
            label: string,
        }
    }
    tableNames: string[],
    tables: {
        [key: string]: {

        }
    },
    fieldsByTable: {
        [key: string]: {
            fieldName: string,
            label: string,
            reference?: string,
            type: string
        }[],
    }
}

type fieldValueTypes = 'string' | 'integer' | 'glide_date' | 'reference' | 'float' | 'glide_date_time';

type serviceNowUtils = {
    getInstanceUrlFromName: (instanceName: any) => string,
    glideRecordFromInstance: (ignorePreloaded: boolean) => Promise<GlideRecord>,
    cacheIntellisense(instanceName: string): void,
    intellisense: {
        [key: string]: intellisenseObjectForSingleInstance
    },

    intellisenseForCurrentInstance: intellisenseObjectForSingleInstance,

    intellisenseHandler: () => {
        getModel: {
            withExtensions: (tableName: any) => void;
            clean: () => void;
        };
        getFields: {
            list: (tableName: any) => {fieldName: string, label: string, type: fieldValueTypes}[];
            model: (tableName: any) => any;
        };
    },
    getURLfromInstance: (instanceNickname: string) => string;
    GlideRecord: undefined | GlideRecord;
    domainChoice: (multi: boolean) => Promise<string[]>;
    // currentInstance: string
    // glideRecordFromInstance: () => Promise<GlideRecord>
};

type clientList = {list: {
    key: number,
    value: string,
    uId: string,
    uuid: string
}[]}

type SingleEdge = {
    dest: {
        id: number,
        entityType: string
    },

    label: string,
    props: {
        "updatedTS": number,
        "createdTS": number,
        "intAppId": string,
        "destUUID": string,
        "srcUUID": string,
        "destEntityType":  string,
        "clientUUId": string,
        "relationName":  string,
        "destId": number,
        "srcEntityType":  string,
        "srcId": number,
        "tenantId": number,
        "partnerUUId": string,
    }
     src: {
        id: number,
        entityType: string
     }
}

type SingleVertice = {
    "key": {
        "id": number,
        "entityType": string
    },
    "properties": {
        "hostName": string,
        "active": true,
        "uuid": string,
        "state": string,
        "name": string,
        "aliasName": string,
        "resourceName": string,
        "createdTime": string,
        "sourceType": string,
        "partnerId": number,
        "tenantId": number,
        "resourceType": string,
        "isDevice": boolean,
        "leafNode": boolean
    }
}

type edgesArr = SingleEdge[];
type verticesArr = SingleVertice;

type SingleTopologyStruct = {
    edges: edgesArr;
    vertices: verticesArr;
};

type AuthenticationResponse = {access_token: string; expires_in: number; scope: string; token_type: string;}

type OpsRampCredentials = {
    /** Key*/ 
    key: string; 
    secret: string
};

/**
 * Opsramp integration
 */
type opsramp = {
    /**
     * @param creds
     * @returns {Promise<AuthenticationResponse>}
     * @description Authenticate using opsramp's OAuth2.0 authentication API Endpoint.
     */
    authenticate: (creds: OpsRampCredentials) => Promise<AuthenticationResponse>;
    baseURL: string;
    searchResources: () => Promise<void>;
    partnerId: string;
    tenantId: string;
    chooseTenant: () => Promise<string | void>;
    clientsList: undefined | clientList,
    querySingleTopology(resourceId: string): Promise<SingleTopologyStruct>;
    token: {token: AuthenticationResponse; isValid: () => boolean} | undefined;
    retopology: (resourcesList, topologyObj) => Promise<{}>;
    session: {
        headers: {
            "Accept": string,
            "Accept-Encoding": string,
            "Accept-Language": string,
            "Connection": string,
            "Content-Type": string,
            "Cookie": string,
            "Host": string,
            "Referer": string,
            "Sec-Fetch-Dest": string,
            "Sec-Fetch-Mode": string,
            "Sec-Fetch-Site": string,
            "User-Agent": string,
            "X-Requested-With": string,
            "sec-ch-ua": string,
            "sec-ch-ua-mobile": string,
            "sec-ch-ua-platform": string,
            'Pragma': string
        },
        handleLoginRedirect: <func extends (...args) => any>(resp: AxiosResponse, functionToRetry: func) => ReturnType<func>
        handleError: (err: AxiosError, functionToRetry: Promise<() => any>, _Promise: {res: (response: any)=> void; rej: (rejectReason: any) => void}) => Promise<void>;
    },
    genURL: (additionalQuery: string) => string; 
    opsrampCredentials: {
        username: string,
        password: string
    },
    integrations: {
        [clientId: string]: {
            key: string,
            secret: string
        }
    },
    getClients(): Promise<AxiosError | {clientId: number; success: boolean; total: number;} | clientList>;

    folder: string;
    clientPath: (clientName: string) => PathLike;
    queryTopology:() => Promise<void>;
    treenodeMapper: (treeNode: any) => {
        name: any;
        id: any;
        type: any;
        outline: string;
        children: any;
    }
};

type opsrampResource = {
    "primaryId": number,
    "id": string,
    "hostName": string,
    "ipAddress": string,
    "client": {
        "id": number,
        "uniqueId": string,
        "name": string,
        "enablePRCLogsSource": boolean,
        "enablePRCAlertsSource": boolean,
        "featureFlags": object,
        "webConsoles": boolean
    },
    "identity": string,
    "createdDate": string,
    "updatedDate": string,
    "classCode": string,
    "deviceType": string,
    "devicePath": string,
    "type": string,
    "state": string,
    "macAddress": string,
    "gatewayProfileId": string,
    "source": string,
    "status": string,
    "attributes": {
        "installedIntgId": string,
        "providerType": string,
        "accountNumber": number | null,
        "accountName": string,
        "publicIPAddress": string | null,
        "instanceId": string | null,
        "network": object[]
    },
    "aliasName": string,
    "managementProfile": {
        "id": number,
        "name": string,
        "type": string,
        "delete": boolean
    },
    "name": string,
    "resourceName": string,
    "consoles": any[],
    "resourceType": string,
    "frequency": number,
    "paused": boolean,
    "deleted": boolean,
    "validateSSL": boolean,
    "port": number,
    "encrypted": boolean,
    "timeout": number,
    "ts": number,
    "clientId": number,
    "locationOffset": number,
    "totalLocations": number,
    "receiverHostPort": number,
    "absoluteTime": boolean,
    "topologyEnabled": boolean,
    "device": boolean,
    "excludeIndexing": boolean,
    "cloudInstance": boolean,
    "saId": number,
    "postScreenshotOnError": boolean,
    "postSuccessScreenshotAlongWithError": boolean,
    "lastMetricValue": number
}

declare const serviceNow: serviceNowUtils;
declare const opsramp: opsramp;