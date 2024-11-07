import { create } from 'zustand';

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  verifyUser: (email: string) => void;
}

export interface User {
  name: string;
  email: string;
  dateOfJoining: string;
  designation: 'HR' | 'Marketing';
  password: string;
  profilePicture: string;
  aadharCard: string;
  collegeId: string;
  isVerified?: boolean;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setCurrentUser: (user) => set({ currentUser: user }),
  verifyUser: (email) => set((state) => ({
    users: state.users.map(user => 
      user.email === email ? { ...user, isVerified: true } : user
    ),
    currentUser: state.currentUser?.email === email ? 
      { ...state.currentUser, isVerified: true } : 
      state.currentUser
  })),
}));