// React Testing Library matchers
import "@testing-library/jest-dom";

// Fix TextEncoder/TextDecoder issues in Node
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Optional: mock environment variables
globalThis.__VITE_BACKEND_URL__ = "http://localhost:5000";