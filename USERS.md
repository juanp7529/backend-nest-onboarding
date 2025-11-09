# Usuarios y Datos de Prueba

## 🔐 Usuarios Disponibles

La aplicación incluye 3 usuarios simulados en memoria para pruebas de autenticación:

### 1. Usuario Admin
```json
{
  "username": "admin",
  "password": "admin123"
}
```
**ID**: `1`

### 2. Usuario Regular
```json
{
  "username": "user",
  "password": "user123"
}
```
**ID**: `2`

### 3. Usuario Demo
```json
{
  "username": "demo",
  "password": "demo123"
}
```
**ID**: `3`

---

## 📦 Productos Disponibles

La aplicación incluye 5 productos simulados en memoria:

### 1. Laptop HP Pavilion
- **ID**: `1`
- **Precio**: $899.99
- **Stock**: 10 unidades
- **Categoría**: Electronics
- **Descripción**: Laptop HP Pavilion 15 pulgadas, Intel Core i5, 8GB RAM

### 2. Mouse Logitech MX Master
- **ID**: `2`
- **Precio**: $99.99
- **Stock**: 50 unidades
- **Categoría**: Accessories
- **Descripción**: Mouse inalámbrico ergonómico para productividad

### 3. Teclado Mecánico Keychron K2
- **ID**: `3`
- **Precio**: $79.99
- **Stock**: 30 unidades
- **Categoría**: Accessories
- **Descripción**: Teclado mecánico inalámbrico 75% con switches Gateron

### 4. Monitor Dell 27" 4K
- **ID**: `4`
- **Precio**: $449.99
- **Stock**: 15 unidades
- **Categoría**: Electronics
- **Descripción**: Monitor profesional 4K UHD con tecnología IPS

### 5. Auriculares Sony WH-1000XM5
- **ID**: `5`
- **Precio**: $399.99
- **Stock**: 25 unidades
- **Categoría**: Audio
- **Descripción**: Auriculares con cancelación de ruido activa

---

## 🧪 Ejemplos de Uso

### Login y Obtención de Token

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Respuesta**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": "5m"
}
```

### Listar Productos

```bash
curl http://localhost:3000/api/v1/products
```

### Obtener Producto Específico

```bash
curl http://localhost:3000/api/v1/products/1
```

### Crear Onboarding (requiere token)

```bash
curl -X POST http://localhost:3000/api/v1/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "nombre": "Juan Pérez",
    "documento": "12345678",
    "email": "juan.perez@example.com",
    "montoInicial": 1000.50
  }'
```

**Respuesta**:
```json
{
  "onboardingId": "1",
  "status": "REQUESTED"
}
```

### Health Check

```bash
curl http://localhost:3000/api/v1/health
```

**Respuesta**:
```json
{
  "ok": true,
  "timestamp": "2024-01-20T10:30:00.000Z",
  "uptime": 123.456
}
```

---

## 🎯 Ejemplos de Onboarding

### Ejemplo 1 - Onboarding Básico

```json
{
  "nombre": "María González",
  "documento": "87654321",
  "email": "maria.gonzalez@example.com",
  "montoInicial": 2500.75
}
```

### Ejemplo 2 - Onboarding con Monto Alto

```json
{
  "nombre": "Carlos Rodríguez",
  "documento": "11223344",
  "email": "carlos.rodriguez@example.com",
  "montoInicial": 10000.00
}
```

### Ejemplo 3 - Onboarding Mínimo

```json
{
  "nombre": "Ana López",
  "documento": "99887766",
  "email": "ana.lopez@example.com",
  "montoInicial": 0
}
```

---

## ⚠️ Validaciones de Onboarding

### Campos Requeridos

Todos los campos son obligatorios:
- `nombre`
- `documento`
- `email`
- `montoInicial`

### Reglas de Validación

#### nombre
- ✅ String
- ✅ No puede estar vacío
- ✅ Mínimo 3 caracteres

#### documento
- ✅ String
- ✅ No puede estar vacío
- ✅ Mínimo 5 caracteres
- ✅ Debe ser único (no puede haber dos onboardings con el mismo documento)

#### email
- ✅ Debe ser un email válido
- ✅ No puede estar vacío
- ✅ Debe ser único (no puede haber dos onboardings con el mismo email)

#### montoInicial
- ✅ Debe ser un número
- ✅ No puede ser negativo
- ✅ Mínimo: 0

### Ejemplos de Errores

#### Email Inválido
```json
{
  "nombre": "Test",
  "documento": "12345",
  "email": "email-invalido",
  "montoInicial": 100
}
```

**Error**:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "property": "email",
      "constraints": {
        "isEmail": "email must be an email"
      }
    }
  ]
}
```

#### Documento Duplicado
```json
{
  "nombre": "Test Duplicate",
  "documento": "12345678",  // Ya existe
  "email": "nuevo@example.com",
  "montoInicial": 100
}
```

**Error**:
```json
{
  "statusCode": 409,
  "message": "Ya existe un onboarding con este documento",
  "error": "Conflict"
}
```

#### Monto Negativo
```json
{
  "nombre": "Test",
  "documento": "12345",
  "email": "test@example.com",
  "montoInicial": -100
}
```

**Error**:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "property": "montoInicial",
      "constraints": {
        "min": "montoInicial must not be less than 0"
      }
    }
  ]
}
```

---

## 🔄 Estados de Onboarding

### REQUESTED (Estado Inicial)
- Estado por defecto al crear un onboarding
- Indica que la solicitud ha sido recibida

### IN_PROGRESS
- El onboarding está siendo procesado
- (Este estado se puede actualizar manualmente en el futuro)

### APPROVED
- El onboarding ha sido aprobado
- (Este estado se puede actualizar manualmente en el futuro)

### REJECTED
- El onboarding ha sido rechazado
- (Este estado se puede actualizar manualmente en el futuro)

---

## 📝 Notas Importantes

1. **Datos en Memoria**: Todos los datos se almacenan en memoria y se pierden al reiniciar la aplicación.

2. **JWT Expira**: Los tokens JWT son válidos por 5 minutos. Después de ese tiempo, necesitas hacer login nuevamente.

3. **Unicidad**: Los onboardings verifican unicidad de email y documento en tiempo real.

4. **Productos Fijos**: Los productos están precargados y no se pueden modificar (solo lectura).

5. **Sin Persistencia**: No hay base de datos, todo es simulado para propósitos de demostración.

