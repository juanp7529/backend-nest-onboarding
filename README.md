# Backend NestJS Onboarding API

## Requisitos

- Node.js >= 16.x
- npm >= 8.x

## 🔧 Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd backend-nest-onboarding

# Instalar dependencias
npm install
```

## Configuración

Adicionalmente deje unos archivos json el cual corresponden a:
products.json (maneja los productos que se obtienen.)
users_login.json (los usuarios a validar.)

tener en cuenta también que los usuarios para el api de login la contraseña va cifrada por eso usar otro api que expuse para dev
que cifra la clave para que sea valida el login y genere el token a usar.

Crear archivo `.env` en la raíz:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=5m
```
## Ejecutar la Aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La aplicación estará disponible en:
- **API**: http://localhost:3000/api/v1
- **Swagger**: http://localhost:3000/api/docs


### Usuarios Disponibles:

```json
  {
    "id": 1,
    "username": "juanpa123",
    "password": "$2b$10$bUOkWTGb/V2kQqdtDzrm9OZEhLa.3G8ujjXKNlsD3BWt5hvGAIUP."
  },
  {
    "id": 2,
    "username": "userprueba",
    "password": "$2b$10$C5NkI/GGvhdl0pzJnGgeceuEQgu8jlCWJPeM.wWUQ/YoR/fZjnSbK"
  }
```
```


# Swagger:

1. Abrir http://localhost:3000/api/docs
2. Ir a sección "auth"
3. Ejecutar POST /auth/login con credenciales
4. Copiar el `access_token`
5. Click en botón "Authorize" (candado arriba derecha)
6. Pegar token y autorizar
7. Probar endpoints protegidos

```

```

# Script

```bash
npm run start
npm run start:dev
npm run build
npm run test
npm run test:watch
npm run test:cov
```