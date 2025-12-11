# JustStream - Streaming Dashboard Clone

A modern, full-featured streaming service dashboard built with React, TypeScript, and Redux Toolkit. This project demonstrates advanced front-end development practices including infinite scrolling, lazy loading, video player integration, code splitting, error handling, and CI/CD pipeline setup.

## 🎯 Project Overview

This project showcases a production-ready streaming service UI that demonstrates:

- **React & TypeScript**: Type-safe component architecture
- **Redux Toolkit**: Efficient state management
- **Infinite Scrolling**: Performance-optimized content loading
- **Video Player Integration**: Custom video player with react-player
- **Code Splitting**: Route-based lazy loading for optimal performance
- **Error Handling**: Comprehensive error boundaries and retry logic
- **CI/CD Pipeline**: GitHub Actions with Docker deployment
- **Responsive Design**: Modern UI with Tailwind CSS

## 🚀 Features

### Core Functionality
- ✅ **Content Catalog**: Browse movies, series, and documentaries
- ✅ **Infinite Scrolling**: Seamless content loading as you scroll
- ✅ **Category Filtering**: Filter content by genre
- ✅ **Search**: Real-time content search
- ✅ **Video Player**: Full-featured video player with controls
- ✅ **Responsive Layout**: Works on desktop, tablet, and mobile

### Performance Optimizations
- ✅ **Code Splitting**: Lazy-loaded routes reduce initial bundle size
- ✅ **Lazy Loading Images**: Images load only when visible
- ✅ **Loading Skeletons**: Smooth loading states
- ✅ **Error Boundaries**: Graceful error handling with retry
- ✅ **Optimized Redux**: Efficient state updates and selectors

### Developer Experience
- ✅ **TypeScript**: Full type safety
- ✅ **ESLint**: Code quality enforcement
- ✅ **Docker**: Containerized deployment
- ✅ **CI/CD**: Automated testing and deployment

## 📋 Prerequisites

- Node.js 20+ and npm
- Docker (optional, for containerized deployment)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JustStream
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t juststream .

# Run the container
docker run -p 8080:80 juststream
```

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

The application will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
JustStream/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ContentCard/     # Content card component
│   │   ├── ContentGrid/      # Infinite scroll grid
│   │   ├── VideoPlayer/     # Video player component
│   │   ├── ErrorBoundary/   # Error boundary wrapper
│   │   └── ...
│   ├── pages/               # Route pages
│   │   ├── Home/            # Home page
│   │   ├── Browse/          # Browse page
│   │   ├── Watch/           # Video watch page
│   │   └── Search/          # Search page
│   ├── store/               # Redux store
│   │   ├── slices/          # Redux slices
│   │   └── store.ts         # Store configuration
│   ├── services/            # API services
│   │   └── api.ts           # Mock API service
│   └── App.tsx              # Main app component
├── .github/
│   └── workflows/           # CI/CD pipelines
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose config
└── nginx.conf               # Nginx configuration
```

## 🎨 Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Routing with code splitting
- **React Player** - Video player integration
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

## 🔄 State Management

The application uses Redux Toolkit with three main slices:

1. **Content Slice**: Manages content catalog, loading states, and filters
2. **Player Slice**: Handles video player state (play/pause, volume, time)
3. **UI Slice**: Manages UI state (sidebar, search, theme)

## 📡 API Integration

The project includes a mock API service (`src/services/api.ts`) that simulates:
- Content fetching with pagination
- Category-based filtering
- Error simulation for testing error handling
- Network delay simulation

In a production environment, replace this with actual API calls to your backend.

## 🚢 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) includes:

1. **Lint and Test**: Runs ESLint and builds the application
2. **Build and Push**: Builds Docker image and pushes to GitHub Container Registry
3. **Deploy**: Deploys to production (configure with your cloud provider)

## 🎯 Performance Features

### Code Splitting
Routes are lazy-loaded to reduce initial bundle size:
```typescript
const Home = lazy(() => import('./pages/Home/Home'))
```

### Infinite Scrolling
Uses `react-intersection-observer` to detect when user scrolls near the bottom, triggering new content loads.

### Image Lazy Loading
Content cards use native `loading="lazy"` attribute for images.

### Optimized Redux
- Typed hooks for type-safe state access
- Efficient selectors to prevent unnecessary re-renders
- Async thunks for API calls

## 🐛 Error Handling

- **Error Boundaries**: Catches React component errors
- **API Error Handling**: Retry logic for failed requests
- **User-Friendly Messages**: Clear error messages with retry buttons

## 🎨 Styling

The project uses Tailwind CSS with:
- Custom color palette
- Responsive design utilities
- Dark theme optimized
- Loading skeleton animations

## 📝 Development Notes

### Adding New Features

1. **New Page**: Create in `src/pages/` and add route in `App.tsx`
2. **New Component**: Add to `src/components/`
3. **New State**: Create slice in `src/store/slices/`
4. **API Endpoint**: Add to `src/services/api.ts`

### Best Practices

- Use TypeScript for all new code
- Follow existing component structure
- Add error handling for async operations
- Include loading states for better UX
- Write descriptive commit messages

## 🔒 Security Considerations

- Environment variables for sensitive data
- Content Security Policy headers (configure in nginx.conf)
- Input validation for search queries
- XSS protection headers

## 📄 License

See LICENSE file for details.

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Built with ❤️ for demonstrating modern React development practices**
