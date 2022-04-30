import * as dayjs from "dayjs";

export class Estudiante {
    $id!: string;
    key?: string;
    nombre!: string;
    apellidoP!: string;
    apellidoM!: string;
    matricula!: string;
    edad!: string;
    materias!: Array<string>;
    cuatrimestreCurso!: string;
    fechaRegistro: string;
    ultimaFechaAct!: string;
    estado: string = "1";

    constructor() {
        let fecha = new Date();
        this.fechaRegistro = dayjs(fecha).format('YYYY-MM-DD');
    }
}
