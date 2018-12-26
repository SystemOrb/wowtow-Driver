import { ObjectDriver } from './drivers.class';
export class DocumentModel {
    constructor (
        public documentStatus: boolean,
        public document_name: string,
        public user: ObjectDriver,
        public documentType: string,
        public _id?: string
    ) {}
}
