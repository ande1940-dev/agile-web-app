import { createCookieSessionStorage } from "@remix-run/node"; 

const sessionSecret = process.env.SESSION_SECRET;
const nodeEnv = process.env.NODE_ENV 

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set")
};

if (!nodeEnv) {
    throw new Error("NODE_ENE must be set")
}

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "agile-session",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: nodeEnv === 'production'
      },
    }
  );

export { getSession, commitSession, destroySession };