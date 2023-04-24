import { error } from "console"
import { FilmDatabase } from "../database/FilmDatabase"
import { Film } from "../database/models/filme"
import { TfilmeDB } from "../types"

export class FilmsBusiness {
    public getAllMovies = async () =>{

        // const {q} = input

        const filmDataBase = new FilmDatabase()
    
        const filmsDB = await filmDataBase.getallfilm()


        // const films:Film[] = filmsDB.map((filmDB) =>new Film(
        //     filmDB.id,
        //     filmDB.title,
        //     filmDB.duration,
        //     filmDB.created_at
        // ))

        return filmsDB
    }

    public getMovieByid = async (input:any) =>{
        const {id} = input

        if(!id){
            throw new Error("id precisa ser informado.")
        }
        if(typeof id !== "string"){
            throw new Error("id tem que ser uma string.")
        }
        const filmDataBase = new FilmDatabase()
    
        const filmsDB = await filmDataBase.findFilms(id)

        if (!filmsDB){
            throw new Error("Não achei o id patrão.")
        }


        // const films = new Film(
        //     filmsDB.id as string,
        //     filmsDB.title as string,
        //     filmsDB.duration as number,
        //     filmsDB.created_at as string 

        // )

        // const films:Film[] = filmsDB.map((filmDB) =>new Film(
        //     filmsDB.id,
        //     filmsDB.title,
        //     filmsDB.duration,
        //     filmsDB.created_at
        // ))

        return filmsDB
    }

    public addNewMovie = async (input:any) =>{

        const {id, title, duration} = input

        if (typeof id !== "string") {
            // res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof title !== "string") {
            // res.status(400)
            throw new Error("'titulo' deve ser string")
        }

        if (typeof duration !== "number") {
            // res.status(400)
            throw new Error("'duration' deve ser number")
        }

        const filmDatabase = new FilmDatabase()

        const [usersDB] = await filmDatabase.findfilmById(id)
        
        if (usersDB) {
            // res.status(400)
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
            
        await filmDatabase.insertFilm(newFilmDb)

        const output ={
            message: "Filme adicionado com sucesso!"
        }
        return output
    }
}