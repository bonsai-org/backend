import process from 'process'
import app from '../app'

async function main(): Promise<void> {
    try {
        app.listen(80, () => {
            console.log(`[LISTENING] on port ${} `)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}