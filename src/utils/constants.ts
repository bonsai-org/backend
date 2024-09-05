export const __prod__ = (process.env.NODE_ENV === 'prod')
export const __dev__ = (process.env.NODE_ENV === 'dev')
export const __stage__ = (process.env.NODE_ENV === 'stage')
export const __local__ = (process.env.NODE_ENV === 'local')