import * as uuidv1 from 'uuid/v1';
import * as uuidv4 from 'uuid/v4';
import * as uuidv5 from 'uuid/v5';

// timestamp
export function createUuidv1() {
    return uuidv1();
}

// random
export function createUuidv4() {
    return uuidv4();
}

// namespace
export function createUuidv5() {
    return uuidv5('www.heramo.com', uuidv5.DNS);
}
