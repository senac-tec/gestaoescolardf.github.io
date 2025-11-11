#!/usr/bin/env python3
"""
Script simples para iniciar o Sistema de Gestão Escolar
"""

import os
import sys
import time
import subprocess
import webbrowser
from pathlib import Path

def main():
    print("🎓 Iniciando Sistema de Gestão Escolar...")
    
    base_dir = Path(__file__).parent
    backend_dir = base_dir / "backend"
    
    # Verificar se Flask está instalado
    try:
        import flask
        import flask_cors
    except ImportError:
        print("📦 Instalando dependências...")
        subprocess.run([sys.executable, "-m", "pip", "install", "Flask", "Flask-CORS"])
    
    # Verificar banco de dados
    db_path = base_dir / "escola.db"
    if not db_path.exists():
        print("📊 Banco de dados não encontrado. Será criado automaticamente.")
    else:
        print("📊 Banco de dados encontrado.")
    
    print("🚀 Iniciando servidores...")
    
    # Iniciar backend
    os.chdir(backend_dir)
    backend = subprocess.Popen([sys.executable, "app.py"])
    
    # Aguardar backend iniciar
    time.sleep(3)
    
    # Iniciar frontend
    os.chdir(base_dir)
    frontend = subprocess.Popen([sys.executable, "-m", "http.server", "8000"])
    
    # Aguardar frontend iniciar
    time.sleep(2)
    
    # Abrir navegador
    print("🌍 Abrindo navegador...")
    webbrowser.open("http://localhost:8000")
    
    print("✅ Sistema iniciado!")
    print("   🌐 Site: http://localhost:8000")
    print("   🔧 API:  http://localhost:5000")
    print("\n💡 Dicas:")
    print("   • O banco agora salva dados dinamicamente")
    print("   • Para popular com dados de exemplo, acesse: http://localhost:5000/api/admin/populate-sample")
    print("   • Para resetar o banco, acesse: http://localhost:5000/api/admin/reset-db")
    print("\n⚠️  Pressione Ctrl+C para parar")
    
    try:
        # Aguardar até o usuário parar
        backend.wait()
    except KeyboardInterrupt:
        print("\n🛑 Parando sistema...")
        backend.terminate()
        frontend.terminate()
        print("✅ Sistema parado!")

if __name__ == "__main__":
    main()