import { Request, Response } from "express"
import { FilmDatabase } from "../database/FilmDatabase"
import { Film } from "../database/models/filme"
import { TfilmeDB } from "../types"
import { FilmsBusiness } from "../business/FilmsBusiness"


export class FilmsController{
    getAllMovies =  async(req:Request, res:Response) =>{
        try {
    
            // const q = req.query.q as string | undefined

            // const input ={
            //     q: req.query.q
            // }

            const filmbusiness = new FilmsBusiness()
            const output = await filmbusiness.getAllMovies()
    
            // const filmDataBase = new FilmDatabase()
    
            // const filmsDB = await filmDataBase.findFilms(q)
    
            // const films:Film[] = filmsDB.map((filmDB) =>new Film(
            //     filmDB.id,
            //     filmDB.title,
            //     filmDB.duration,
            //     filmDB.created_at
            // ))
    
            res.status(200).send(output)
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
    }

    getMoviebyId = async(req:Request, res:Response) =>{
        try {
                
            const input ={
                id: req.params.id
            }

            const filmBusiness = new FilmsBusiness()
            const output = await filmBusiness.getMovieByid(input)

    
            res.status(201).send(output)
            
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
    }

    addNewMovie = async(req:Request, res:Response) =>{
        try {
            // const { id, title, duration } = req.body
    
            const input ={
                id: req.body.id,
                title: req.body.title,
                duration: req.body.duration
            }

            const filmBusiness = new FilmsBusiness()
            const output = await filmBusiness.addNewMovie(input)

    
            res.status(201).send(output)
    
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
    }

    editanMovie = async(req:Request, res:Response) =>{
        try {
    
    
            // const {id} = req.params 
    
            const idrecebido = req.params.id as string
    
            if(idrecebido !== undefined){
            
            const filmDataBase = new FilmDatabase()
    
            const [filmsDB] = await filmDataBase.findfilmById(idrecebido)
                
                if(filmsDB){
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
                    
                    await filmDataBase.editFilm(newFilmDb, idrecebido)
                    res.status(200).send("Usuário editado com sucesso!!")
    
                    }
    
                }
                else{
                    res.status(400)
                    throw new Error("Id não encontrado!")
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
    }

    deleteaMovie =  async(req:Request, res:Response) =>{
        try {
            // const idrecebido = req.params.id as string
    
            const {id} = req.params
            
            if(id !== undefined){
                const filmDataBase = new FilmDatabase()
    
                const [filmsDB] = await filmDataBase.findfilmById(id)
    
                if(filmsDB){
    
                    await filmDataBase.deleteFilm(id)
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
    }
}