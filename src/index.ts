import express, { Request, Response } from 'express'
import cors from 'cors'
import { TfilmeDB } from './types'
// import { db } from './database/Basedatabase'
import { Film } from './database/models/filme'
import { FilmDatabase } from './database/FilmDatabase'
import { FilmsController } from './controller/FilmsController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

// app.get("/ping", async (req: Request, res: Response) => {
//     try {
//         res.status(200).send({ message: "Pong!" })
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

const filmsController = new FilmsController

app.get("/filmes", filmsController.getAllMovies)

app.post("/filmes", filmsController.addNewMovie)

app.put("/filmes/:id", filmsController.editanMovie)

app.delete("/filmes/:id", filmsController.deleteaMovie)