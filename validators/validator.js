import { version as uuidVersion } from 'uuid';
import { validate as uuidValidate } from 'uuid';

import { CustomException } from '../exceptions/CustomExceptions.js';

const log = console.log;

const uuidValidateV4 = uuid => uuidValidate(uuid) && uuidVersion(uuid) === 4;

export const URLValidtor = urlArr => {
    if (urlArr.length > 2) throw new CustomException('Invalid URL', 'resource is not found', 404);

    if (urlArr.length === 2) {

        if (urlArr[0] !== 'person') throw new CustomException('Invalid URL', 'resource is not found', 404);

        if (!uuidValidateV4(urlArr[1])) throw new CustomException('Invalid PESON ID', 'PERSON ID is Invalid', 400);

    }

    if (urlArr.length === 1 && urlArr[0] !== 'person') throw new CustomException('Invalid URL', 'resource is not found', 404);
}

export const pathParamsValidator = PersonFields => {
    const requiredFields = ['name', 'age', 'hobbies'];
    const resultValidate = requiredFields.filter(el => {
        if (!PersonFields[el]) return el;
    })

    // log(resultValidate);
    // log(resultValidate.length);

    if (resultValidate.length) throw new CustomException('Required Filds', `Required Filds: ${resultValidate.join(', ')}`, 400);
}
