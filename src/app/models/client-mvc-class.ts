import { ObjectClientCar } from './client-car.class';
export class ObjectClientCarAllData {
    constructor (
        public vehicle: ObjectClientCar,
        public _id?: string,
        public picture?: string
    ) {}
}
