import envVariables from './environment-variables'
import app from '../app'

const server = app.listen(envVariables.PORT)

server.on('listening', () => {
    console.log(`[LISTENING] on port ${envVariables.PORT}`)
})

server.on('error', (err) => {
    console.error(err.stack)
})

export default server