import { ObjectDriver } from './drivers.class';
export class TowData {
    constructor (
        public tow_name: string,
        public tow_plate: string,
        public tow_model: string,
        public tow_authorized?: boolean,
        public driver?: ObjectDriver,
        public _id?: string
    ) {}
}
