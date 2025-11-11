#!/usr/bin/env python3
"""
Script para inicializar/reinicializar o banco de dados com dados de exemplo
Garante que todos os alunos tenham matrículas ativas
"""

import sqlite3
import os
from datetime import datetime

DATABASE = 'escola.db'

def init_database():
    """Inicializa o banco de dados com dados de exemplo"""
    
    # Remove banco existente se houver
    if os.path.exists(DATABASE):
        os.remove(DATABASE)
        print("🗑️  Banco de dados anterior removido")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    print("📊 Criando tabelas...")
    
    # Criar tabelas
    cursor.execute('''
        CREATE TABLE alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            data_nascimento TEXT NOT NULL,
            telefone TEXT,
            endereco TEXT,
            status TEXT DEFAULT 'ativo',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE professores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            telefone TEXT,
            especializacao TEXT,
            status TEXT DEFAULT 'ativo',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE turmas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            ano TEXT NOT NULL,
            turno TEXT NOT NULL,
            sala TEXT,
            capacidade INTEGER,
            professor_id INTEGER,
            status TEXT DEFAULT 'ativa',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (professor_id) REFERENCES professores(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE matriculas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            aluno_id INTEGER NOT NULL,
            turma_id INTEGER NOT NULL,
            data_matricula TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'ativa',
            FOREIGN KEY (aluno_id) REFERENCES alunos(id),
            FOREIGN KEY (turma_id) REFERENCES turmas(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE notas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matricula_id INTEGER NOT NULL,
            disciplina TEXT NOT NULL,
            nota REAL NOT NULL,
            bimestre INTEGER NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (matricula_id) REFERENCES matriculas(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE frequencia (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            matricula_id INTEGER NOT NULL,
            data TEXT NOT NULL,
            presente INTEGER DEFAULT 1,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (matricula_id) REFERENCES matriculas(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE eventos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            data_inicio TEXT NOT NULL,
            data_fim TEXT,
            hora_inicio TEXT,
            hora_fim TEXT,
            tipo TEXT DEFAULT 'evento',
            turma_id INTEGER,
            professor_id INTEGER,
            cor TEXT DEFAULT '#3498db',
            status TEXT DEFAULT 'ativo',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (turma_id) REFERENCES turmas(id),
            FOREIGN KEY (professor_id) REFERENCES professores(id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            telefone TEXT,
            cargo TEXT NOT NULL,
            senha TEXT NOT NULL,
            status TEXT DEFAULT 'ativo',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            last_login TEXT,
            reset_token TEXT,
            reset_expires TEXT
        )
    ''')
    
    print("👨‍🏫 Inserindo professores...")
    
    # Inserir professores
    professores = [
        ('Maria Silva Santos', 'maria.silva@escola.com', '123.456.789-01', '(61) 98765-4321', 'Matemática', 'ativo'),
        ('João Carlos Oliveira', 'joao.santos@escola.com', '234.567.890-12', '(61) 98765-4322', 'Português', 'ativo'),
        ('Ana Paula Costa', 'ana.costa@escola.com', '345.678.901-23', '(61) 98765-4323', 'História', 'ativo'),
        ('Pedro Henrique Lima', 'pedro.oliveira@escola.com', '456.789.012-34', '(61) 98765-4324', 'Ciências', 'ativo'),
        ('Carla Fernanda Souza', 'carla.souza@escola.com', '567.890.123-45', '(61) 98765-4325', 'Geografia', 'ativo'),
        ('Roberto Carlos Martins', 'roberto.martins@escola.com', '678.901.234-56', '(61) 98765-4326', 'Educação Física', 'ativo'),
    ]
    cursor.executemany('INSERT INTO professores (nome, email, cpf, telefone, especializacao, status) VALUES (?, ?, ?, ?, ?, ?)', professores)
    
    print("🏫 Inserindo turmas...")
    
    # Inserir turmas
    turmas = [
        ('9º Ano A', '9º Ano', 'Matutino', 'Sala 101', 35, 1, 'ativa'),
        ('8º Ano B', '8º Ano', 'Vespertino', 'Sala 102', 30, 2, 'ativa'),
        ('7º Ano A', '7º Ano', 'Matutino', 'Sala 103', 32, 3, 'ativa'),
        ('6º Ano C', '6º Ano', 'Vespertino', 'Sala 104', 28, 4, 'ativa'),
        ('5º Ano A', '5º Ano', 'Matutino', 'Sala 105', 25, 5, 'ativa'),
        ('4º Ano B', '4º Ano', 'Vespertino', 'Sala 106', 30, 6, 'ativa'),
    ]
    cursor.executemany('INSERT INTO turmas (nome, ano, turno, sala, capacidade, professor_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)', turmas)
    
    print("👨‍🎓 Inserindo alunos...")
    
    # Inserir alunos
    alunos = [
        ('João Silva Santos', 'joao.silva@email.com', '111.222.333-44', '2010-05-15', '(61) 91234-5678', 'Rua das Flores, 123', 'ativo'),
        ('Maria Eduarda Oliveira', 'maria.eduarda@email.com', '222.333.444-55', '2011-08-20', '(61) 91234-5679', 'Av. Central, 456', 'ativo'),
        ('Pedro Henrique Costa', 'pedro.costa@email.com', '333.444.555-66', '2010-03-10', '(61) 91234-5680', 'Rua do Sol, 789', 'ativo'),
        ('Ana Clara Ferreira', 'ana.clara@email.com', '444.555.666-77', '2011-12-25', '(61) 91234-5681', 'Rua da Lua, 012', 'ativo'),
        ('Carlos Eduardo Souza', 'carlos.souza@email.com', '555.666.777-88', '2010-07-30', '(61) 91234-5682', 'Av. das Estrelas, 345', 'ativo'),
        ('Beatriz Lima Santos', 'beatriz.lima@email.com', '666.777.888-99', '2012-02-14', '(61) 91234-5683', 'Rua do Vento, 678', 'ativo'),
        ('Gabriel Alves Pereira', 'gabriel.alves@email.com', '777.888.999-00', '2011-09-05', '(61) 91234-5684', 'Av. da Paz, 901', 'ativo'),
        ('Larissa Rodrigues Silva', 'larissa.rodrigues@email.com', '888.999.000-11', '2010-11-18', '(61) 91234-5685', 'Rua da Alegria, 234', 'ativo'),
        ('Matheus Barbosa Lima', 'matheus.barbosa@email.com', '999.000.111-22', '2012-04-22', '(61) 91234-5686', 'Av. do Futuro, 567', 'ativo'),
        ('Sophia Martins Costa', 'sophia.martins@email.com', '000.111.222-33', '2011-06-08', '(61) 91234-5687', 'Rua da Esperança, 890', 'ativo'),
    ]
    cursor.executemany('INSERT INTO alunos (nome, email, cpf, data_nascimento, telefone, endereco, status) VALUES (?, ?, ?, ?, ?, ?, ?)', alunos)
    
    print("📝 Criando matrículas...")
    
    # Inserir matrículas - TODOS os alunos matriculados
    matriculas = [
        (1, 1, 'ativa'),  # João Silva - 9º Ano A
        (2, 2, 'ativa'),  # Maria Eduarda - 8º Ano B
        (3, 1, 'ativa'),  # Pedro Henrique - 9º Ano A
        (4, 3, 'ativa'),  # Ana Clara - 7º Ano A
        (5, 4, 'ativa'),  # Carlos Eduardo - 6º Ano C
        (6, 5, 'ativa'),  # Beatriz Lima - 5º Ano A
        (7, 2, 'ativa'),  # Gabriel Alves - 8º Ano B
        (8, 3, 'ativa'),  # Larissa Rodrigues - 7º Ano A
        (9, 6, 'ativa'),  # Matheus Barbosa - 4º Ano B
        (10, 5, 'ativa'), # Sophia Martins - 5º Ano A
    ]
    cursor.executemany('INSERT INTO matriculas (aluno_id, turma_id, status) VALUES (?, ?, ?)', matriculas)
    
    print("📊 Inserindo notas de exemplo...")
    
    # Inserir algumas notas de exemplo
    import random
    disciplinas = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês', 'Educação Física', 'Artes']
    
    notas_exemplo = []
    for matricula_id in range(1, 11):  # Para cada matrícula
        for disciplina in disciplinas[:4]:  # Apenas algumas disciplinas
            for bimestre in [1, 2]:  # Apenas 1º e 2º bimestres
                nota = round(random.uniform(5.0, 10.0), 1)
                notas_exemplo.append((matricula_id, disciplina, nota, bimestre))
    
    cursor.executemany('INSERT INTO notas (matricula_id, disciplina, nota, bimestre) VALUES (?, ?, ?, ?)', notas_exemplo)
    
    print("📅 Inserindo eventos...")
    
    # Inserir eventos
    eventos = [
        ('Reunião de Pais e Mestres', 'Reunião bimestral com os pais dos alunos', '2025-11-25', '2025-11-25', '19:00', '21:00', 'reuniao', None, None, '#e74c3c', 'ativo'),
        ('Prova de Matemática - 9º Ano', 'Avaliação do 3º bimestre', '2025-11-28', '2025-11-28', '08:00', '10:00', 'prova', 1, 1, '#f39c12', 'ativo'),
        ('Feira de Ciências', 'Apresentação dos projetos científicos', '2025-12-05', '2025-12-05', '14:00', '17:00', 'evento', None, None, '#2ecc71', 'ativo'),
        ('Conselho de Classe', 'Reunião dos professores para avaliação', '2025-12-10', '2025-12-10', '13:00', '16:00', 'reuniao', None, None, '#9b59b6', 'ativo'),
        ('Aula de Campo - História', 'Visita ao museu de história natural', '2025-12-15', '2025-12-15', '08:00', '17:00', 'atividade', 3, 3, '#1abc9c', 'ativo'),
        ('Formatura 9º Ano', 'Cerimônia de formatura dos alunos', '2025-12-20', '2025-12-20', '19:00', '22:00', 'evento', 1, None, '#34495e', 'ativo'),
    ]
    cursor.executemany('INSERT INTO eventos (titulo, descricao, data_inicio, data_fim, hora_inicio, hora_fim, tipo, turma_id, professor_id, cor, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', eventos)
    
    print("👤 Inserindo usuários...")
    
    # Inserir usuários padrão
    usuarios = [
        ('Administrador do Sistema', 'admin@escola.com', '000.000.000-00', '(61) 99999-0000', 'admin', 'admin123', 'ativo'),
        ('Professor Silva', 'professor@escola.com', '111.111.111-11', '(61) 99999-1111', 'professor', 'prof123', 'ativo'),
        ('Secretária Ana', 'secretaria@escola.com', '222.222.222-22', '(61) 99999-2222', 'secretaria', 'sec123', 'ativo'),
        ('Coordenador João', 'coordenador@escola.com', '333.333.333-33', '(61) 99999-3333', 'coordenador', 'coord123', 'ativo'),
        ('Diretor Carlos', 'diretor@escola.com', '444.444.444-44', '(61) 99999-4444', 'diretor', 'dir123', 'ativo'),
    ]
    cursor.executemany('INSERT INTO usuarios (nome, email, cpf, telefone, cargo, senha, status) VALUES (?, ?, ?, ?, ?, ?, ?)', usuarios)
    
    conn.commit()
    conn.close()
    
    print("\n✅ Banco de dados inicializado com sucesso!")
    print(f"📊 Dados inseridos:")
    print(f"   • {len(professores)} professores")
    print(f"   • {len(turmas)} turmas")
    print(f"   • {len(alunos)} alunos")
    print(f"   • {len(matriculas)} matrículas")
    print(f"   • {len(notas_exemplo)} notas")
    print(f"   • {len(eventos)} eventos")
    print(f"   • {len(usuarios)} usuários")
    print("\n🎯 TODOS OS ALUNOS ESTÃO MATRICULADOS E PRONTOS PARA RECEBER NOTAS!")

if __name__ == '__main__':
    init_database()