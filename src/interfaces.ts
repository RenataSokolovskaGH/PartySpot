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