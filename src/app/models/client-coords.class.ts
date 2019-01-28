import { Coords } from './coords.class';
// Clase para indicar las coordeanadas que solicito el cliente
export class ServiceCoords {
    constructor (
        public origin: Coords,
        public destiny: Coords
    ) {}
}
