import express, { Request, Response } from 'express'
import cors from 'cors'
import { TfilmeDB } from './types'
import { db } from './database/knex'
import { Film } from './database/models/filme'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/filmes", async(req:Request, res:Response) =>{
    try {
        let filmsDB
        const result: TfilmeDB[] = await db("films")
        filmsDB = result

        const films:Film[] = filmsDB.map((filmDB) =>new Film(
            filmDB.id,
            filmDB.title,
            filmDB.duration,
            filmDB.created_at
        ))

        res.status(200).send(films)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/filmes", async(req:Request, res:Response) =>{
    try {
        const { id, title, duration } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            res.status(400)
            throw new Error("'titulo' deve ser string")
        }

        if (typeof duration !== "number") {
            res.status(400)
            throw new Error("'duration' deve ser number")
        }

        const [ filmDBExists ]: TfilmeDB[] | undefined[] = await db("films").where({ id })

        if (filmDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newFilm = new Film(
            id,
            title,
            duration,
            new Date().toISOString()
        )

        const newFilmDb: TfilmeDB = {
            id: newFilm.getId(),
            title: newFilm.getTitle(),
            duration: newFilm.getDuration(),
            created_at: newFilm.getCreatedAt()
        }

        await db("films").insert(newFilmDb)
        const [ filmDB ]: TfilmeDB[] = await db("films").where({ id })
        res.status(201).send(filmDB)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/filmes/:id", async(req:Request, res:Response) =>{
    try {

        // const {id} = req.params 

        const idrecebido = req.params.id as string

        if(idrecebido !== undefined){
            const [ filmDBExists ]: TfilmeDB[] | undefined[] = await db("films").where({id: idrecebido })
            if(filmDBExists){
                const newId = req.body.id as string|  undefined
                const newTitle = req.body.title as string|  undefined
                const newDuration = req.body.duration as number|  undefined

                if(newId !== undefined && newTitle !== undefined && newDuration !== undefined){
                    if(typeof newId !== "string" || typeof newTitle !== "string" || typeof newDuration !== "number"){
                        res.status(400)
                        throw new Error("Houve um erro de tipagem nos valores.")
                    }

                const newFilm = new Film(
                        newId,
                        newTitle,
                        newDuration,
                        new Date().toISOString()
                )

                const newFilmDb: TfilmeDB = {
                    id: newFilm.getId(),
                    title: newFilm.getTitle(),
                    duration: newFilm.getDuration(),
                    created_at: newFilm.getCreatedAt()
                }
                
                await db("films").update(newFilmDb).where({id: idrecebido})
                res.status(200).send("Usuário editado com sucesso!!")

                }

            }
        }
        else{
            res.status(400).send("Filme não encontrada")
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/filmes/:id", async(req:Request, res:Response) =>{
    try {
        // const idrecebido = req.params.id as string
        const {id} = req.params
        
        if(id !== undefined){
            const  [filmDBExists] : TfilmeDB[] | undefined[] = await db("films").where({id})
            if(filmDBExists){
                await db("films").del().where({id})
                res.status(200).send("Filme apagado com sucesso!!")
            }
            else{
                res.status(400).send("Filme não encontrado")
            }


        }
        else{
            res.status(400).send("id igual a null")
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})