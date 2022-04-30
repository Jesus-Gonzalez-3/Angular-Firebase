import * as dayjs from "dayjs";

export class Materia {
    $id!: string;
    key?: string;
    clave?: string;
    nombre: string = "";
    totalCreditos: string = "";
    horasxsemana: string = "";
    fechaRegistro: string = "";
    ultimaFechaAct: string = "";
    cuatrimestrePertenece: string = "";
    estado: string = "1";
    constructor() {
        this.fechaRegistro = dayjs(new Date()).format('YYYY-MM-DD');
    }
}
