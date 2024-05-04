/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Knex from 'knex';

export async function seed(knex: Knex) {
    return knex('items').insert([
        {
            title: 'Baterias',
            image: 'baterias.svg',
        },
        {
            title: 'Celulares',
            image: 'celulares.svg',
        },
        {
            title: 'Eletrodomésticos',
            image: 'eletrodomesticos.svg',
        },
        {
            title: 'Eletroeletrônicos',
            image: 'eletroeletronicos.svg',
        },
    ]);
}