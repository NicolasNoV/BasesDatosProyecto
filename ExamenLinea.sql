-- Crear TABLESPACE
CREATE TABLESPACE proyecto_ts
DATAFILE 'C:/oraclexe/app/oracle/oradata/XE/examen_linea.dbf' 
SIZE 100M
AUTOEXTEND ON 
NEXT 10M 
MAXSIZE 2G;

-- Crear Tablas

-- Crear Tabla Docente
CREATE TABLE Docente (
    ID_Docente INT PRIMARY KEY,
    Nombre VARCHAR2(100),
    Correo_Electronico VARCHAR2(100)
) TABLESPACE proyecto_ts;

-- Crear Tabla Estudiante
CREATE TABLE Estudiante (
    ID_Estudiante INT PRIMARY KEY,
    Nombre VARCHAR2(100),
    Correo_Electronico VARCHAR2(100)
) TABLESPACE proyecto_ts;

-- Crear Tabla Curso
CREATE TABLE Curso (
    ID_Curso INT PRIMARY KEY,
    Nombre VARCHAR2(100),
    Plan_Estudio VARCHAR2(4000),
    Horario VARCHAR2(100),
    ID_Profesor INT,
    FOREIGN KEY (ID_Profesor) REFERENCES Docente(ID_Docente)
) TABLESPACE proyecto_ts;

-- Crear Tabla Grupo
CREATE TABLE Grupo (
    ID_Grupo INT PRIMARY KEY,
    Nombre VARCHAR2(100),
    ID_Curso INT,
    FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
) TABLESPACE proyecto_ts;

-- Crear Tabla GrupoEstudiante
CREATE TABLE GrupoEstudiante (
    ID_Grupo INT,
    ID_Estudiante INT,
    PRIMARY KEY (ID_Grupo, ID_Estudiante),
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID_Grupo),
    FOREIGN KEY (ID_Estudiante) REFERENCES Estudiante(ID_Estudiante)
) TABLESPACE proyecto_ts;

-- Crear Tabla Tema
CREATE TABLE Tema (
    ID_Tema INT PRIMARY KEY,
    Nombre VARCHAR2(100),
    ID_Curso INT,
    FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
) TABLESPACE proyecto_ts;

-- Crear Tabla BancoPreguntas
CREATE TABLE BancoPreguntas (
    ID_Pregunta INT PRIMARY KEY,
    Texto VARCHAR2(4000),
    Tipo VARCHAR2(50),
    RespuestasPosibles VARCHAR2(4000),
    RespuestaCorrecta VARCHAR2(4000),
    Publica NUMBER(1),
    ID_Tema INT,
    ID_Profesor INT,
    FOREIGN KEY (ID_Tema) REFERENCES Tema(ID_Tema),
    FOREIGN KEY (ID_Profesor) REFERENCES Docente(ID_Docente)
) TABLESPACE proyecto_ts;

-- Crear Tabla Examen
CREATE TABLE Examen (
    ID_Examen INT PRIMARY KEY,
    Nombre VARCHAR2(100),
    Descripcion VARCHAR2(4000),
    FechaHora TIMESTAMP,
    Tiempo INT,
    NumeroPreguntas INT,
    ID_Curso INT,
    Peso FLOAT,
    UmbralAprobacion FLOAT,
    FOREIGN KEY (ID_Curso) REFERENCES Curso(ID_Curso)
) TABLESPACE proyecto_ts;

-- Crear Tabla PreguntaExamen
CREATE TABLE PreguntaExamen (
    ID_PreguntaExamen INT PRIMARY KEY,
    ID_Examen INT,
    ID_Pregunta INT,
    Porcentaje FLOAT,
    FOREIGN KEY (ID_Examen) REFERENCES Examen(ID_Examen),
    FOREIGN KEY (ID_Pregunta) REFERENCES BancoPreguntas(ID_Pregunta)
) TABLESPACE proyecto_ts;

-- Crear Tabla PresentacionExamen
CREATE TABLE PresentacionExamen (
    ID_Presentacion INT PRIMARY KEY,
    ID_Examen INT,
    ID_Estudiante INT,
    Fecha DATE,
    Hora TIMESTAMP,
    Duracion INT,
    Calificacion FLOAT,
    DireccionIP VARCHAR2(15),
    FOREIGN KEY (ID_Examen) REFERENCES Examen(ID_Examen),
    FOREIGN KEY (ID_Estudiante) REFERENCES Estudiante(ID_Estudiante)
) TABLESPACE proyecto_ts;

-- Crear Tabla Respuesta
CREATE TABLE Respuesta (
    ID_Respuesta INT PRIMARY KEY,
    ID_PreguntaExamen INT,
    ID_Estudiante INT,
    Respuesta VARCHAR2(4000),
    Correcta NUMBER(1),
    FOREIGN KEY (ID_PreguntaExamen) REFERENCES PreguntaExamen(ID_PreguntaExamen),
    FOREIGN KEY (ID_Estudiante) REFERENCES Estudiante(ID_Estudiante)
) TABLESPACE proyecto_ts;

-- Crear Tabla Usuarios
CREATE TABLE Usuarios (
    idUsuario INT PRIMARY KEY,
    nombreUsuario VARCHAR2(100),
    contrasena VARCHAR2(100),
    tipoUsuario VARCHAR2(20) CHECK (tipoUsuario IN ('administrador', 'profesor'))
) TABLESPACE proyecto_ts;



-- Poblar Tablas

-- Poblar Tabla Docente
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Docente (ID_Docente, Nombre, Correo_Electronico) 
        VALUES (i, 'Docente' || i, 'docente' || i || '@example.com');
    END LOOP;
END;
/

-- Poblar Tabla Estudiante
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Estudiante (ID_Estudiante, Nombre, Correo_Electronico) 
        VALUES (i, 'Estudiante' || i, 'estudiante' || i || '@example.com');
    END LOOP;
END;
/

-- Poblar Tabla Curso
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Curso (ID_Curso, Nombre, Plan_Estudio, Horario, ID_Profesor) 
        VALUES (i, 'Curso' || i, 'Plan de Estudio para Curso ' || i, 'Horario ' || i, i);
    END LOOP;
END;
/

-- Poblar Tabla Grupo
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Grupo (ID_Grupo, Nombre, ID_Curso) 
        VALUES (i, 'Grupo' || i, i);
    END LOOP;
END;
/

-- Poblar Tabla GrupoEstudiante
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO GrupoEstudiante (ID_Grupo, ID_Estudiante) 
        VALUES (i, i);
    END LOOP;
END;
/

-- Poblar Tabla Tema
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Tema (ID_Tema, Nombre, ID_Curso) 
        VALUES (i, 'Tema' || i, i);
    END LOOP;
END;
/

-- Poblar Tabla BancoPreguntas
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO BancoPreguntas (ID_Pregunta, Texto, Tipo, RespuestasPosibles, RespuestaCorrecta, Publica, ID_Tema, ID_Profesor) 
        VALUES (i, 'Pregunta ' || i, 'Tipo ' || i, 'Respuestas Posibles ' || i, 'Respuesta Correcta ' || i, 1, i, i);
    END LOOP;
END;
/

-- Poblar Tabla Examen
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Examen (ID_Examen, Nombre, Descripcion, FechaHora, Tiempo, NumeroPreguntas, ID_Curso, Peso, UmbralAprobacion) 
        VALUES (i, 'Examen ' || i, 'Descripción del Examen ' || i, SYSTIMESTAMP, 60, 10, i, 1.0, 0.7);
    END LOOP;
END;
/

-- Poblar Tabla PreguntaExamen
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO PreguntaExamen (ID_PreguntaExamen, ID_Examen, ID_Pregunta, Porcentaje) 
        VALUES (i, i, i, 1.0);
    END LOOP;
END;
/

-- Poblar Tabla PresentacionExamen
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO PresentacionExamen (ID_Presentacion, ID_Examen, ID_Estudiante, Fecha, Hora, Duracion, Calificacion, DireccionIP) 
        VALUES (i, i, i, SYSDATE, SYSTIMESTAMP, 60, 0, '192.168.1.' || i);
    END LOOP;
END;
/

-- Poblar Tabla Respuesta
BEGIN
    FOR i IN 1..25 LOOP
        INSERT INTO Respuesta (ID_Respuesta, ID_PreguntaExamen, ID_Estudiante, Respuesta, Correcta) 
        VALUES (i, i, i, 'Respuesta ' || i, 1);
    END LOOP;
END;
/

-- Poblar Tabla Usuarios
CREATE OR REPLACE PROCEDURE insertar_usuarios IS
BEGIN
    -- Insertar un usuario administrador
    INSERT INTO Usuarios (idUsuario, nombreUsuario, contrasena, tipoUsuario)
    VALUES (1, 'admin', 'admin123', 'administrador');
    
    -- Insertar un usuario profesor
    INSERT INTO Usuarios (idUsuario, nombreUsuario, contrasena, tipoUsuario)
    VALUES (2, 'profesor', 'profesor123', 'profesor');
    
    -- Salida opcional para confirmar la inserción de los usuarios
    DBMS_OUTPUT.PUT_LINE('Usuario administrador y profesor insertados correctamente.');
END;
/
BEGIN
    insertar_usuarios;
END;
/


-- Metodos

-- Crear un Quiz o Examen
CREATE OR REPLACE PROCEDURE crear_examen(
    p_id_examen INT,
    p_nombre VARCHAR2,
    p_descripcion VARCHAR2,
    p_fechahora TIMESTAMP,
    p_tiempo INT,
    p_numero_preguntas INT,
    p_id_curso INT,
    p_peso FLOAT,
    p_umbral_aprobacion FLOAT
) IS
BEGIN
    INSERT INTO Examen (
        ID_Examen, Nombre, Descripcion, FechaHora, Tiempo, NumeroPreguntas,
        ID_Curso, Peso, UmbralAprobacion
    ) VALUES (
        p_id_examen, p_nombre, p_descripcion, p_fechahora, p_tiempo,
        p_numero_preguntas, p_id_curso, p_peso, p_umbral_aprobacion
    );
END;
/

-- Agregar Preguntas a un Quiz
CREATE OR REPLACE PROCEDURE agregar_pregunta_examen(
    p_id_preguntaexamen INT,
    p_id_examen INT,
    p_id_pregunta INT,
    p_porcentaje FLOAT
) IS
BEGIN
    INSERT INTO PreguntaExamen (
        ID_PreguntaExamen, ID_Examen, ID_Pregunta, Porcentaje
    ) VALUES (
        p_id_preguntaexamen, p_id_examen, p_id_pregunta, p_porcentaje
    );
END;
/

-- Configurar Examen
CREATE OR REPLACE PROCEDURE configurar_examen(
    p_id_examen INT,
    p_peso FLOAT,
    p_umbral_aprobacion FLOAT,
    p_fechahora TIMESTAMP,
    p_numero_preguntas INT
) IS
BEGIN
    UPDATE Examen
    SET Peso = p_peso,
        UmbralAprobacion = p_umbral_aprobacion,
        FechaHora = p_fechahora,
        NumeroPreguntas = p_numero_preguntas
    WHERE ID_Examen = p_id_examen;
END;
/

-- Presentación del Examen
CREATE OR REPLACE PROCEDURE presentar_examen(
    p_id_presentacion INT,
    p_id_examen INT,
    p_id_estudiante INT,
    p_fecha DATE,
    p_hora TIMESTAMP,
    p_duracion INT,
    p_calificacion FLOAT,
    p_direccion_ip VARCHAR2
) IS
BEGIN
    INSERT INTO PresentacionExamen (
        ID_Presentacion, ID_Examen, ID_Estudiante, Fecha, Hora, Duracion,
        Calificacion, DireccionIP
    ) VALUES (
        p_id_presentacion, p_id_examen, p_id_estudiante, p_fecha, p_hora,
        p_duracion, p_calificacion, p_direccion_ip
    );
END;
/

-- Generar estadisticas
CREATE OR REPLACE PROCEDURE generar_estadisticas(
    p_id_examen INT,
    p_cursor OUT SYS_REFCURSOR
) IS
BEGIN
    OPEN p_cursor FOR
    SELECT ID_Estudiante, Calificacion, Fecha, Hora, Duracion, DireccionIP
    FROM PresentacionExamen
    WHERE ID_Examen = p_id_examen;
END generar_estadisticas;
/

-- Crear Preguntas
CREATE OR REPLACE PROCEDURE crear_pregunta(
    p_id_pregunta INT,
    p_texto VARCHAR2,
    p_tipo VARCHAR2,
    p_respuestas_posibles VARCHAR2,
    p_respuesta_correcta VARCHAR2,
    p_publica NUMBER,
    p_id_tema INT,
    p_id_profesor INT
) IS
BEGIN
    INSERT INTO BancoPreguntas (
        ID_Pregunta, Texto, Tipo, RespuestasPosibles, RespuestaCorrecta,
        Publica, ID_Tema, ID_Profesor
    ) VALUES (
        p_id_pregunta, p_texto, p_tipo, p_respuestas_posibles,
        p_respuesta_correcta, p_publica, p_id_tema, p_id_profesor
    );
END;
/

-- Eliminar Pregunta del Banco de Preguntas
CREATE OR REPLACE PROCEDURE eliminar_pregunta(
    p_id_pregunta INT
) IS
BEGIN
    DELETE FROM BancoPreguntas WHERE ID_Pregunta = p_id_pregunta;
END;
/

-- Actualizar Pregunta del Banco de Preguntas
CREATE OR REPLACE PROCEDURE actualizar_pregunta (
    p_id_pregunta INT,
    p_texto VARCHAR2,
    p_tipo VARCHAR2,
    p_respuestas_posibles VARCHAR2,
    p_respuesta_correcta VARCHAR2,
    p_publica NUMBER,
    p_id_tema INT,
    p_id_profesor INT
) IS
BEGIN
    UPDATE BancoPreguntas
    SET Texto = p_texto,
        Tipo = p_tipo,
        RespuestasPosibles = p_respuestas_posibles,
        RespuestaCorrecta = p_respuesta_correcta,
        Publica = p_publica,
        ID_Tema = p_id_tema,
        ID_Profesor = p_id_profesor
    WHERE ID_Pregunta = p_id_pregunta;
END;
/

-- Buscar Pregunta del Banco de Preguntas
CREATE OR REPLACE PROCEDURE buscar_pregunta(
    p_id_pregunta INT,
    o_texto OUT VARCHAR2,
    o_tipo OUT VARCHAR2,
    o_respuestas_posibles OUT VARCHAR2,
    o_respuesta_correcta OUT VARCHAR2,
    o_publica OUT NUMBER,
    o_id_tema OUT INT,
    o_id_profesor OUT INT
) IS
BEGIN
    SELECT Texto, Tipo, RespuestasPosibles, RespuestaCorrecta, Publica, ID_Tema, ID_Profesor
    INTO o_texto, o_tipo, o_respuestas_posibles, o_respuesta_correcta, o_publica, o_id_tema, o_id_profesor
    FROM BancoPreguntas
    WHERE ID_Pregunta = p_id_pregunta;
END;
/

-- Crear Estudiantes
CREATE OR REPLACE PROCEDURE crear_estudiante(
    p_id_estudiante INT,
    p_nombre VARCHAR2,
    p_correo_electronico VARCHAR2
) IS
BEGIN
    INSERT INTO Estudiante (
        ID_Estudiante, Nombre, Correo_Electronico
    ) VALUES (
        p_id_estudiante, p_nombre, p_correo_electronico
    );
END;
/

-- Eliminar Estudiante
CREATE OR REPLACE PROCEDURE eliminar_estudiante(
    p_id_estudiante INT
) IS
BEGIN
    DELETE FROM Estudiante WHERE ID_Estudiante = p_id_estudiante;
END;
/

-- Actualizar Estudiante
CREATE OR REPLACE PROCEDURE actualizar_estudiante(
    p_id_estudiante INT,
    p_nombre VARCHAR2,
    p_correo_electronico VARCHAR2
) IS
BEGIN
    UPDATE Estudiante
    SET Nombre = p_nombre,
        Correo_Electronico = p_correo_electronico
    WHERE ID_Estudiante = p_id_estudiante;
END;
/

-- Buscar Estudiante
CREATE OR REPLACE PROCEDURE buscar_estudiante(
    p_id_estudiante INT,
    o_nombre OUT VARCHAR2,
    o_correo_electronico OUT VARCHAR2
) IS
BEGIN
    SELECT Nombre, Correo_Electronico
    INTO o_nombre, o_correo_electronico
    FROM Estudiante
    WHERE ID_Estudiante = p_id_estudiante;
END;
/

-- Crear Docentes
CREATE OR REPLACE PROCEDURE crear_docente(
    p_id_docente INT,
    p_nombre VARCHAR2,
    p_correo_electronico VARCHAR2
) IS
BEGIN
    INSERT INTO Docente (
        ID_Docente, Nombre, Correo_Electronico
    ) VALUES (
        p_id_docente, p_nombre, p_correo_electronico
    );
END;
/

-- Eliminar Docente
CREATE OR REPLACE PROCEDURE eliminar_docente(
    p_id_docente INT
) IS
BEGIN
    DELETE FROM Docente WHERE ID_Docente = p_id_docente;
END;
/

-- Actualizar Docente
CREATE OR REPLACE PROCEDURE actualizar_docente(
    p_id_docente INT,
    p_nombre VARCHAR2,
    p_correo_electronico VARCHAR2
) IS
BEGIN
    UPDATE Docente
    SET Nombre = p_nombre,
        Correo_Electronico = p_correo_electronico
    WHERE ID_Docente = p_id_docente;
END;
/

-- Buscar Docente
CREATE OR REPLACE PROCEDURE buscar_docente(
    p_id_docente IN INT,
    o_nombre OUT VARCHAR2,
    o_correo_electronico OUT VARCHAR2
) IS
BEGIN
    SELECT Nombre, Correo_Electronico
    INTO o_nombre, o_correo_electronico
    FROM Docente
    WHERE ID_Docente = p_id_docente;
END;
/

-- Crear Grupo
CREATE OR REPLACE PROCEDURE crear_grupo(
    p_id_grupo INT,
    p_nombre VARCHAR2,
    p_id_curso INT
) IS
BEGIN
    INSERT INTO Grupo (
        ID_Grupo, Nombre, ID_Curso
    ) VALUES (
        p_id_grupo, p_nombre, p_id_curso
    );
END;
/

-- Eliminaar Grupo
CREATE OR REPLACE PROCEDURE eliminar_grupo(
    p_id_grupo INT
) IS
BEGIN
    DELETE FROM Grupo WHERE ID_Grupo = p_id_grupo;
END;
/

-- Actualizar Grupo
CREATE OR REPLACE PROCEDURE actualizar_grupo(
    p_id_grupo INT,
    p_nombre VARCHAR2,
    p_id_curso INT
) IS
BEGIN
    UPDATE Grupo
    SET Nombre = p_nombre,
        ID_Curso = p_id_curso
    WHERE ID_Grupo = p_id_grupo;
END;
/

-- Buscar Grupo
CREATE OR REPLACE PROCEDURE buscar_grupo(
    p_id_grupo IN INT,
    o_nombre OUT VARCHAR2,
    o_id_curso OUT INT
) IS
BEGIN
    SELECT Nombre, ID_Curso INTO o_nombre, o_id_curso
    FROM Grupo
    WHERE ID_Grupo = p_id_grupo;
END;
/



-- Secuencias

-- Secuencia Examen
CREATE SEQUENCE seq_examen
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Secuencia Curso
CREATE SEQUENCE seq_curso
START WITH 1
INCREMENT BY 1
NOCACHE;

-- Secuencia PresentacionExamen
CREATE SEQUENCE seq_presentacion_examen
START WITH 1
INCREMENT BY 1
NOCACHE;



-- Crear Examen
CREATE OR REPLACE PROCEDURE crear_examen (
    p_nombre VARCHAR2,
    p_descripcion VARCHAR2,
    p_fechahora TIMESTAMP,
    p_tiempo INT,
    p_numero_preguntas INT,
    p_id_curso INT,
    p_peso FLOAT,
    p_umbral_aprobacion FLOAT
) IS
    v_id_examen INT;
BEGIN
    -- Generar un ID único para el nuevo examen
    SELECT seq_examen.NEXTVAL INTO v_id_examen FROM dual;

    -- Insertar un nuevo examen en la tabla Examen
    INSERT INTO Examen (
        ID_Examen, Nombre, Descripcion, FechaHora, Tiempo, NumeroPreguntas, ID_Curso, Peso, UmbralAprobacion
    ) VALUES (
        v_id_examen,
        p_nombre,
        p_descripcion,
        p_fechahora,
        p_tiempo,
        p_numero_preguntas,
        p_id_curso,
        p_peso,
        p_umbral_aprobacion
    );
END;
/

-- Eliminar Examen
CREATE OR REPLACE PROCEDURE eliminar_examen(
    p_id_examen INT
) IS
BEGIN
    DELETE FROM Examen WHERE ID_Examen = p_id_examen;
END;
/

-- Actualizar Examen
CREATE OR REPLACE PROCEDURE actualizar_examen(
    p_id_examen INT,
    p_nombre VARCHAR2,
    p_descripcion VARCHAR2,
    p_fechahora TIMESTAMP,
    p_tiempo INT,
    p_numero_preguntas INT,
    p_id_curso INT,
    p_peso FLOAT,
    p_umbral_aprobacion FLOAT
) IS
BEGIN
    UPDATE Examen
    SET Nombre = p_nombre,
        Descripcion = p_descripcion,
        FechaHora = p_fechahora,
        Tiempo = p_tiempo,
        NumeroPreguntas = p_numero_preguntas,
        ID_Curso = p_id_curso,
        Peso = p_peso,
        UmbralAprobacion = p_umbral_aprobacion
    WHERE ID_Examen = p_id_examen;
END;
/

-- Buscar Examen
CREATE OR REPLACE PROCEDURE buscar_examen(
    p_id_examen IN NUMBER,
    p_nombre OUT VARCHAR2,
    p_descripcion OUT VARCHAR2,
    p_fechahora OUT TIMESTAMP,
    p_tiempo OUT NUMBER,
    p_numero_preguntas OUT NUMBER,
    p_id_curso OUT NUMBER,
    p_peso OUT FLOAT,
    p_umbral_aprobacion OUT FLOAT
) IS
BEGIN
    SELECT Nombre, Descripcion, FechaHora, Tiempo, NumeroPreguntas, ID_Curso, Peso, UmbralAprobacion
    INTO p_nombre, p_descripcion, p_fechahora, p_tiempo, p_numero_preguntas, p_id_curso, p_peso, p_umbral_aprobacion
    FROM Examen
    WHERE ID_Examen = p_id_examen;
END;
/

-- Crear Curso
CREATE OR REPLACE PROCEDURE crear_curso (
    p_nombre VARCHAR2,
    p_plan_estudio VARCHAR2,
    p_horario VARCHAR2,
    p_id_profesor INT
) IS
    v_id_curso INT;
BEGIN
    -- Generar un ID único para el nuevo curso
    SELECT seq_curso.NEXTVAL INTO v_id_curso FROM dual;

    -- Insertar un nuevo curso en la tabla Curso
    INSERT INTO Curso (
        ID_Curso, Nombre, Plan_Estudio, Horario, ID_Profesor
    ) VALUES (
        v_id_curso,
        p_nombre,
        p_plan_estudio,
        p_horario,
        p_id_profesor
    );
END;
/

-- Eliminar Curso
CREATE OR REPLACE PROCEDURE eliminar_curso(
    p_id_curso INT
) IS
BEGIN
    DELETE FROM Curso WHERE ID_Curso = p_id_curso;
END;
/

-- Actualizar Curso
CREATE OR REPLACE PROCEDURE actualizar_curso(
    p_id_curso INT,
    p_nombre VARCHAR2,
    p_plan_estudio VARCHAR2,
    p_horario VARCHAR2,
    p_id_profesor INT
) IS
BEGIN
    UPDATE Curso
    SET Nombre = p_nombre,
        Plan_Estudio = p_plan_estudio,
        Horario = p_horario,
        ID_Profesor = p_id_profesor
    WHERE ID_Curso = p_id_curso;
END;
/

-- Buscar Curso
CREATE OR REPLACE PROCEDURE buscar_curso(
    p_id_curso IN NUMBER,
    p_nombre OUT VARCHAR2,
    p_plan_estudio OUT VARCHAR2,
    p_horario OUT VARCHAR2,
    p_id_profesor OUT INT
) IS
BEGIN
    SELECT Nombre, Plan_Estudio, Horario, ID_Profesor
    INTO p_nombre, p_plan_estudio, p_horario, p_id_profesor
    FROM Curso
    WHERE ID_Curso = p_id_curso;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        NULL; -- Opcional: Puedes manejar la excepción como desees
END;
/

-- Registrar Estudiantes a un Curso
CREATE OR REPLACE PROCEDURE registrar_estudiante_curso(
    p_id_grupo INT,
    p_id_estudiante INT
) IS
BEGIN
    INSERT INTO GrupoEstudiante (
        ID_Grupo, ID_Estudiante
    ) VALUES (
        p_id_grupo, p_id_estudiante
    );
END;
/

-- Ver el Plan de Estudio del Curso
CREATE OR REPLACE PROCEDURE ver_plan_estudio(
    p_id_curso INT
) IS
    v_plan_estudio VARCHAR2(4000);
BEGIN
    SELECT Plan_Estudio INTO v_plan_estudio
    FROM Curso
    WHERE ID_Curso = p_id_curso;
    
    DBMS_OUTPUT.PUT_LINE('Plan de Estudio: ' || v_plan_estudio);
END;
/

-- Manejar la Información de Horarios
CREATE OR REPLACE PROCEDURE ver_horario_curso(
    p_id_curso INT
) IS
    v_horario VARCHAR2(100);
BEGIN
    SELECT Horario INTO v_horario
    FROM Curso
    WHERE ID_Curso = p_id_curso;
    
    DBMS_OUTPUT.PUT_LINE('Horario del Curso: ' || v_horario);
END;
/

-- Asignar roles y privilegios
CREATE OR REPLACE PROCEDURE asignar_rol (p_usuario_id IN NUMBER, p_tipo_usuario IN VARCHAR2) AS
BEGIN
    IF p_tipo_usuario = 'administrador' THEN
        -- Asignar permisos de administrador
        EXECUTE IMMEDIATE 'GRANT ALL PRIVILEGES TO usuario_admin IDENTIFIED BY password_admin';
    ELSIF p_tipo_usuario = 'profesor' THEN
        -- Asignar permisos de profesor
        EXECUTE IMMEDIATE 'GRANT SELECT, INSERT, UPDATE, DELETE ON BANCOPREGUNTAS TO usuario_profesor IDENTIFIED BY password_profesor';
        EXECUTE IMMEDIATE 'GRANT SELECT, INSERT, UPDATE, DELETE ON EXAMEN TO usuario_profesor IDENTIFIED BY password_profesor';
        EXECUTE IMMEDIATE 'GRANT SELECT, INSERT, UPDATE, DELETE ON PREGUNTAEXAMEN TO usuario_profesor IDENTIFIED BY password_profesor';
        EXECUTE IMMEDIATE 'GRANT SELECT, INSERT, UPDATE, DELETE ON TEMA TO usuario_profesor IDENTIFIED BY password_profesor';
    ELSIF p_tipo_usuario = 'estudiante' THEN
        -- Asignar permisos de estudiante
        EXECUTE IMMEDIATE 'GRANT SELECT ON PRESENTACIONEXAMEN TO usuario_estudiante IDENTIFIED BY password_estudiante';
        EXECUTE IMMEDIATE 'GRANT SELECT ON RESPUESTA TO usuario_estudiante IDENTIFIED BY password_estudiante';
        -- Otros permisos especiales
        EXECUTE IMMEDIATE 'GRANT SELECT ON CURSO TO usuario_estudiante IDENTIFIED BY password_estudiante';
    ELSE
        RAISE_APPLICATION_ERROR(-20001, 'Tipo de usuario no válido');
    END IF;
END asignar_rol;


-- Triggers

-- Enviar Examen a Estudiante
CREATE OR REPLACE TRIGGER trg_enviar_examen
AFTER INSERT ON Examen
FOR EACH ROW
DECLARE
    CURSOR c_estudiantes IS
        SELECT ge.ID_Estudiante
        FROM GrupoEstudiante ge
        JOIN Grupo g ON ge.ID_Grupo = g.ID_Grupo
        JOIN Curso c ON g.ID_Curso = c.ID_Curso
        WHERE c.ID_Curso = :NEW.ID_Curso;
    
    v_id_presentacion INT;
BEGIN
    -- Recorremos el cursor con los estudiantes asociados al curso del examen
    FOR r_estudiante IN c_estudiantes LOOP
        -- Generar un ID único para la nueva presentación del examen
        SELECT seq_presentacion_examen.NEXTVAL INTO v_id_presentacion FROM dual;
        
        -- Insertamos una nueva presentación de examen para cada estudiante
        INSERT INTO PresentacionExamen (
            ID_Presentacion, ID_Examen, ID_Estudiante, Fecha, Hora, Duracion, Calificacion, DireccionIP
        ) VALUES (
            v_id_presentacion,
            :NEW.ID_Examen,
            r_estudiante.ID_Estudiante,
            SYSDATE,
            SYSTIMESTAMP,
            NULL,
            NULL,
            NULL
        );
    END LOOP;
END;
/

-- Asignar roles y privilegios
CREATE OR REPLACE TRIGGER after_insert_usuario
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    asignar_rol(:NEW.idusuario, :NEW.tipousuario);
END after_insert_usuario;


