import {
  Show,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/react";

function App() {
  const { isSignedIn, isLoaded, sessionId } = useAuth();

async function getPostmanToken() {
  if (!isSignedIn || !sessionId) {
    alert("Please sign in first.");
    return;
  }

  const token = await window.Clerk.session.getToken();

  if (!token) {
    alert("Failed to generate token.");
    return;
  }

  console.log("Postman JWT:");
  console.log(token);

  await navigator.clipboard.writeText(token);

  alert("JWT copied to clipboard.");
}

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>DhanChakra Auth Test</h1>

      <Show when="signed-out">
        <p>You are not signed in.</p>

        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <p>You are authenticated.</p>

        <div style={{ marginBottom: "20px" }}>
          <UserButton />
        </div>

        <button onClick={getPostmanToken}>
          Get Postman JWT
        </button>
      </Show>
    </div>
  );
}

export default App;