import { Router, RequestHandler, Express } from 'express';

export interface IInitializeSwaggerModuleParams {
    router: Router;
    swaggerUri: string,
    customSiteTitle?: string;
    swaggerImportPath?: string;
}


export interface IPaginationInput {
    pageIndex: number;
    pageSize: number;
}

export interface IAPIErrorSchema {
    title: string,
    message: string,
    code: string
}

export interface ICreateServerInstanceParams {
    app: Express;
    port: number;
    swaggerURI?: string;
}

// odavde je novo

export interface IRegister {
    firstname: string;
    lastname: string;
    password: string;
    isModerator: boolean;
}

export interface RRegister {
    userId: number;
    username: string;
}

export interface IUserLimitCounter {
    limit: number;
    used: number;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface RLogin {
    authToken: string;
}

export interface RGetProfile {
    firstname: string;
    lastname: string;
    username: string;
}

export interface IEventfilter {
    startTime: string;
    endTime: string;
}

export interface IShowEvents {
    filter: IEventfilter | null;
    search: string;
    status: string;
}

export interface RShowEvents {
    events: IEventSchema[];
}

export interface IEventSchema {
    eventId: number;
    name: string;
    startTime: string;
    endTime: string;
    status: string;
}
