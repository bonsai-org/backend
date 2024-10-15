import app from '../app'

export function bindApp() {
    app.listen(process.env.PORT, () => {
        console.log(`[LISTENING] on port ${process.env.PORT}`)
    })
}