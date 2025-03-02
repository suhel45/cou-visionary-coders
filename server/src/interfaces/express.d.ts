export interface CustomRequest extends Request {
    user: {
        id: string;
    };
}