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
						name: "Sidebar.tsx",
						content: `import React from 'react';
import '../styles/Sidebar.css';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </aside>
  );
};`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "pages",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "Home.tsx",
						content: `import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <p>Welcome to the home page.</p>
    </div>
  );
};

export default Home;`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "About.tsx",
						content: `import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About Us</h1>
      <p>Information about our company.</p>
    </div>
  );
};

export default About;`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Contact.tsx",
						content: `import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Contact information goes here.</p>
    </div>
  );
};

export default Contact;`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "services",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "authService.ts",
						content: `export const login = async (email: string, password: string) => {
  // Implement login API call
};

export const register = async (userData: { name: string; email: string; password: string }) => {
  // Implement registration API call
};`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "userService.ts",
						content: `export const fetchUserProfile = async (userId: string) => {
  // Fetch user profile details
};`,
					},
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "assets",
				children: [
					{
						id: uuid(),
						isFolder: true,
						name: "images",
						children: [
							{
								id: uuid(),
								isFolder: false,
								name: "logo.png",
								content: `[Binary content - logo image file]`,
							},
						],
					},
					{
						id: uuid(),
						isFolder: true,
						name: "fonts",
						children: [
							{
								id: uuid(),
								isFolder: false,
								name: "Roboto-Regular.ttf",
								content: `[Binary content - font file]`,
							},
						],
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
}`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Sidebar.css",
						content: `.sidebar {
  width: 250px;
  background-color: #f8f8f8;
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
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
				],
			},
			{
				id: uuid(),
				isFolder: true,
				name: "types",
				children: [
					{
						id: uuid(),
						isFolder: false,
						name: "index.d.ts",
						content: `export interface User {
  id: string;
  name: string;
  email: string;
}`,
					},
					{
						id: uuid(),
						isFolder: false,
						name: "Product.d.ts",
						content: `export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}`,
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
