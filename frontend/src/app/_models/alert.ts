export class Alert {
    id: string | any;
    type: AlertType | any;
    message: string | any;
    autoClose: boolean | any;
    keepAfterRouteChange: boolean | any;
    fade: boolean | any;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}