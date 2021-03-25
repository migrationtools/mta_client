import {ApplicationType} from './applicationType';

export interface AppIdDetail {
    appId?: number;
    applicationName?: string;
    applicationType?: string;
    accessType?: string;
    databaseType?: string;
    monitoring_framework?: string;
    logging_provider?: string;
    git_url?: string;
    microsoftLibs?: Array<string>;
    thirdPartyLibs?: Array<string>;
    inHouseLibs?: Array<string>;
}
