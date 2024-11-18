import { File } from "../interfaces";
import { v4 as uuid } from "uuid";

export const FileTree: File[] = [
	{
		id: uuid(),
		name: "src",
		isFolder: true,
		children: [
			{
				id: uuid(),
				isFolder: true,
				name: "components",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "App.tsx",
						content: `import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import '../styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>Welcome to Our Application</h1>
        <p>This is the main content area.</p>
      </main>
      <Footer />
    </div>
  );
};

export default App;`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Header.tsx",
						content: `import React from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="logo">MyApp</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      {user ? (
        <div className="user-menu">
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
};`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Footer.tsx",
						content: `import React from 'react';
import '../styles/Footer.css';
import { COMPANY_NAME } from '../utils/constants';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} {COMPANY_NAME}. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "styles",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "App.css",
						content: `.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Header.css",
						content: `.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Footer.css",
						content: `.footer {
  background-color: #f5f5f5;
  padding: 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
}`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "hooks",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "useAuth.ts",
						content: `import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic here
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const userData = await response.json();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, loading, login, logout };
};`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "useFetch.ts",
						content: `import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
      }
    };

    fetchData();
  }, [url]);

  return state;
};`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "utils",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "helpers.ts",
						content: `export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "constants.ts",
						content: `export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export const COMPANY_NAME = 'MyApp Technologies';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_FILE_TYPES = ['.jpg', '.png', '.pdf'];
export const PASSWORD_MIN_LENGTH = 8;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: false,
				name: "index.tsx",
				content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
			},
		],
	},
	{
		id: uuid(),
		name: "public",
		isFolder: true,
		children: [
			{
				id: uuid(),
				isFolder: false,
				name: "index.html",
				content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="MyApp - A Modern React Application" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>MyApp</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`,
			},
			{
				id: uuid(),
				isFolder: false,
				name: "favicon.ico",
				content: `[Binary content - favicon icon file]`,
			},
			{
				id: uuid(),
				isFolder: false,
				name: "logo.svg",
				content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#61dafb" />
  <path d="M50 25l15 25-15 25-15-25z" fill="#fff" />
</svg>`,
			},
		],
	},
	{
		id: uuid(),
		name: "package.json",
		isFolder: false,
		content: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.8.4",
    "uuid": "^9.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
	},
	{
		id: uuid(),
		name: "tsconfig.json",
		isFolder: false,
		content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}`,
	},
	{
		id: uuid(),
		name: "package-lock.json",
		isFolder: false,
		content: `{
  "name": "my-app",
  "version": "0.1.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "my-app",
      "version": "0.1.0",
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "typescript": "^4.8.4",
        "uuid": "^9.0.0"
      }
    }
  }
}`,
	},
	{
		id: uuid(),
		name: "test.py",
		isFolder: false,
	},
];
