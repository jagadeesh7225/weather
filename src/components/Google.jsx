import React from 'react'
import { signInWithGoogle } from '../firebaseConfig';

export default function Google({ onLogin }) {
  const onSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      if (onLogin) {
        onLogin(result.user);
      }
    } catch (error) {
      alert("Google sign-in failed");
    }
  };

  return (
    <div>
      <button onClick={onSignInWithGoogle}>Login in with Google</button>
    </div>
  );
}