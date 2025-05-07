// import { User } from 'firebase/auth';

// // Token storage keys
// const ACCESS_TOKEN_KEY = 'access_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';

// // Save tokens to localStorage
// export const saveTokens = (user: User) => {
//     user.getIdToken().then((token) => {
//         localStorage.setItem(ACCESS_TOKEN_KEY, token);
//     });
    
//     // Save refresh token if available
//     if (user.refreshToken) {
//         localStorage.setItem(REFRESH_TOKEN_KEY, user.refreshToken);
//     }
// };

// // Get access token from localStorage
// export const getAccessToken = (): string | null => {
//     return localStorage.getItem(ACCESS_TOKEN_KEY);
// };

// // Get refresh token from localStorage
// export const getRefreshToken = (): string | null => {
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
// };

// // Clear tokens from localStorage
// export const clearTokens = () => {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
// };

// // Check if tokens exist
// export const hasTokens = (): boolean => {
//     return !!getAccessToken() && !!getRefreshToken();
// }; 