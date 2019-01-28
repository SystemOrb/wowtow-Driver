// Clase que representa un objeto de tipo vehiculo de los clientes
import { ObjectClient } from './client.class';
export class ObjectClientCar {
    constructor (
        public car_name: string,
        public car_plate: string,
        public client: ObjectClient,
        public car_colour?: string,
        public car_model?: string,
        public _id?: string
    ) {}
}
