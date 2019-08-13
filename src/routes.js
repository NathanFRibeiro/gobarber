import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middleware/auth';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * Non-Authenticated Middlewares
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * Authentication Middleware
 */
routes.use(authMiddleware);

/**
 * Users
 */
routes.put('/users', UserController.update);

/**
 * Providers & Available
 */
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

/**
 * Files
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * Appointment
 */
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

/**
 * Schedule
 */
routes.get('/schedule', ScheduleController.index);

/**
 * Notification
 */
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
