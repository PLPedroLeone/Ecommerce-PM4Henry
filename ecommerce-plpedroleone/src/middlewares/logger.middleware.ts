import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Ejecutando metodo ${req.method} en la ruta ${req.url} a las ${new Date().toLocaleString()}`,
  );
  next();
}
