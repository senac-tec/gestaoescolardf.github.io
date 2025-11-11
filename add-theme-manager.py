#!/usr/bin/env python3
"""
Script para adicionar theme-manager.js em todas as páginas
"""

import os

html_files = [
    'home.html',
    'alunos.html',
    'professores.html',
    'turmas.html',
    'notas.html',
    'presenca.html',
    'calendario.html',
    'relatorios.html',
    'conta.html',
    'perfil.html',
    'boletim.html',
    'notificacoes.html'
]

def add_theme_manager(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Verificar se já tem
        if 'theme-manager.js' in content:
            print(f'✓ {filepath} - já possui theme-manager')
            return False
        
        # Adicionar antes do </body>
        if '</body>' in content:
            parts = content.rsplit('</body>', 1)
            content = parts[0] + '\n    <script src="js/theme-manager.js"></script>\n</body>' + parts[1]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f'✓ {filepath} - theme-manager adicionado')
            return True
        else:
            print(f'✗ {filepath} - não encontrou </body>')
            return False
            
    except Exception as e:
        print(f'✗ {filepath} - erro: {e}')
        return False

print('🎨 Adicionando theme-manager.js...\n')

for filename in html_files:
    if os.path.exists(filename):
        add_theme_manager(filename)

print('\n✅ Processo concluído!')
