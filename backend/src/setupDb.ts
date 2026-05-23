/**
 * 📄 ARCHIVO: setupDb.ts
 * 📝 DESCRIPCIÓN: Script para inicializar el esquema de la base de datos.
 * Ejecución: npm run setup-db
 */

import pool from './db.js';

const createTables = async () => {
  const queryText = `
    -- Borramos todo lo anterior para aplicar el cambio de estructura limpio.
    DROP TABLE IF EXISTS Compra, Caldero_Atributos, Atributos, Caldero, Cliente, Admin, Usuario CASCADE;
    DROP TYPE IF EXISTS estado_caldero, tipo_juego_enum, categoria_atributo CASCADE;

    -- Enums para asegurar los estados y las categorías
    CREATE TYPE estado_caldero AS ENUM ('pendiente', 'demo', 'pagado');
    CREATE TYPE tipo_juego_enum AS ENUM ('cartas', 'plataformas', 'party', 'roguelite');
    CREATE TYPE categoria_atributo AS ENUM ('diseño', 'mecanicas', 'sonido', 'tematica');

    -- Tabla base de usuarios
    CREATE TABLE Usuario (
        idUsuario VARCHAR(255) PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        contraseña VARCHAR(255) NOT NULL,
        fechaRegistro VARCHAR(100) NOT NULL,
        softDeleted BOOLEAN DEFAULT FALSE NOT NULL
    );

    -- Roles heredados
    CREATE TABLE Cliente (
        idUsuario VARCHAR(255) PRIMARY KEY,
        CONSTRAINT fk_cliente_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE
    );

    CREATE TABLE Admin (
        idUsuario VARCHAR(255) PRIMARY KEY,
        CONSTRAINT fk_admin_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE
    );

    -- Tabla de los juegos creados
    CREATE TABLE Caldero (
        idCaldero VARCHAR(255) PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        estado estado_caldero NOT NULL,
        precio INTEGER NOT NULL,
        fechaCreacion VARCHAR(100) NOT NULL,
        tipoJuego tipo_juego_enum NOT NULL,
        idUsuario VARCHAR(255) NOT NULL,
        softDeleted BOOLEAN DEFAULT FALSE NOT NULL,
        CONSTRAINT fk_caldero_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
    );

    -- Tabla de atributos
    CREATE TABLE Atributos (
        idAtributo VARCHAR(255) PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        categoria categoria_atributo NOT NULL,
        precio INTEGER DEFAULT 0
    );

    -- Tabla intermedia: relaciones muchos a muchos entre calderos y atributos
    CREATE TABLE Caldero_Atributos (
        idCaldero VARCHAR(255),
        idAtributo VARCHAR(255),
        PRIMARY KEY (idCaldero, idAtributo),
        CONSTRAINT fk_intermedia_caldero FOREIGN KEY (idCaldero) REFERENCES Caldero(idCaldero) ON DELETE CASCADE,
        CONSTRAINT fk_intermedia_atributo FOREIGN KEY (idAtributo) REFERENCES Atributos(idAtributo) ON DELETE CASCADE
    );

    -- Registro de compras
    CREATE TABLE Compra (
        idCompra VARCHAR(255) PRIMARY KEY,
        fechaCompra VARCHAR(100) NOT NULL,
        informacion VARCHAR(500) NOT NULL,
        cancelado BOOLEAN DEFAULT FALSE NOT NULL,
        idUsuario VARCHAR(255) NOT NULL,
        idCaldero VARCHAR(255) NOT NULL,
        CONSTRAINT fk_compra_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
        CONSTRAINT fk_compra_caldero FOREIGN KEY (idCaldero) REFERENCES Caldero(idCaldero),
        CONSTRAINT uq_compras_usuario_caldero UNIQUE (idUsuario, idCaldero)
    );

    -- Insert de los atributos
    INSERT INTO Atributos (idAtributo, label, categoria) VALUES
    ('diseno-forest', 'Comic', 'diseño'),
    ('diseno-vintage', 'Sketch', 'diseño'),
    ('diseno-illustrative', '3D', 'diseño'),
    ('diseno-acuarela', 'Pixel Art', 'diseño'),
    ('diseno-nocturno', 'Realist', 'diseño'),
    ('diseno-cartoon', 'Anime', 'diseño'),
    ('diseno-rustico', 'Voxel Art', 'diseño'),
    ('diseno-elegante', 'Noir', 'diseño'),
    ('diseno-minimal', 'Low Poly', 'diseño');

    INSERT INTO Atributos (idAtributo, label, categoria) VALUES
    ('tematica-alquimia', 'Medieval', 'tematica'),
    ('tematica-leyenda', 'Si-Fi', 'tematica'),
    ('tematica-brujeria', 'Demons', 'tematica'),
    ('tematica-elfico', 'Zombie', 'tematica'),
    ('tematica-fantasia', 'Fantasy', 'tematica'),
    ('tematica-cristales', 'Alien', 'tematica'),
    ('tematica-lunar', 'Postapocalyptic', 'tematica'),
    ('tematica-forestal', 'Cyberpunk', 'tematica'),
    ('tematica-mistico', 'Superhero', 'tematica');

    INSERT INTO Atributos (idAtributo, label, categoria) VALUES
    ('mecanicas-puzzle', 'Puzzle', 'mecanicas'),
    ('mecanicas-aventura', 'Turn-Based', 'mecanicas'),
    ('mecanicas-plataforma', 'Double Jump', 'mecanicas'),
    ('mecanicas-ritmo', 'Stealth', 'mecanicas'),
    ('mecanicas-exploracion', 'Skill Tree', 'mecanicas'),
    ('mecanicas-combate', 'Combat', 'mecanicas'),
    ('mecanicas-sigilo', 'Lives', 'mecanicas'),
    ('mecanicas-simulacion', 'Crafting', 'mecanicas'),
    ('mecanicas-estrategia', 'Resource Management', 'mecanicas');

    INSERT INTO Atributos (idAtributo, label, categoria) VALUES
    ('sonido-misterioso', 'Mistery', 'sonido'),
    ('sonido-coros', 'Orchestral', 'sonido'),
    ('sonido-campanas', 'Bells', 'sonido'),
    ('sonido-flauta', 'Calm', 'sonido'),
    ('sonido-tambores', 'Synthwave', 'sonido'),
    ('sonido-susurros', 'Rock/Metal', 'sonido'),
    ('sonido-eco', 'Comercial', 'sonido'),
    ('sonido-ambiente', 'Medieval', 'sonido'),
    ('sonido-magico', 'Funk', 'sonido');
  `;

  try {
    console.log('🔮 Reemplazando la base de datos con el nuevo esquema...');
    await pool.query(queryText);
    console.log('✅ Base de datos actualizada con éxito.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error configurando la base de datos:', err);
    process.exit(1);
  }
};

createTables();
