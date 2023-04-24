import { TfilmeDB } from "../types";
import { BaseDatabase } from "./Basedatabase";

export class FilmDatabase extends BaseDatabase{
    public static TABLE_FILMS = "films"

    public async findFilms(q:string | undefined):Promise<TfilmeDB[]>{

        //find by id
       
        let usersDB

        if (q) {
            const result: TfilmeDB[] = await BaseDatabase.connection(FilmDatabase.TABLE_FILMS).where("id", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: TfilmeDB[] = await BaseDatabase.connection(FilmDatabase.TABLE_FILMS)
            usersDB = result
        }
        return usersDB
    }

    public async findfilmById(id:string):Promise<TfilmeDB[] | undefined[]>{
        const filmDB:TfilmeDB[] | undefined[] = await BaseDatabase.connection(FilmDatabase.TABLE_FILMS).where({id})
        return filmDB
    }

    public async insertFilm(newFilmDB:TfilmeDB):Promise<void>{
        await BaseDatabase.connection(FilmDatabase.TABLE_FILMS).insert(newFilmDB)
    }

    public async editFilm(newFilmDB:TfilmeDB, id:string):Promise<void>{
        await BaseDatabase.connection(FilmDatabase.TABLE_FILMS).update(newFilmDB).where({id: id})
    }
    public async deleteFilm(id:string):Promise<void>{
        await BaseDatabase.connection(FilmDatabase.TABLE_FILMS).del().where({id: id})
    }

    public async getallfilm():Promise<TfilmeDB[]>{
        
        let usersDB

        const result: TfilmeDB[] = await BaseDatabase.connection(FilmDatabase.TABLE_FILMS)
        usersDB = result

        return usersDB
    }
}