const { Client } = require('pg');

// Captura de argumentos (comandos)
const [prog, prog2, ...args] = process.argv

// Conexión a base de datos

const client = new Client({
    connectionString:
'postgresql://postgres:postgres@localhost:/alwaysmusic'
});

client.connect();

// Función de ayuda helpme para mostrar en caso de ejecutar sin argumentos

const helpme = () => {
    const mssg = '\n\n\n            Mensaje de ayuda de alwaysmusic server.\n\n\n   Debe ejecutar el programa de la siguiente manera:\n\n       node server.js (comando) (argumento)(s)...\n\n  Los comandos disponibles son:\n\n   nuevo - Para crear nuevo alumno\n\n   consulta - Para consultar los registros guardados\n\n   editar - Para editar un registro guardado\n\n   rut - Para consultar según el rut del alumno\n\n   eliminar - Para eliminar un registro existente\n\n';
    console.log(mssg);
    return;
}

// Condiciones para iniciar funciones

// Si no se agregan comandos, ejecutar ayuda y salir
if (args.length === 0) {
        helpme();
        client.end();
        return;
        
// Si se utiliza el comando 'nuevo'
} else if (args[0] == 'nuevo') {
    if (args.length === 5) {
        const nom = args[1];
        const rut = args[2];
        const cur = args[3];
        const niv = args[4];
        
        // Función asíncrona para agregar nuevo alumno
        async function agregar() {
        let res = await client.query(`insert into alumnos(nombre, rut, curso, nivel) values('${nom}', '${rut}', '${cur}', ${niv}) returning *`);
        console.log('Estudiante ingresado con éxito');
        client.end();
        return;
        }
    agregar();
    } else {
        console.log('\n\n   Para ingresar un nuevo alumno, se requieren 4 argumentos: Nombre, Rut, Curso y Nivel\n\n');
        client.end();
        return;
    }
} else if (args[0] == 'consulta') {
    async function consultar() {
        let res = await client.query('select * from alumnos');
        let reg = res.rows;
        console.log('Registro actual');
        console.log(reg);
        client.end();
        return;
        }
    consultar();
} else if (args[0] == 'editar') {
    if (args.length === 5) {
        const nom = args[1];
        const rut = args[2];
        const cur = args[3];
        const niv = args[4];
        async function editar() {
            let res = await client.query(`update alumnos set nombre = '${nom}', curso = '${cur}', nivel = ${niv} where rut = '${rut}' returning *`);
            let reg = res.rows;
            console.log(`Estudiante ${nom} editado con éxito`);
            client.end();
            return;
            }
        editar();
    } else {
        console.log('\n\n   Para editar un alumno, se requieren 4 argumentos: Nombre, Rut, Curso y Nivel\n\nRut es el único campo NO editable.');
        client.end();
        return;
    }
} else if (args[0] == 'rut') {
    if (args.length === 2) {
        const rut = args[1];
        async function consultar() {
            let res = await client.query(`select * from alumnos where rut = '${rut}'`);
            let reg = res.rows;
            console.log(reg);
            client.end();
            return;
            }
        consultar();
    } else {
        console.log('\n\n   Para consultar por Rut, debe ingresar como único argumento el RUT del alumno deseado.');
        client.end();
        return;
    }
} else if (args[0] == 'eliminar') {
    if (args.length === 2) {
        const rut = args[1];
        async function eliminar() {
            let res = await client.query(`delete from alumnos where rut = '${rut}'`);
            console.log(`Estudiante ${nom} eliminado con éxito`);
            client.end();
            return;
            }
        eliminar();
    } else {
        console.log('\n\n   Para eliminar un registro, debe ingresar como único argumento el RUT del alumno a eliminar.');
        client.end();
        return;
    }
}
