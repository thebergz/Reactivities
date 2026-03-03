import {makeAutoObservable} from "mobx";

export class ActivityStore {
    filter = 'all';
    startDate = new Date().toISOString();

    constructor() {
        makeAutoObservable(this)
    }

    setFilter = (filter: string) => {
        console.log("Filter: " + filter);
        this.filter = filter;
    }

    setStartDate = (date: Date) => {
        this.startDate = date.toISOString();
    }
}