#!/usr/bin/env python3
"""
Script para testar as funcionalidades do banco de dados
"""

import requests
import json

BASE_URL = 'http://localhost:5000/api'

def test_api():
    print("🧪 Testando API do Sistema Escolar")
    print("=" * 50)
    
    # Testar estatísticas
    print("\n📊 Testando estatísticas...")
    try:
        response = requests.get(f'{BASE_URL}/stats')
        if response.status_code == 200:
            stats = response.json()
            print(f"✅ Alunos: {stats['total_alunos']}")
            print(f"✅ Professores: {stats['total_professores']}")
            print(f"✅ Turmas: {stats['total_turmas']}")
            print(f"✅ Taxa de aprovação: {stats['taxa_aprovacao']}%")
        else:
            print(f"❌ Erro ao buscar estatísticas: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro de conexão: {e}")
    
    # Testar criação de aluno
    print("\n👨‍🎓 Testando criação de aluno...")
    novo_aluno = {
        "nome": "Teste Silva",
        "email": "teste@email.com",
        "cpf": "123.123.123-12",
        "data_nascimento": "2010-01-01",
        "telefone": "(61) 99999-9999",
        "endereco": "Rua Teste, 123"
    }
    
    try:
        response = requests.post(f'{BASE_URL}/alunos', json=novo_aluno)
        if response.status_code == 201:
            result = response.json()
            print(f"✅ Aluno criado com ID: {result['id']}")
            aluno_id = result['id']
            
            # Testar busca do aluno criado
            print("\n🔍 Testando busca do aluno...")
            response = requests.get(f'{BASE_URL}/alunos/{aluno_id}')
            if response.status_code == 200:
                aluno = response.json()
                print(f"✅ Aluno encontrado: {aluno['nome']}")
            else:
                print(f"❌ Erro ao buscar aluno: {response.status_code}")
                
        else:
            print(f"❌ Erro ao criar aluno: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Erro de conexão: {e}")
    
    # Testar criação de professor
    print("\n👨‍🏫 Testando criação de professor...")
    novo_professor = {
        "nome": "Professor Teste",
        "email": "prof.teste@escola.com",
        "cpf": "456.456.456-45",
        "telefone": "(61) 88888-8888",
        "especializacao": "Matemática"
    }
    
    try:
        response = requests.post(f'{BASE_URL}/professores', json=novo_professor)
        if response.status_code == 201:
            result = response.json()
            print(f"✅ Professor criado com ID: {result['id']}")
        else:
            print(f"❌ Erro ao criar professor: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Erro de conexão: {e}")
    
    # Testar listagem de alunos
    print("\n📋 Testando listagem de alunos...")
    try:
        response = requests.get(f'{BASE_URL}/alunos')
        if response.status_code == 200:
            alunos = response.json()
            print(f"✅ Total de alunos encontrados: {len(alunos)}")
            for aluno in alunos[:3]:  # Mostrar apenas os 3 primeiros
                print(f"   • {aluno['nome']} - {aluno['email']}")
        else:
            print(f"❌ Erro ao listar alunos: {response.status_code}")
    except Exception as e:
        print(f"❌ Erro de conexão: {e}")
    
    print("\n" + "=" * 50)
    print("🎯 Teste concluído!")
    print("\n💡 Dicas:")
    print("   • O banco agora salva dados dinamicamente")
    print("   • Use as rotas da API para criar/editar/excluir")
    print("   • Dados não são mais pré-definidos")
    print("   • Para popular com dados de exemplo: POST /api/admin/populate-sample")

if __name__ == '__main__':
    test_api()