#!/usr/bin/env python3
"""
Script de instalação automática do Django para o Sistema de Gestão Escolar
"""

import os
import sys
import subprocess

def run_command(command, description):
    """Executa um comando e mostra o progresso"""
    print(f"\n{'='*60}")
    print(f"🔧 {description}")
    print(f"{'='*60}")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} - Concluído!")
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro: {e}")
        if e.stderr:
            print(e.stderr)
        return False

def main():
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║   🎓 Sistema de Gestão Escolar - Setup Django           ║
    ║                                                          ║
    ║   Este script irá configurar o Django automaticamente   ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    # 1. Instalar dependências
    if not run_command(
        "pip install -r requirements.txt",
        "Instalando dependências do Django"
    ):
        print("\n⚠️  Erro ao instalar dependências. Continuando...")
    
    # 2. Criar projeto Django (se não existir)
    if not os.path.exists('escola_project'):
        run_command(
            "django-admin startproject escola_project .",
            "Criando projeto Django"
        )
    else:
        print("\n✅ Projeto Django já existe!")
    
    # 3. Criar app (se não existir)
    if not os.path.exists('escola'):
        run_command(
            "python manage.py startapp escola",
            "Criando app 'escola'"
        )
    else:
        print("\n✅ App 'escola' já existe!")
    
    # 4. Criar migrações
    run_command(
        "python manage.py makemigrations",
        "Criando migrações do banco de dados"
    )
    
    # 5. Aplicar migrações
    run_command(
        "python manage.py migrate",
        "Aplicando migrações ao banco de dados"
    )
    
    # 6. Coletar arquivos estáticos
    run_command(
        "python manage.py collectstatic --noinput",
        "Coletando arquivos estáticos"
    )
    
    print("""
    
    ╔══════════════════════════════════════════════════════════╗
    ║   ✅ Instalação Concluída!                              ║
    ╚══════════════════════════════════════════════════════════╝
    
    📋 Próximos passos:
    
    1️⃣  Criar superusuário (admin):
       python manage.py createsuperuser
    
    2️⃣  Iniciar servidor local:
       python manage.py runserver
    
    3️⃣  Acessar de outras máquinas:
       python manage.py runserver 0.0.0.0:8000
    
    4️⃣  Descobrir seu IP:
       Windows: ipconfig
       Linux/Mac: ifconfig
    
    5️⃣  Acessar de outra máquina:
       http://[SEU_IP]:8000
    
    📚 Documentação completa: README_DJANGO.md
    
    🚀 Bom desenvolvimento!
    """)

if __name__ == '__main__':
    main()
