import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; 
  balance: number;
  portfolio: Record<string, number>;
}

const users = new Map<string, StoredUser>();

export async function registerUser(data: RegisterInput) {
  const { name, email, password } = registerSchema.parse(data);

  if (users.has(email)) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = Math.random().toString(36).substring(2, 10);

  const user: StoredUser = {
    id,
    name,
    email,
    password: hashedPassword,
    balance: 100000,
    portfolio: {},
  };

  users.set(email, user);

  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '24h' });

  return {
    token,
    user: {
      id,
      name,
      email,
      balance: user.balance,
      portfolio: user.portfolio,
    },
  };
}

export async function loginUser(data: LoginInput) {
  const { email, password } = loginSchema.parse(data);
  const user = users.get(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '24h',
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      portfolio: user.portfolio,
    },
  };
}

export function logoutUser() {
  return {
    message: 'User logged out successfully',
  };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    throw new Error('Invalid token');
  }
}
