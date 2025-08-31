# 🚀 Thread Analyzer Dashboard - VS Code Setup Guide

## 📋 Step-by-Step Installation

### 1. **Prerequisites**
- ✅ **Node.js** (version 18+): [Download here](https://nodejs.org/)
- ✅ **Visual Studio Code**: [Download here](https://code.visualstudio.com/)

### 2. **VS Code Extensions (Required)**
Install these extensions for the best development experience:

1. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
2. **ESLint** (`dbaeumer.vscode-eslint`)
3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
4. **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
5. **Auto Rename Tag** (`formulahendry.auto-rename-tag`)
6. **TypeScript Importer** (`pmneo.tsimporter`)
7. **Error Lens** (`usernamehw.errorlens`)

### 3. **Project Setup**

1. **Open terminal in VS Code** (`Ctrl+` ` or `Cmd+` `)

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open your browser**: The app will automatically open at `http://localhost:3000`

### 4. **Available Commands**

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint checks
npm run lint
```

### 5. **Features Overview**

- 🔐 **Authentication Flow**: Sign in → Upload → Dashboard
- 📁 **File Upload**: Drag & drop thread dump files (.txt, .dump, .log, .jstack, .tdump)
- 📊 **Interactive Dashboard**: Real-time charts and performance metrics
- 🔍 **Thread Analysis**: Sortable tables with filtering capabilities
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Modern UI**: Tailwind CSS v4 with dark/light mode support

### 6. **Project Structure**

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── figma/           # Figma integration components
│   ├── SignInPage.tsx   # Authentication page
│   ├── LandingPage.tsx  # File upload interface
│   ├── Sidebar.tsx      # Navigation component
│   └── ...              # Other feature components
├── styles/
│   └── globals.css      # Tailwind CSS configuration
└── main.tsx            # Application entry point
```

### 7. **Development Tips**

- **Auto-format on save**: Enabled by default
- **Hot reload**: Changes appear instantly in browser
- **TypeScript support**: Full type checking and IntelliSense
- **Tailwind IntelliSense**: Auto-complete for CSS classes
- **Component library**: All UI components are in `/src/components/ui/`

### 8. **Troubleshooting**

**If you get import errors:**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**If TypeScript errors persist:**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- --port 3001
```

### 9. **Usage Flow**

1. **Sign In**: Use any email/password or click "Quick Demo Access"
2. **Upload File**: Drag & drop a thread dump file or use sample data
3. **Analyze**: View comprehensive thread analysis and performance metrics
4. **Export**: Download reports in various formats

### 🎉 **You're Ready!**

Your Thread Analyzer Dashboard is now running with:
- ✅ Hot reload development server
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Modern React patterns
- ✅ Production-ready build system

Happy analyzing! 🧵📊