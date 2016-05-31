import {Output} from '../Output';

export class Stream extends Output
{
    get stream () {
        throw new Error(this.constructor.name+'::stream must be implemented.');
    }
}