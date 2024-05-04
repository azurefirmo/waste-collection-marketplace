/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import knex from '../database/connection';

class PlacesController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const places = await knex('places')
            .join('place_items', 'places.id', '=', 'place_items.place_id')
            .whereIn('place_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('places.*');

        const serializedPlaces = places.map(place => {
            return {
                ...place,
                image_url: `http://localhost:3333/uploads/${place.image}`,
            };
        });

        return response.json(serializedPlaces);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const place = await knex('places').where('id', id).first();

        if (!place) {
            return response.status(400).json({ message: 'Place not found.' });
        }
        const serializedPlace = {
            ...place,
            image_url: `http://localhost:3333/uploads/${place.image}`,
        };
        const items = await knex('items')
            .join('place_items', 'items.id', '=', 'place_items.item_id')
            .where('place_items.place_id', id)
            .select('items.title');

        return response.json({ place: serializedPlace, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        const trx = await knex.transaction();

        const place = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('places').insert(place);

        const place_id = insertedIds[0];

        const placeItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    place_id,
                };
            });

        await trx('place_items').insert(placeItems);

        await trx.commit();

        return response.json({
            id: place_id,
            ...place,
        });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const place = await knex('places').where('id', id).delete();

        if (!place) {
            return response.status(400).json({ message: 'Place was not found.' });
        }

        return response.json({ msg: 'Place was successfully deleted.' });
    }
}

export default PlacesController;