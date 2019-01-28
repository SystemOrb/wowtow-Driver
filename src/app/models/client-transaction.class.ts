// Clase que se encarga de controlar los datos economicos de los servicios por los clientes
export class TransactionForService {
    constructor (
        public payment_description: string,
        public currency: string,
        public amount: number,
        public create: Date,
        public customer_key: string,
        public payment_status: string,
        public payment_system: boolean,
        public card_type: string,
        public client: string,
        public _id?: string,
        public dispute?: boolean
    ) {}
}
