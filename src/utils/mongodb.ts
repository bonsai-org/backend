export class MongooseUtils {
    static extractDuplicateKey(mongoError: any) {
        return Object.keys(mongoError.errorResponse.keyValue)[0]
    }
}