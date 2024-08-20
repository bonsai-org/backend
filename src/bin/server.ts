import app from '../app'

const server = app.listen(process.env.PORT)

server.on('listening', () => {
    console.log(`[LISTENING] on port ${process.env.PORT}`)
})

server.on('error', (err) => {
    console.error(err.stack)
})

export default server