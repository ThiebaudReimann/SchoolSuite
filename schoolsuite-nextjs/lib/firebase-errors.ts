export const getFirebaseErrorMessage = (code: string): string => {
    switch (code) {
        case "auth/email-already-in-use":
            return "This email is already in use. Please try logging in or use a different email.";
        case "auth/invalid-email":
            return "The email address is not valid.";
        case "auth/operation-not-allowed":
            return "This sign-in method is currently disabled.";
        case "auth/weak-password":
            return "The password is too weak. Please use at least 6 characters.";
        case "auth/user-disabled":
            return "This account has been disabled. Please contact support.";
        case "auth/user-not-found":
            return "No account found with this email. Please register first.";
        case "auth/wrong-password":
            return "Incorrect password. Please try again.";
        case "auth/invalid-credential":
            return "The credentials provided are invalid. Please check your email and password.";
        case "auth/too-many-requests":
            return "Too many attempts. Access for this account has been temporarily disabled. Please reset your password or try again later.";
        case "auth/popup-closed-by-user":
            return "The sign-in popup was closed before completion.";
        case "auth/network-request-failed":
            return "A network error occurred. Please check your connection.";
        case "auth/internal-error":
            return "An internal error occurred. Please try again later.";
        default:
            return "An unexpected error occurred. Please try again.";
    }
};
