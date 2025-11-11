# 🚀 Instalação Rápida - Django

## ⚡ 3 Passos para Rodar em Qualquer Máquina

### 1️⃣ Instalar Python

**Windows:**
- Baixe: https://www.python.org/downloads/
- Marque "Add Python to PATH"
- Instale

**Linux:**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

**Mac:**
```bash
brew install python3
```

### 2️⃣ Instalar e Configurar

```bash
# Instalar dependências
pip install -r requirements.txt

# Configurar Django (automático)
python setup_django.py
```

### 3️⃣ Rodar o Sistema

**Apenas nesta máquina:**
```bash
python manage.py runserver
```
Acesse: `http://localhost:8000`

**Acessível de outras máquinas:**
```bash
python manage.py runserver 0.0.0.0:8000
```

## 🌐 Acessar de Outra Máquina

### Passo 1: Descobrir o IP

**Windows:**
```bash
ipconfig
```
Procure: `IPv4 Address: 192.168.x.x`

**Linux/Mac:**
```bash
hostname -I
# ou
ip addr show
```

### Passo 2: Acessar

De qualquer dispositivo na mesma rede WiFi:
```
http://192.168.x.x:8000
```

**Exemplo:**
```
http://192.168.1.100:8000
```

## 📱 Acessar do Celular

1. Conecte o celular na mesma rede WiFi
2. Abra o navegador
3. Digite: `http://[IP_DO_COMPUTADOR]:8000`

## 🔥 Liberar Firewall (se necessário)

**Windows:**
```bash
netsh advfirewall firewall add rule name="Django" dir=in action=allow protocol=TCP localport=8000
```

**Linux:**
```bash
sudo ufw allow 8000
```

## ⚙️ Configuração Inicial

### Criar Usuário Admin

```bash
python manage.py createsuperuser
```

Preencha:
- Username: admin
- Email: admin@escola.com
- Password: (sua senha)

### Acessar Painel Admin

```
http://localhost:8000/admin
```

## 🎯 Credenciais Padrão

**Administrador:**
- Email: admin@escola.com
- Senha: admin123

**Professor:**
- Email: professor@escola.com
- Senha: prof123

**Secretaria:**
- Email: secretaria@escola.com
- Senha: sec123

## 🐛 Problemas Comuns

### "Port already in use"
```bash
# Use outra porta
python manage.py runserver 8001
```

### "DisallowedHost"
Edite `escola_project/settings.py`:
```python
ALLOWED_HOSTS = ['*']
```

### Não consegue acessar de outra máquina
1. Verifique se está na mesma rede WiFi
2. Desative firewall temporariamente
3. Use `0.0.0.0:8000` ao iniciar servidor

## 📦 Deploy em Produção

### Heroku (Grátis)

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Criar app
heroku create nome-do-app

# Deploy
git push heroku main

# Abrir
heroku open
```

### PythonAnywhere (Grátis)

1. Criar conta: https://www.pythonanywhere.com
2. Upload dos arquivos
3. Configurar Web App
4. Pronto!

### Render (Grátis)

1. Criar conta: https://render.com
2. Conectar repositório GitHub
3. Deploy automático
4. Pronto!

## 💡 Dicas

✅ Use `DEBUG=False` em produção
✅ Configure backup automático
✅ Use HTTPS em produção
✅ Monitore logs regularmente
✅ Atualize dependências periodicamente

## 🆘 Ajuda

**Erro ao instalar?**
```bash
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir
```

**Banco de dados corrompido?**
```bash
# Deletar e recriar
rm db.sqlite3
python manage.py migrate
python setup_django.py
```

**Resetar tudo?**
```bash
# Limpar e reinstalar
rm -rf escola_project escola db.sqlite3
python setup_django.py
```

## 📞 Suporte

- 📚 Documentação completa: `README_DJANGO.md`
- 🌐 Django Docs: https://docs.djangoproject.com/
- 💬 Stack Overflow: https://stackoverflow.com/questions/tagged/django

---

**Pronto! Seu sistema está rodando! 🎉**
