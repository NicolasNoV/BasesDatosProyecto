const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;

oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_23' });

// Configuración de la base de datos Oracle
const dbConfig = {
  user: 'admin1',
  password: 'admin123',
  connectString: 'localhost:1521/xe' // Cambia esto según tu configuración
};

  app.get('/api/data', async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(`SELECT * FROM docente`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener datos de la base de datos');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });

  const bodyParser = require('body-parser'); // Añadir al principio del archivo
  app.use(bodyParser.json()); // Middleware para parsear JSON
  
  app.post('/api/crear_examen', async (req, res) => {
    const {
      id_examen,
      nombre,
      descripcion,
      fechahora,
      tiempo,
      numero_preguntas,
      id_curso,
      peso,
      umbral_aprobacion
    } = req.body;
  
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           crear_examen(:id_examen, :nombre, :descripcion, :fechahora, :tiempo, :numero_preguntas, :id_curso, :peso, :umbral_aprobacion);
         END;`,
        {
          id_examen: { val: id_examen, type: oracledb.NUMBER },
          nombre: { val: nombre, type: oracledb.STRING },
          descripcion: { val: descripcion, type: oracledb.STRING },
          fechahora: { val: fechahora, type: oracledb.TIMESTAMP },
          tiempo: { val: tiempo, type: oracledb.NUMBER },
          numero_preguntas: { val: numero_preguntas, type: oracledb.NUMBER },
          id_curso: { val: id_curso, type: oracledb.NUMBER },
          peso: { val: peso, type: oracledb.NUMBER },
          umbral_aprobacion: { val: umbral_aprobacion, type: oracledb.NUMBER }
        }
      );
      res.status(200).json({ message: 'Examen creado exitosamente' });
    } catch (err) {
      console.error('Error creating exam:', err);
      res.status(500).json({ error: 'Error creating exam', details: err.message });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the database connection:', err);
        }
      }
    }
  });


  app.post('/api/agregar_pregunta_examen', async (req, res) => {
    const {
      id_preguntaexamen,
      id_examen,
      id_pregunta,
      porcentaje
    } = req.body;
  
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           agregar_pregunta_examen(:id_preguntaexamen, :id_examen, :id_pregunta, :porcentaje);
         END;`,
        {
          id_preguntaexamen: { val: id_preguntaexamen, type: oracledb.NUMBER },
          id_examen: { val: id_examen, type: oracledb.NUMBER },
          id_pregunta: { val: id_pregunta, type: oracledb.NUMBER },
          porcentaje: { val: porcentaje, type: oracledb.NUMBER }
        }
      );
      res.status(200).json({ message: 'Pregunta agregada exitosamente al examen' });
    } catch (err) {
      console.error('Error adding question to exam:', err);
      res.status(500).json({ error: 'Error adding question to exam', details: err.message });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the database connection:', err);
        }
      }
    }
  });
  

  app.post('/api/configurar_examen', async (req, res) => {
    const {
      id_examen,
      peso,
      umbral_aprobacion,
      fechahora,
      numero_preguntas
    } = req.body;
  
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           configurar_examen(:id_examen, :peso, :umbral_aprobacion, :fechahora, :numero_preguntas);
         END;`,
        {
          id_examen: { val: id_examen, type: oracledb.NUMBER },
          peso: { val: peso, type: oracledb.NUMBER },
          umbral_aprobacion: { val: umbral_aprobacion, type: oracledb.NUMBER },
          fechahora: { val: fechahora, type: oracledb.TIMESTAMP },
          numero_preguntas: { val: numero_preguntas, type: oracledb.NUMBER }
        }
      );
      res.status(200).json({ message: 'Examen configurado exitosamente' });
    } catch (err) {
      console.error('Error configuring exam:', err);
      res.status(500).json({ error: 'Error configuring exam', details: err.message });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the database connection:', err);
        }
      }
    }
  });

  
  app.post('/api/presentar_examen', async (req, res) => {
    const {
      id_presentacion,
      id_examen,
      id_estudiante,
      fecha,
      hora,
      duracion,
      calificacion,
      direccion_ip
    } = req.body;
  
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           presentar_examen(:id_presentacion, :id_examen, :id_estudiante, :fecha, :hora, :duracion, :calificacion, :direccion_ip);
         END;`,
        {
          id_presentacion: { val: id_presentacion, type: oracledb.NUMBER },
          id_examen: { val: id_examen, type: oracledb.NUMBER },
          id_estudiante: { val: id_estudiante, type: oracledb.NUMBER },
          fecha: { val: fecha, type: oracledb.DATE },
          hora: { val: hora, type: oracledb.TIMESTAMP },
          duracion: { val: duracion, type: oracledb.NUMBER },
          calificacion: { val: calificacion, type: oracledb.NUMBER },
          direccion_ip: { val: direccion_ip, type: oracledb.STRING }
        }
      );
      res.status(200).json({ message: 'Presentación de examen registrada exitosamente' });
    } catch (err) {
      console.error('Error registrando la presentación del examen:', err);
      res.status(500).json({ error: 'Error registrando la presentación del examen', details: err.message });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error cerrando la conexión a la base de datos:', err);
        }
      }
    }
  });


  app.get('/api/generar_estadistica', async (req, res) => {
    const idExamen = req.query.id_examen; // Obtener el ID de examen desde la solicitud
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(
        `BEGIN
           :cursor := generar_estadisticas(:id_examen);
         END;`,
        {
          id_examen: { val: idExamen, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
          cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }
      );
      const resultSet = result.outBinds.cursor;
      const data = await resultSet.getRows();
      await resultSet.close();
      res.json(data);
    } catch (err) {
      console.error('Error al obtener estadísticas:', err);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  });
  

  app.post('/api/crear_pregunta', async (req, res) => {
    const {
      id_pregunta,
      texto,
      tipo,
      respuestas_posibles,
      respuesta_correcta,
      publica,
      id_tema,
      id_profesor
    } = req.body;
  
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           crear_pregunta(:id_pregunta, :texto, :tipo, :respuestas_posibles,
                          :respuesta_correcta, :publica, :id_tema, :id_profesor);
         END;`,
        {
          id_pregunta: { val: id_pregunta, type: oracledb.NUMBER },
          texto: { val: texto, type: oracledb.STRING },
          tipo: { val: tipo, type: oracledb.STRING },
          respuestas_posibles: { val: respuestas_posibles, type: oracledb.STRING },
          respuesta_correcta: { val: respuesta_correcta, type: oracledb.STRING },
          publica: { val: publica, type: oracledb.NUMBER },
          id_tema: { val: id_tema, type: oracledb.NUMBER },
          id_profesor: { val: id_profesor, type: oracledb.NUMBER }
        }
      );
      res.status(200).json({ message: 'Pregunta creada exitosamente' });
    } catch (err) {
      console.error('Error al crear la pregunta:', err);
      res.status(500).json({ error: 'Error al crear la pregunta' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  });

  
  app.delete('/api/eliminar_pregunta/:id_pregunta', async (req, res) => {
    const idPregunta = req.params.id_pregunta;
  
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           eliminar_pregunta(:id_pregunta);
         END;`,
        {
          id_pregunta: { val: idPregunta, type: oracledb.NUMBER }
        }
      );
      res.status(200).json({ message: 'Pregunta eliminada exitosamente' });
    } catch (err) {
      console.error('Error al eliminar la pregunta:', err);
      res.status(500).json({ error: 'Error al eliminar la pregunta' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  });


  app.put('/api/actualizar_pregunta', async (req, res) => {
    const {
      id_pregunta,
      texto,
      tipo,
      respuestas_posibles,
      respuesta_correcta,
      publica,
      id_tema,
      id_profesor
    } = req.body;
  
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
           actualizar_pregunta(:id_pregunta, :texto, :tipo, :respuestas_posibles,
                               :respuesta_correcta, :publica, :id_tema, :id_profesor);
         END;`,
        {
          id_pregunta: { val: id_pregunta, type: oracledb.NUMBER },
          texto: { val: texto, type: oracledb.STRING },
          tipo: { val: tipo, type: oracledb.STRING },
          respuestas_posibles: { val: respuestas_posibles, type: oracledb.STRING },
          respuesta_correcta: { val: respuesta_correcta, type: oracledb.STRING },
          publica: { val: publica, type: oracledb.NUMBER },
          id_tema: { val: id_tema, type: oracledb.NUMBER },
          id_profesor: { val: id_profesor, type: oracledb.NUMBER }
        }
      );
      res.status(200).json({ message: 'Pregunta actualizada exitosamente' });
    } catch (err) {
      console.error('Error al actualizar la pregunta:', err);
      res.status(500).json({ error: 'Error al actualizar la pregunta' });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  });


app.get('/api/buscar_pregunta/:id_pregunta', async (req, res) => {
  const idPregunta = req.params.id_pregunta;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         buscar_pregunta(:id_pregunta, :o_texto, :o_tipo, :o_respuestas_posibles,
                         :o_respuesta_correcta, :o_publica, :o_id_tema, :o_id_profesor);
       END;`,
      {
        id_pregunta: { val: idPregunta, type: oracledb.NUMBER },
        o_texto: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        o_tipo: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        o_respuestas_posibles: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        o_respuesta_correcta: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        o_publica: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        o_id_tema: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        o_id_profesor: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      }
    );
    const pregunta = {
      texto: result.outBinds.o_texto,
      tipo: result.outBinds.o_tipo,
      respuestas_posibles: result.outBinds.o_respuestas_posibles,
      respuesta_correcta: result.outBinds.o_respuesta_correcta,
      publica: result.outBinds.o_publica,
      id_tema: result.outBinds.o_id_tema,
      id_profesor: result.outBinds.o_id_profesor
    };
    res.status(200).json(pregunta);
  } catch (err) {
    console.error('Error al buscar la pregunta:', err);
    res.status(500).json({ error: 'Error al buscar la pregunta' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.post('/api/crear_estudiante', async (req, res) => {
  const {
    id_estudiante,
    nombre,
    correo_electronico
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         crear_estudiante(:id_estudiante, :nombre, :correo_electronico);
       END;`,
      {
        id_estudiante: { val: id_estudiante, type: oracledb.NUMBER },
        nombre: { val: nombre, type: oracledb.STRING },
        correo_electronico: { val: correo_electronico, type: oracledb.STRING }
      }
    );
    res.status(200).json({ message: 'Estudiante creado exitosamente' });
  } catch (err) {
    console.error('Error al crear el estudiante:', err);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.delete('/api/eliminar_estudiante/:id_estudiante', async (req, res) => {
  const idEstudiante = req.params.id_estudiante;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         eliminar_estudiante(:id_estudiante);
       END;`,
      {
        id_estudiante: { val: idEstudiante, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el estudiante:', err);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.put('/api/actualizar_estudiante', async (req, res) => {
  const {
    id_estudiante,
    nombre,
    correo_electronico
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         actualizar_estudiante(:id_estudiante, :nombre, :correo_electronico);
       END;`,
      {
        id_estudiante: { val: id_estudiante, type: oracledb.NUMBER },
        nombre: { val: nombre, type: oracledb.STRING },
        correo_electronico: { val: correo_electronico, type: oracledb.STRING }
      }
    );
    res.status(200).json({ message: 'Estudiante actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el estudiante:', err);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/buscar_estudiante/:id_estudiante', async (req, res) => {
  const idEstudiante = req.params.id_estudiante;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         buscar_estudiante(:id_estudiante, :o_nombre, :o_correo_electronico);
       END;`,
      {
        id_estudiante: { val: idEstudiante, type: oracledb.NUMBER },
        o_nombre: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        o_correo_electronico: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
      }
    );
    const estudiante = {
      nombre: result.outBinds.o_nombre,
      correo_electronico: result.outBinds.o_correo_electronico
    };
    res.status(200).json(estudiante);
  } catch (err) {
    console.error('Error al buscar el estudiante:', err);
    res.status(500).json({ error: 'Error al buscar el estudiante' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.post('/api/crear_docente', async (req, res) => {
  const {
    id_docente,
    nombre,
    correo_electronico
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         crear_docente(:id_docente, :nombre, :correo_electronico);
       END;`,
      {
        id_docente: { val: id_docente, type: oracledb.NUMBER },
        nombre: { val: nombre, type: oracledb.STRING },
        correo_electronico: { val: correo_electronico, type: oracledb.STRING }
      }
    );
    res.status(200).json({ message: 'Docente creado exitosamente' });
  } catch (err) {
    console.error('Error al crear el docente:', err);
    res.status(500).json({ error: 'Error al crear el docente' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.delete('/api/eliminar_docente/:id_docente', async (req, res) => {
  const idDocente = req.params.id_docente;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         eliminar_docente(:id_docente);
       END;`,
      {
        id_docente: { val: idDocente, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({ message: 'Docente eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el docente:', err);
    res.status(500).json({ error: 'Error al eliminar el docente' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.put('/api/actualizar_docente', async (req, res) => {
  const {
    id_docente,
    nombre,
    correo_electronico
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         actualizar_docente(:id_docente, :nombre, :correo_electronico);
       END;`,
      {
        id_docente: { val: id_docente, type: oracledb.NUMBER },
        nombre: { val: nombre, type: oracledb.STRING },
        correo_electronico: { val: correo_electronico, type: oracledb.STRING }
      }
    );
    res.status(200).json({ message: 'Docente actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el docente:', err);
    res.status(500).json({ error: 'Error al actualizar el docente' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/buscar_docente/:id_docente', async (req, res) => {
  const idDocente = req.params.id_docente;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         buscar_docente(:id_docente, :o_nombre, :o_correo_electronico);
       END;`,
      {
        id_docente: { val: idDocente, type: oracledb.NUMBER },
        o_nombre: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        o_correo_electronico: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
      }
    );
    const docente = {
      nombre: result.outBinds.o_nombre,
      correo_electronico: result.outBinds.o_correo_electronico
    };
    res.status(200).json(docente);
  } catch (err) {
    console.error('Error al buscar el docente:', err);
    res.status(500).json({ error: 'Error al buscar el docente' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.post('/api/crear_grupo', async (req, res) => {
  const {
    id_grupo,
    nombre,
    id_curso
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         crear_grupo(:id_grupo, :nombre, :id_curso);
       END;`,
      {
        id_grupo: { val: id_grupo, type: oracledb.NUMBER },
        nombre: { val: nombre, type: oracledb.STRING },
        id_curso: { val: id_curso, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({ message: 'Grupo creado exitosamente' });
  } catch (err) {
    console.error('Error al crear el grupo:', err);
    res.status(500).json({ error: 'Error al crear el grupo' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.delete('/api/eliminar_grupo/:id_grupo', async (req, res) => {
  const idGrupo = req.params.id_grupo;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         eliminar_grupo(:id_grupo);
       END;`,
      {
        id_grupo: { val: idGrupo, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({ message: 'Grupo eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el grupo:', err);
    res.status(500).json({ error: 'Error al eliminar el grupo' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.put('/api/actualizar_grupo/:id_grupo', async (req, res) => {
  const idGrupo = req.params.id_grupo;
  const { nombre, id_curso } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         actualizar_grupo(:id_grupo, :nombre, :id_curso);
       END;`,
      {
        id_grupo: { val: idGrupo, type: oracledb.NUMBER },
        nombre: { val: nombre, type: oracledb.STRING },
        id_curso: { val: id_curso, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({ message: 'Grupo actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el grupo:', err);
    res.status(500).json({ error: 'Error al actualizar el grupo' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/buscar_grupo/:id_grupo', async (req, res) => {
  const idGrupo = req.params.id_grupo;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         buscar_grupo(:id_grupo, :nombre, :id_curso);
       END;`,
      {
        id_grupo: { val: idGrupo, type: oracledb.NUMBER },
        nombre: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        id_curso: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({
      nombre: result.outBinds.nombre,
      id_curso: result.outBinds.id_curso
    });
  } catch (err) {
    console.error('Error al buscar el grupo:', err);
    res.status(500).json({ error: 'Error al buscar el grupo' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.delete('/api/eliminar_examen/:idExamen', async (req, res) => {
  const { idExamen } = req.params;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         eliminar_examen(:id_examen);
       END;`,
      {
        id_examen: { val: idExamen, type: oracledb.NUMBER, dir: oracledb.BIND_IN }
      }
    );
    res.status(200).json({ message: 'Examen eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el examen:', err);
    res.status(500).json({ error: 'Error al eliminar el examen' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.put('/api/actualizar_examen/:idExamen', async (req, res) => {
  const { idExamen } = req.params;
  const {
    nombre,
    descripcion,
    fechahora,
    tiempo,
    numero_preguntas,
    id_curso,
    peso,
    umbral_aprobacion
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         actualizar_examen(:id_examen, :nombre, :descripcion, :fechahora, :tiempo, :numero_preguntas, :id_curso, :peso, :umbral_aprobacion);
       END;`,
      {
        id_examen: { val: idExamen, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        nombre: { val: nombre, type: oracledb.STRING, dir: oracledb.BIND_IN },
        descripcion: { val: descripcion, type: oracledb.STRING, dir: oracledb.BIND_IN },
        fechahora: { val: fechahora, type: oracledb.TIMESTAMP, dir: oracledb.BIND_IN },
        tiempo: { val: tiempo, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        numero_preguntas: { val: numero_preguntas, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        id_curso: { val: id_curso, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        peso: { val: peso, type: oracledb.FLOAT, dir: oracledb.BIND_IN },
        umbral_aprobacion: { val: umbral_aprobacion, type: oracledb.FLOAT, dir: oracledb.BIND_IN }
      }
    );
    res.status(200).json({ message: 'Examen actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el examen:', err);
    res.status(500).json({ error: 'Error al actualizar el examen' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/buscar_examen/:idExamen', async (req, res) => {
  const { idExamen } = req.params;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         buscar_examen(:id_examen, :nombre, :descripcion, :fechahora, :tiempo, :numero_preguntas, :id_curso, :peso, :umbral_aprobacion);
       END;`,
      {
        id_examen: { val: idExamen, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        nombre: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        descripcion: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        fechahora: { type: oracledb.TIMESTAMP, dir: oracledb.BIND_OUT },
        tiempo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        numero_preguntas: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        id_curso: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        peso: { type: oracledb.FLOAT, dir: oracledb.BIND_OUT },
        umbral_aprobacion: { type: oracledb.FLOAT, dir: oracledb.BIND_OUT }
      }
    );

    const examen = {
      nombre: result.outBinds.nombre[0],
      descripcion: result.outBinds.descripcion[0],
      fechahora: result.outBinds.fechahora[0],
      tiempo: result.outBinds.tiempo[0],
      numero_preguntas: result.outBinds.numero_preguntas[0],
      id_curso: result.outBinds.id_curso[0],
      peso: result.outBinds.peso[0],
      umbral_aprobacion: result.outBinds.umbral_aprobacion[0]
    };

    res.status(200).json(examen);
  } catch (err) {
    console.error('Error al buscar el examen:', err);
    res.status(500).json({ error: 'Error al buscar el examen' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.post('/api/crear_curso', async (req, res) => {
  const {
    nombre,
    planEstudio,
    horario,
    idProfesor
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         crear_curso(:nombre, :plan_estudio, :horario, :id_profesor);
       END;`,
      {
        nombre: { val: nombre, type: oracledb.STRING, dir: oracledb.BIND_IN },
        plan_estudio: { val: planEstudio, type: oracledb.STRING, dir: oracledb.BIND_IN },
        horario: { val: horario, type: oracledb.STRING, dir: oracledb.BIND_IN },
        id_profesor: { val: idProfesor, type: oracledb.NUMBER, dir: oracledb.BIND_IN }
      }
    );

    res.status(200).json({ message: 'Curso creado exitosamente' });
  } catch (err) {
    console.error('Error al crear el curso:', err);
    res.status(500).json({ error: 'Error al crear el curso' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.post('/api/eliminar_curso', async (req, res) => {
  const { idCurso } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         eliminar_curso(:id_curso);
       END;`,
      {
        id_curso: { val: idCurso, type: oracledb.NUMBER, dir: oracledb.BIND_IN }
      }
    );

    res.status(200).json({ message: 'Curso eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar el curso:', err);
    res.status(500).json({ error: 'Error al eliminar el curso' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.put('/api/actualizar_curso', async (req, res) => {
  const {
    idCurso,
    nombre,
    planEstudio,
    horario,
    idProfesor
  } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         actualizar_curso(:id_curso, :nombre, :plan_estudio, :horario, :id_profesor);
       END;`,
      {
        id_curso: { val: idCurso, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        nombre: { val: nombre, type: oracledb.STRING, dir: oracledb.BIND_IN },
        plan_estudio: { val: planEstudio, type: oracledb.STRING, dir: oracledb.BIND_IN },
        horario: { val: horario, type: oracledb.STRING, dir: oracledb.BIND_IN },
        id_profesor: { val: idProfesor, type: oracledb.NUMBER, dir: oracledb.BIND_IN }
      }
    );

    res.status(200).json({ message: 'Curso actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar el curso:', err);
    res.status(500).json({ error: 'Error al actualizar el curso' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/buscar_curso', async (req, res) => {
  const { idCurso } = req.query; // Usamos req.query para obtener el parámetro de la URL

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         buscar_curso(:id_curso, :nombre, :plan_estudio, :horario, :id_profesor);
       END;`,
      {
        id_curso: { val: idCurso, type: oracledb.NUMBER, dir: oracledb.BIND_IN },
        nombre: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        plan_estudio: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        horario: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        id_profesor: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      }
    );

    const nombre = result.outBinds.nombre;
    const planEstudio = result.outBinds.plan_estudio;
    const horario = result.outBinds.horario;
    const idProfesor = result.outBinds.id_profesor;

    res.status(200).json({ nombre, planEstudio, horario, idProfesor });
  } catch (err) {
    console.error('Error al buscar el curso:', err);
    res.status(500).json({ error: 'Error al buscar el curso' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.use(express.json());

app.post('/api/registrar_estudiante_curso', async (req, res) => {
  const { id_grupo, id_estudiante } = req.body;

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `BEGIN
         registrar_estudiante_curso(:p_id_grupo, :p_id_estudiante);
       END;`,
      {
        p_id_grupo: { val: id_grupo, type: oracledb.NUMBER },
        p_id_estudiante: { val: id_estudiante, type: oracledb.NUMBER }
      }
    );
    res.status(200).json({ message: 'Estudiante registrado en el curso' });
  } catch (err) {
    console.error('Error al registrar estudiante en curso:', err);
    res.status(500).json({ error: 'Error al registrar estudiante en curso', details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/ver_plan_estudio/:id_curso', async (req, res) => {
  const idCurso = parseInt(req.params.id_curso);

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         ver_plan_estudio(:p_id_curso, :v_plan_estudio);
       END;`,
      {
        p_id_curso: { val: idCurso, type: oracledb.NUMBER },
        v_plan_estudio: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
      }
    );
    const planEstudio = result.outBinds.v_plan_estudio;
    res.status(200).json({ plan_estudio: planEstudio });
  } catch (err) {
    console.error('Error al obtener el plan de estudio:', err);
    res.status(500).json({ error: 'Error al obtener el plan de estudio', details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});


app.get('/api/ver_horario_curso/:id_curso', async (req, res) => {
  const idCurso = parseInt(req.params.id_curso);

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         ver_horario_curso(:p_id_curso, :v_horario);
       END;`,
      {
        p_id_curso: { val: idCurso, type: oracledb.NUMBER },
        v_horario: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
      }
    );
    const horarioCurso = result.outBinds.v_horario;
    res.status(200).json({ horario_curso: horarioCurso });
  } catch (err) {
    console.error('Error al obtener el horario del curso:', err);
    res.status(500).json({ error: 'Error al obtener el horario del curso', details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});

  
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
