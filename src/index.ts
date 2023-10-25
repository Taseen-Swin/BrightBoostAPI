import dotenv from 'dotenv';
dotenv.config();

import { ExpressServer } from './lib/app';

import  { config } from './lib/config/config';

new ExpressServer(config).setup();