# 🎓 Sistema de Gestão Escolar - Django

## 📋 Requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

## 🚀 Instalação e Configuração

### 1. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 2. Criar Projeto Django

```bash
# Criar projeto Django
django-admin startproject escola_project .

# Criar app principal
python manage.py startapp escola
```

### 3. Configurar Banco de Dados

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Criar superusuário (admin)
python manage.py createsuperuser
```

### 4. Iniciar Servidor

```bash
# Desenvolvimento local
python manage.py runserver

# Acessível em outras máquinas da rede
python manage.py runserver 0.0.0.0:8000
```

## 🌐 Acessar de Outra Máquina

### Descobrir IP da Máquina

**Windows:**
```bash
ipconfig
```
Procure por "IPv4 Address"

**Linux/Mac:**
```bash
ifconfig
# ou
ip addr show
```

### Acessar

De outra máquina na mesma rede:
```
http://[IP_DA_MAQUINA]:8000
```

Exemplo:
```
http://192.168.1.100:8000
```

## 🔧 Configurações para Produção

### 1. Configurar ALLOWED_HOSTS

Edite `escola_project/settings.py`:

```python
ALLOWED_HOSTS = ['*']  # Permite qualquer host (desenvolvimento)
# ou
ALLOWED_HOSTS = ['192.168.1.100', 'localhost', '127.0.0.1']  # Específico
```

### 2. Configurar CORS

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  # Desenvolvimento
```

### 3. Servir Arquivos Estáticos

```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'css'),
    os.path.join(BASE_DIR, 'js'),
    os.path.join(BASE_DIR, 'public'),
]
```

## 📦 Deploy em Servidor

### Opção 1: Heroku

```bash
# Instalar Heroku CLI
# Criar Procfile
echo "web: gunicorn escola_project.wsgi" > Procfile

# Deploy
heroku create nome-do-app
git push heroku main
```

### Opção 2: PythonAnywhere

1. Criar conta em pythonanywhere.com
2. Upload dos arquivos
3. Configurar Web App
4. Definir WSGI configuration

### Opção 3: VPS (DigitalOcean, AWS, etc)

```bash
# Instalar dependências
pip install gunicorn

# Rodar com Gunicorn
gunicorn escola_project.wsgi:application --bind 0.0.0.0:8000
```

## 🔐 Segurança

### Variáveis de Ambiente

Crie arquivo `.env`:

```env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=False
ALLOWED_HOSTS=seu-dominio.com,www.seu-dominio.com
DATABASE_URL=sqlite:///db.sqlite3
```

### Gerar SECRET_KEY

```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

## 📊 Banco de Dados

### SQLite (Padrão - Desenvolvimento)
Já configurado, arquivo `db.sqlite3`

### PostgreSQL (Produção)

```bash
pip install psycopg2-binary
```

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'escola_db',
        'USER': 'postgres',
        'PASSWORD': 'senha',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### MySQL

```bash
pip install mysqlclient
```

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'escola_db',
        'USER': 'root',
        'PASSWORD': 'senha',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## 🛠️ Comandos Úteis

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Coletar arquivos estáticos
python manage.py collectstatic

# Rodar testes
python manage.py test

# Shell interativo
python manage.py shell
```

## 📱 Acessar de Celular

1. Certifique-se que o celular está na mesma rede WiFi
2. Descubra o IP da máquina (ex: 192.168.1.100)
3. No celular, acesse: `http://192.168.1.100:8000`

## 🔥 Firewall

### Windows

```bash
# Permitir porta 8000
netsh advfirewall firewall add rule name="Django" dir=in action=allow protocol=TCP localport=8000
```

### Linux

```bash
# UFW
sudo ufw allow 8000

# iptables
sudo iptables -A INPUT -p tcp --dport 8000 -j ACCEPT
```

## 📝 Estrutura do Projeto

```
gestao-escolar/
├── escola_project/          # Configurações Django
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── escola/                  # App principal
│   ├── models.py           # Modelos do banco
│   ├── views.py            # Views/Controllers
│   ├── urls.py             # Rotas
│   └── serializers.py      # API REST
├── templates/              # Templates HTML
├── static/                 # Arquivos estáticos
│   ├── css/
│   ├── js/
│   └── public/
├── manage.py               # Gerenciador Django
├── requirements.txt        # Dependências
└── db.sqlite3             # Banco de dados
```

## 🎯 Próximos Passos

1. ✅ Instalar dependências
2. ✅ Criar projeto Django
3. ✅ Configurar banco de dados
4. ✅ Migrar dados do Flask
5. ✅ Testar localmente
6. ✅ Configurar para rede
7. ✅ Deploy em produção

## 💡 Dicas

- Use `DEBUG=False` em produção
- Configure `ALLOWED_HOSTS` corretamente
- Use HTTPS em produção
- Faça backup regular do banco de dados
- Use variáveis de ambiente para senhas
- Configure logs adequadamente

## 🆘 Problemas Comuns

### Erro: "DisallowedHost"
**Solução:** Adicione o IP/domínio em `ALLOWED_HOSTS`

### Erro: "CORS"
**Solução:** Configure `django-cors-headers`

### Erro: "Static files not found"
**Solução:** Execute `python manage.py collectstatic`

### Erro: "Port already in use"
**Solução:** Use outra porta: `python manage.py runserver 8001`

## 📞 Suporte

Para mais informações:
- Documentação Django: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
