class AppError{
    public readonly httpStatus:number;
    public readonly message:string;

    constructor(httpStatus: number = 400, message: string){
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

export { AppError }