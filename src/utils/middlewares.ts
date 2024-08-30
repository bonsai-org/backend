import DOMPurify from 'isomorphic-dompurify';
import { Request } from 'express';

/*
 * Takes a potentially malicious string as input and removes anything
 * that DOMPurify has recognized as a potential vector for xss attacks
 */

export function sanitizeDirtyString(dirtyString: string): string {
  return DOMPurify.sanitize(dirtyString);
}

/*
 * Takes a string as input and returns a string with no html tags
 */

export function stripHTMLTags(cleanString: string): string {
  return cleanString.replace(/<[^>]*>/g, '');
}

/*
 * Returns a boolean indicating whether DOMPurify dedected
 * potential xss attack vectors in the supplied string
 */

export function isDirtyString(dirtyString: string): boolean {
  let cleanString = sanitizeDirtyString(dirtyString);
  return dirtyString.length !== cleanString.length ? true : false;
}

/*
 * Returns a boolean indicating whether any HTML tags were taken out of the
 * supplied string.
 */

export function containsHTMLTags(dirtyString: string): boolean {
  let cleanString = stripHTMLTags(dirtyString);
  return dirtyString.length !== cleanString.length ? true : false;
}

/*
 * This function will take a list of strings that represent all of the fields you expect
 * to be defined on req.body and the entire request object, and will return a list
 * of all the items that are suppose to be defined on req.body but that are actually undefined.
 */

export function getMissingBodyFields(
  req: Request,
  requiredFields: string[],
): string[] {
  let undefinedFields: string[] = [];
  for (let field of requiredFields) {
    if (typeof req.body[field] !== 'string') {
      undefinedFields.push(field);
    }
  }
  return undefinedFields;
}

/*
 * This function treats every entry in the fields array as a potential
 * key and searches req.body to see if an entry exists for that key.
 *
 * If an entry exists, it tests the corresponding value to see if it has
 * any known xss vectors and or if there are any html tags inside of the string.
 * If either are true, the corresponding value is pushed onto an array that is
 * eventually returned to the caller.
 */

export function getDirtyFields(req: Request, fields: string[]): string[] {
  let dirtyFields: string[] = [];
  for (let field of fields) {
    if (
      typeof req.body[field] === 'string' &&
      (isDirtyString(req.body[field]) || containsHTMLTags(req.body[field]))
    ) {
      dirtyFields.push(field);
    }
  }
  return dirtyFields;
}

export default {
  sanitizeDirtyString,
  stripHTMLTags,
  isDirtyString,
  containsHTMLTags,
};
