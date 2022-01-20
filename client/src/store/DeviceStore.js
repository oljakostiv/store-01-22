import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            { id: 1, name: 'phone' },
            { id: 2, name: 'column' }
        ];
        this._brands = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Samsung' }
        ];
        this._devices = [
            {
                id: 1,
                name: "iphone 13 256GB",
                price: 32000,
                rating: 0,
                img: "a2cff295-7af4-4bef-b4a3-9976baf3c544.jpg"
            },
            {
                id: 2,
                name: "Galaxy Z Flip3 8/128GB",
                price: 25000,
                rating: 0,
                img: "5e7d8b10-3208-4605-85b1-bf4dd0720a82.jpg"
            },
            {
                id: 3,
                name: "AirPods 3",
                price: 7000,
                rating: 0,
                img: "5e7d8b10-3208-4605-85b1-bf4dd0720a82.jpg"
            }
        ];
        makeAutoObservable(this);
    };

    setTypes(types) {
        this._types = types;
    };

    setBrands(brands) {
        this._brands = brands;
    };

    setDevices(devices) {
        this._devices = devices;
    };

    get types() {
        return this._types;
    };

    get brands() {
        return this._brands;
    };

    get devices() {
        return this._devices;
    };
}
