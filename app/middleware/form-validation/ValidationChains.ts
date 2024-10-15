import Joi from 'joi';
import { SignUpRequest, LoginRequest, NewBonsaiRequest, BonsaiChapterMetadata } from '../types';
import {
    username,
    password,
    confirmPassword,
    email,
    hardinessZone,
    height,
    width,
    nebari,
    style,
    species,
    geoLocation,
    fileSize,
    sequencePosition,
    date,
    caption,
    fileType
} from './individual-fields';

class ValidationChain {

    // private chapterMetadata = Joi.array().items(
    //     Joi.object<BonsaiChapterMetadata>({
    //         fileSize,
    //         sequencePosition,
    //         date,
    //         caption,
    //         fileType
    //     })
    // ).required()

    signup = Joi.object<SignUpRequest>({
        username,
        password,
        confirmPassword,
        email,
    }).unknown();

    login = Joi.object<LoginRequest>({
        username,
        password,
    }).unknown();

    // createBonsai = Joi.object<NewBonsaiRequest>({
    //     hardinessZone,
    //     height,
    //     width,
    //     nebari,
    //     style,
    //     species,
    //     geoLocation,
    //     chapters: this.chapterMetadata
    // }).unknown()

}

export const ValidationChains = new ValidationChain()