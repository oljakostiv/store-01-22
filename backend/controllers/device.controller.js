const uuid = require('uuid').v4();   //рандомні id;
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const { errorHandler: { badRequest } } = require('../errors');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, info, brandId, typeId } = req.body;
            const { img } = req.files;

            let fileName = uuid + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });
            //рейтинг по дефолту 0;

            if (info) {
                //дані з формдейта -> у вигляді строки,
                // тому парсимо (на фронті -> в json-строку, на беці - назад в js-об'єкти;
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }

            res.json(device);
        } catch (e) {
            next(badRequest(e.message));
        }
    };

    async getAll(req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query;

            page = page || 1;
            limit = limit || 6;

            let offset = page * limit - limit;  //перейти на наступну сторінку;

            let devices;

            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset});
                                    //для пагінації;
            }

            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
            }

            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
            }

            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
            }

            res.json(devices);
        } catch (e) {
            next(e);
        }
    };

    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const device = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            });

            res.json(device);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DeviceController();
