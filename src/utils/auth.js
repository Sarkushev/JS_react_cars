const USERS_KEY = 'app_users_v1';
const CURRENT_KEY = 'app_current_user_v1';

export function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(user) {
  const users = getUsers();
  const exists = users.find(u => u.email === user.email);
  if (exists) {
    return { error: 'Пользователь с таким email уже существует' };
  }
  users.push(user);
  saveUsers(users);
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('authChange'));
  } catch (e) {
    // ignore
  }
  return { success: true };
}

export function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return null;
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  try {
    window.dispatchEvent(new CustomEvent('authChange'));
  } catch (e) {}
  return user;
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
  try {
    window.dispatchEvent(new CustomEvent('authChange'));
  } catch (e) {}
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

export default {
  getUsers,
  saveUsers,
  registerUser,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};
