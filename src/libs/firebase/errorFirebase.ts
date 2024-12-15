const firebaseErrorMessages: Record<string, string> = {
  "auth/user-not-found": "User not found. Please check your credentials.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use":
    "The email address is already in use by another account.",
  "auth/invalid-email":
    "The email address is not valid. Please enter a valid email.",
  "auth/operation-not-allowed":
    "Operation not allowed. Please check your configuration.",
  "auth/weak-password":
    "The password is too weak. Please choose a stronger password.",
  "auth/user-disabled": "This user has been disabled. Please contact support.",
  "auth/requires-recent-login":
    "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
  "firestore/permission-denied":
    "You do not have permission to perform this action.",
  "firestore/unavailable":
    "The Firestore service is currently unavailable. Please try again later.",
  "storage/unknown": "An unknown error occurred with Firebase Storage.",
  "storage/object-not-found": "No object exists at the desired reference.",
  "storage/bucket-not-found": "The storage bucket could not be found.",
  "storage/project-not-found": "No project found with the specified ID.",
  "storage/quota-exceeded":
    "Quota on this bucket has been exceeded. Please upgrade to continue.",
  "storage/unauthenticated":
    "You are not authenticated. Please authenticate and try again.",
  "storage/unauthorized":
    "You are not authorized to perform the desired action.",
  "firestore/cancelled": "The operation was cancelled.",
  "firestore/unknown": "An unknown error occurred.",
  "firestore/invalid-argument": "An invalid argument was provided.",
  "firestore/deadline-exceeded": "The operation took too long to complete.",
  "firestore/not-found": "The requested document was not found.",
  "firestore/already-exists": "The document already exists.",
  "firestore/resource-exhausted": "The resource quota has been exhausted.",
  "firestore/failed-precondition":
    "A precondition for the operation was not met.",
  "firestore/aborted": "The operation was aborted due to concurrency issues.",
  "firestore/out-of-range":
    "The operation was attempted outside of a valid range.",
  "firestore/unimplemented": "The operation is not implemented.",
  "firestore/internal": "An internal error occurred.",
  "firestore/data-loss": "Data may have been lost.",
  "firestore/unauthenticated":
    "The request does not have valid authentication credentials.",
};

class FirebaseServiceError extends Error {
  constructor(error: string) {
    const message =
      firebaseErrorMessages[error] ||
      "An unknown error occurred. Please try again later.";
    super(message);
    this.name = "FirebaseServiceError";
  }
}

export { FirebaseServiceError, firebaseErrorMessages };
