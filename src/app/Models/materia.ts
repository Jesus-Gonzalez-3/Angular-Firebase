import * as dayjs from "dayjs";

export class Materia {
    $key!: string;
    nombre: string = "";
    totalCreditos: number = 0;
    horasxsemana: number = 0;
    fechaRegistro: string = "";
    ultimaFechaAct: string = "";
    cuatrimestrePertenece: number = 0;
    estado = 1;
    constructor() {
        this.fechaRegistro = dayjs(new Date()).format('YYYY-MM-DD');
    }
}
