'use client'

import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, isUserAdmin } from '../firebase/config';
import { createOrUpdateUser } from '../firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
        
        // Actualizar o crear el usuario en la base de datos
        await createOrUpdateUser(user.uid, {
          name: user.displayName || user.email,
          email: user.email,
          role: adminStatus ? 'admin' : 'user'
        });
      } else {
        // Si no hay usuario, iniciamos sesión anónima
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Error al iniciar sesión anónima:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin, loading };
}

