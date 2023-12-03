import { Observable, Subscriber } from "rxjs";

export enum Status {
    UNINITIALIZED,
    INITIALIZING,
    INITIALIZED
}

export interface IStatus {
    status: Observable<Status>
    statusEmitter: Subscriber<Status>
}