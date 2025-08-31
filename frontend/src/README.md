# 🧵 Thread Analyzer Dashboard

A comprehensive web application for analyzing Java thread dumps with real-time insights and performance metrics.

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:** Application will be available at `http://localhost:3000`

## ✨ Features

- 🔐 **Authentication Flow**: Sign In → Upload → Dashboard
- 📁 **File Upload**: Drag & drop support for thread dump files
- 📊 **Interactive Dashboard**: Real-time charts and performance metrics
- 🔍 **Thread Analysis**: Sortable, filterable thread tables
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎨 **Modern UI**: Tailwind CSS v4 with dark/light mode support

## 📁 Project Structure

```
├── src/                    # Source files (Vite project structure)
│   ├── components/         # React components
│   │   ├── ui/            # Shadcn UI components
│   │   ├── figma/         # Image components
│   │   └── ...            # Feature components
│   ├── styles/            # CSS files
│   │   └── globals.css    # Tailwind CSS v4 configuration
│   └── main.tsx           # Application entry point
├── App.tsx                # Main application component
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🎯 Usage Flow

1. **Sign In**: Use any email/password or click "Quick Demo Access"
2. **Upload File**: Drag & drop a thread dump file (.txt, .dump, .log, .jstack, .tdump)
3. **Analyze**: View comprehensive thread analysis and performance metrics
4. **Export**: Download reports in various formats

## 🔧 Supported File Types

- `.txt` - Text files
- `.dump` - Thread dump files  
- `.log` - Log files
- `.jstack` - JStack output
- `.tdump` - Thread dump files

Maximum file size: 100MB

## 📊 Analytics Features

- **Thread State Distribution**: Visual breakdown of thread states
- **Performance Metrics**: CPU usage, memory consumption, response times
- **Deadlock Detection**: Automatic identification of potential deadlocks
- **Interactive Charts**: Real-time data visualization with Recharts
- **Sortable Tables**: Filter and sort threads by various metrics

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### VS Code Setup

The project includes configuration for:
- ✅ Auto-formatting with Prettier
- ✅ ESLint integration
- ✅ Tailwind CSS IntelliSense
- ✅ TypeScript auto-imports
- ✅ React snippets

## 🎨 Design System

- **Typography**: 14px base font size with consistent hierarchy
- **Colors**: Dark navy primary with light/dark mode support
- **Components**: Shadcn UI component library
- **Spacing**: Tailwind CSS spacing scale
- **Responsive**: Mobile-first approach

## 🔗 Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn UI** - High-quality component library
- **Recharts** - Interactive chart library
- **Lucide React** - Beautiful icons

## 📝 License

This project is licensed under the MIT License.

---

**Ready to analyze threads!** 🧵📊

For questions or support, please refer to the documentation or open an issue.