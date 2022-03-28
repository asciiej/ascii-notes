import { connect } from 'mongoose';
import { database } from '@config/environment';

const mongooseInit = () => connect(database.url);

export { mongooseInit };