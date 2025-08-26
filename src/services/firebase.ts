import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { Task } from '../types/Task';

// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Tasks collection reference
const tasksCollection = collection(db, 'tasks');

export const taskService = {
  // Add a new task
  addTask: async (task: Omit<Task, 'id'>) => {
    const taskData = {
      ...task,
      createdAt: Timestamp.fromDate(task.createdAt),
      updatedAt: Timestamp.fromDate(task.updatedAt),
      dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate) : null
    };
    return await addDoc(tasksCollection, taskData);
  },

  // Update a task
  updateTask: async (taskId: string, updates: Partial<Task>) => {
    const taskRef = doc(db, 'tasks', taskId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
      ...(updates.dueDate && { dueDate: Timestamp.fromDate(updates.dueDate) })
    };
    return await updateDoc(taskRef, updateData);
  },

  // Delete a task
  deleteTask: async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    return await deleteDoc(taskRef);
  },

  // Subscribe to tasks changes
  subscribeToTasks: (callback: (tasks: Task[]) => void) => {
    const q = query(tasksCollection, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const tasks: Task[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          dueDate: data.dueDate ? data.dueDate.toDate() : undefined
        };
      });
      callback(tasks);
    });
  }
};