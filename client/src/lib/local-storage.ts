import { User, InsertUser } from "@shared/schema";

class LocalStorage {
  private readonly STORAGE_KEY = "auth_user";

  getUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  async login(email: string, password: string): Promise<User> {
    // For UI testing, accept any credentials
    const user: User = {
      id: 1,
      email,
      password: "hashed_password" // In real app, this would be properly hashed
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  async register(data: InsertUser): Promise<User> {
    const user: User = {
      id: 1,
      ...data
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const storage = new LocalStorage();
