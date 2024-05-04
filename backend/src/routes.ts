import express from 'express';
import multer from 'multer';
import { storeValidator } from './validators/PlacesValidator';

import multerConfig from './config/multer';

import PlacesController from './controllers/PlacesController';
import ItemsController from './controllers/ItemsController';

const placesController = new PlacesController();
const itemsController = new ItemsController();

const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.post(
    '/places',
    upload.single('image'),
    storeValidator,
    placesController.create,
);
routes.get('/places', placesController.index);
routes.get('/places/:id', placesController.show);
routes.delete('/places/:id', placesController.delete);

export default routes;