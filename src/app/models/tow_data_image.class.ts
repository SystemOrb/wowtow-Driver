import { TowData } from './tow_data.class';
export class AllDataTow {
    constructor (
        public tow_image: string,
        public driver: TowData,
        public _id?: string
    ) {}
}
