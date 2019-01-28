// Clase que representa la interfaz de clientes
export class ObjectClient {
    constructor (
        public name: string,
        public email: string,
        public phone: string,
        public status: boolean,
        public GOOGLE: boolean,
        public _id?: string
    ) {}
}
