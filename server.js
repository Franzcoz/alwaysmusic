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
        console.log(res);
        client.end();
        return
        }
    agregar();
    } else {
        console.log('\n\n   Para ingresar un nuevo alumno, se requieren 4 argumentos: Nombre, Rut, Curso y Nivel\n\n');
        client.end();
        return;
    }
} else if (args[0] == 'consulta') {
    asdasd
} else if (args[0] == 'editar') {
    asdasd
} else if (args[0] == 'rut') {
    asdasd
} else if (args[0] == 'eliminar') {
    asdsdasd
}
