/* Object type Driver for customers */
export class ObjectDriver {
    constructor(
        public name: string,
        public email: string,
        public city: string,
        public phone: number | string,
        public password?: string,
        public _id?: string,
        public authorized?: boolean,
        public statusWork?: boolean,
        public status?: boolean
    ) {}
}
