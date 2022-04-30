import * as dayjs from "dayjs";

export class Estudiante {
    $key!: string ;
    nombre!: string;
    apellidoP!: string;
    apellidoM!: string;
    matricula!: number;
    edad!: number;
    materias!: Array<string>;
    cuatrimestreCurso!: number;
    fechaRegistro: string;
    ultimaFechaAct!: string;
    estado: number = 1;

    constructor() {
        let fecha = new Date();
        this.fechaRegistro = dayjs(fecha).format('YYYY-MM-DD');
    }
}
