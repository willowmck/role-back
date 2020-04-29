export declare class User {
    create(req: any, res: any): Promise<any>;
    readMany(req: any, res: any): Promise<any>;
    readOne(req: any, res: any): Promise<any>;
}
export declare const userRoute: ({ create, readOne, readMany }: {
    create: any;
    readOne: any;
    readMany: any;
}) => import("express-serve-static-core").Router;
