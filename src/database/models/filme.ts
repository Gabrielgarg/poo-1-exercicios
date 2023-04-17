export class Film{
    public constructor(
        private id:string,
        public title:string,
        private duration:number,
        private createdAt:string
    ){}

    public getId(): string{
        console.log("id foi acessado!")
        return this.id
    }
    public getTitle(): string{
        console.log("O titulo foi acessado!")
        return this.title
    }
    public getDuration(): number{
        console.log("A informacao de duracao foi acessada!")
        return this.duration
    }
    public getCreatedAt(): string{
        console.log("criado quando foi acessado!")
        return this.createdAt
    }
    public setId(newId:string) :void{
        console.log("id foi alterado!")
        this.id = newId
    }
    public setTitle(newTitle:string) :void{
        console.log("Titulo foi alterado!")
        this.title = newTitle
    }
    public setDuration(newDuration:number) :void{
        console.log("id foi alterado!")
        this.duration = newDuration
    }
    public setCreatedAt(newCreatedAt:string) :void{
        console.log("data foi alterada!")
        this.createdAt = newCreatedAt
    }
}