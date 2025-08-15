# Malath Platform Client

A modern, feature-rich React application for the Malath Platform, built with Vite and featuring a comprehensive component library, internationalization support, and rich text editing capabilities.

## 🚀 Features

- **Modern React Architecture**: Built with React 19 and modern hooks
- **Rich Text Editing**: Comprehensive TipTap editor with custom extensions
- **Internationalization**: Multi-language support (English/Arabic) with RTL support
- **Role-Based Access**: Admin, Support, and User dashboards
- **Real-time Communication**: SignalR integration for live updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Atomic design pattern with reusable components
- **Charts & Analytics**: Data visualization with Recharts
- **Modern UI**: Shadcn/ui components with custom theming

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.0** - Modern React with latest features
- **Vite 4.5.3** - Fast build tool and dev server
- **React Router 7.6.3** - Client-side routing
- **TanStack Query 5.81.5** - Server state management

### UI & Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Sass 1.62.1** - CSS preprocessor
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Ant Design 5.26.2** - Additional UI components

### Rich Text Editor

- **TipTap 2.23.1** - Modular rich text editor
- **Custom Extensions** - Link, selection, and trailing node extensions
- **Image Upload** - Drag & drop image support
- **Mentions** - User and content mentions

### Communication & Data

- **Axios 1.10.0** - HTTP client
- **SignalR 8.0.7** - Real-time communication
- **React Query** - Data fetching and caching

### Internationalization

- **i18next 25.3.0** - Internationalization framework
- **react-i18next 15.5.3** - React integration
- **Language Detection** - Automatic language detection

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── admin.js           # Admin API endpoints
│   ├── auth.js            # Authentication API
│   ├── http.js            # HTTP client configuration
│   ├── settings.js        # Settings API
│   └── signalrConnection.js # SignalR setup
├── components/            # Component library
│   ├── atoms/             # Basic components
│   ├── molecules/         # Composite components
│   ├── organisms/         # Complex components
│   ├── pages/             # Page components
│   ├── templates/         # Layout templates
│   ├── tiptap/            # TipTap editor components
│   ├── tiptap-extension/  # Custom TipTap extensions
│   ├── tiptap-ui/         # TipTap UI components
│   └── ui/                # Shadcn/ui components
├── hooks/                 # Custom React hooks
├── locales/               # Translation files
│   ├── ar/                # Arabic translations
│   └── en/                # English translations
├── store/                 # State management
├── styles/                # Global styles
└── utils/                 # Utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=your_api_base_url
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm start` - Start with react-scripts (legacy)

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:

- Custom color palette (brand, neutral, accent colors)
- Custom fonts (Noto Sans Georgian, Roboto Slab, Barlow)
- Dark mode support
- Custom shadows and border radius

### Vite Configuration

- Path alias (`@` points to `src`)
- Proxy setup for SignalR notifications
- Development server on port 3000

### Internationalization

- English (default) and Arabic support
- RTL layout for Arabic
- Browser language detection
- Persistent language selection

## 🏗️ Architecture

### Component Structure

The project follows atomic design principles:

- **Atoms**: Basic building blocks (Button, Input, etc.)
- **Molecules**: Simple combinations (Form, Card, etc.)
- **Organisms**: Complex components (Navbar, Footer, etc.)
- **Templates**: Page layouts
- **Pages**: Full page components

### State Management

- **React Context** for authentication state
- **TanStack Query** for server state
- **Local state** with React hooks

### Routing Structure

- **Public routes**: Landing, About, Contact, Login, Register
- **User routes**: Profile, Services, Add Service
- **Support routes**: Dashboard, Settings, Service management
- **Admin routes**: Dashboard, User management, Content management

## 🎨 Rich Text Editor

The application includes a comprehensive TipTap-based editor with:

### Features

- Text formatting (bold, italic, underline, strikethrough)
- Headings (H1-H6)
- Lists (ordered, unordered, tasks)
- Block quotes and code blocks
- Text alignment
- Color and highlighting
- Links with custom validation
- Image upload with drag & drop
- Mentions system
- Subscript/superscript
- Character count

### Custom Extensions

- **Link Extension**: Enhanced link handling
- **Selection Extension**: Custom selection behavior
- **Trailing Node Extension**: Ensures proper document structure
- **Image Upload**: Drag & drop image support

## 🌍 Internationalization

### Supported Languages

- **English** (en) - Default
- **Arabic** (ar) - RTL support

### Translation Structure

- Organized by feature/page
- Nested structure for complex translations
- Pluralization support
- Variable interpolation

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full system access
- **Support**: Service and user management
- **User**: Basic platform access

### Protected Routes

- Role-based route protection
- Redirect on unauthorized access
- Persistent authentication state

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-based responsive design
- Touch-friendly interfaces
- Optimized for various screen sizes

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

### Vercel Deployment

The project includes `vercel.json` configuration for Vercel deployment with:

- SPA routing support
- Build output configuration
- Static file serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is private and proprietary to Malath Platform.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the project repository.

---

Built with ❤️ by the Malath Platform team
