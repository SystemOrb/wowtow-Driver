import { TowData } from './tow_data.class';
export class CustomerServices {
    constructor (
        public latitudeMain: number,
        public longitudeMain: number,
        public tracking: boolean,
        public completed: boolean,
        public toLng: number,
        public toLat: number,
        public service_ref: string,
        public customer: TowData,
        public matrix?: any,
        public _id?: string,
        public taken?: boolean,
        public serviceStatus?: string,
        public provider?: string,
        public fromLng?: number,
        public fromLat?: number
    ) {}
}
