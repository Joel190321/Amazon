import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where, addDoc } from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'products';
const USERS_COLLECTION = 'users';

export async function getProducts() {
  try {
    const productsCol = collection(db, COLLECTION_NAME);
    const productSnapshot = await getDocs(productsCol);
    return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error obteniendo productos: ", error);
    throw new Error("No se pudieron obtener los productos.");
  }
}

export async function getProductById(id) {
  const productRef = doc(db, COLLECTION_NAME, id);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() };
  } else {
    return null;
  }
}

export async function addProduct(product) {
  try {
    const productsCol = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(productsCol, product);  // Aquí usamos addDoc para agregar un producto.
    return docRef.id;  // Retorna el ID generado por Firestore
  } catch (error) {
    console.error("Error agregando producto: ", error);
    throw new Error("No se pudo agregar el producto.");
  }
}

export async function updateProduct(id, product) {
  const productRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(productRef, product);
}

export async function deleteProduct(id) {
  const productRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(productRef);
}

export async function getFeaturedProducts() {
  const productsCol = collection(db, COLLECTION_NAME);
  const featuredQuery = query(productsCol, where("featured", "==", true));
  const productSnapshot = await getDocs(featuredQuery);
  return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllProducts() {
  const productsCol = collection(db, COLLECTION_NAME);
  const productSnapshot = await getDocs(productsCol);
  return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


export async function createOrUpdateUser(uid, userData) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(userRef, userData, { merge: true });
}

export async function getProductsByCategory(category) {
  const productsCol = collection(db, COLLECTION_NAME);
  const categoryQuery = query(productsCol, where("category", "==", category));
  const productSnapshot = await getDocs(categoryQuery);
  return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getUserRole(uid) {
  const userRef = doc(db, USERS_COLLECTION, uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data().role;
  }
  return null;
}

