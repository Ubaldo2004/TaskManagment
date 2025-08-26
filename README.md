# TaskFlow - Aplicación de Gestión de Tareas

Una moderna aplicación React para gestión de tareas con drag & drop y calendario interactivo.

## 🚀 Características

- **Tablero Kanban**: Arrastra y suelta tareas entre columnas (Pendiente, En Progreso, Completado)
- **Calendario Interactivo**: Visualiza y programa tareas en fechas específicas
- **Firebase Firestore**: Sincronización en tiempo real de todas las tareas
- **Material-UI**: Interfaz moderna y responsive
- **TypeScript**: Código tipado y mantenible

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.tsx          # Barra de navegación principal
│   ├── TaskBoard.tsx       # Tablero drag & drop
│   ├── TaskCard.tsx        # Tarjeta individual de tarea
│   ├── CalendarView.tsx    # Vista de calendario
│   └── TaskModal.tsx       # Modal para crear/editar tareas
├── hooks/
│   └── useTasks.ts         # Hook personalizado para gestión de tareas
├── services/
│   └── firebase.ts         # Configuración y servicios de Firebase
├── theme/
│   └── theme.ts            # Tema Material-UI personalizado
├── types/
│   └── Task.ts             # Tipos TypeScript
└── App.tsx                 # Componente principal
```

## 🛠️ Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Actualiza la configuración en `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

### 3. Configurar Reglas de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document} {
      allow read, write: if true;
    }
  }
}
```

### 4. Ejecutar la Aplicación

```bash
npm run dev
```

## 💻 Tecnologías Utilizadas

- **React 18** + **TypeScript**
- **Material-UI (MUI)** - Componentes y diseño
- **react-beautiful-dnd** - Funcionalidad drag & drop
- **FullCalendar** - Calendario interactivo
- **Firebase Firestore** - Base de datos en tiempo real
- **Vite** - Build tool y dev server

## 📱 Características Responsive

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints adaptativos**: Experiencia fluida en todos los tamaños
- **Navegación touch-friendly**: Gestos táctiles intuitivos

## 🎨 Funcionalidades Principales

### Tablero Kanban
- Arrastra tareas entre columnas
- Estados: Pendiente, En Progreso, Completado
- Indicadores visuales de estado
- Acciones rápidas (editar, eliminar)

### Calendario
- Vista mensual y semanal
- Click en fechas para crear tareas
- Eventos coloreados por estado
- Navegación intuitiva

### Gestión de Tareas
- Crear, editar y eliminar tareas
- Campos: título, descripción, fecha de vencimiento
- Modal responsive para formularios
- Validación de datos

## 🔄 Sincronización en Tiempo Real

Todas las operaciones se sincronizan automáticamente:
- Cambios inmediatos en múltiples pestañas
- Actualizaciones sin recargar página
- Manejo de errores robusto

## 🚀 Despliegue

Para compilar para producción:

```bash
npm run build
```

Los archivos se generarán en el directorio `dist/`.

## 📄 Licencia

MIT License - Consulta el archivo LICENSE para más detalles.