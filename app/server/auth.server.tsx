import { json, redirect } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { getSession, commitSession, destroySession } from "./session.server";
import bcrypt from "bcrypt";

type LoginForm = {
    email: FormDataEntryValue | null
    password: FormDataEntryValue | null
};

type RegisterForm = {
    firstName: FormDataEntryValue | null,
    lastName: FormDataEntryValue | null,
    email: FormDataEntryValue | null, 
    password: FormDataEntryValue | null
}

export async function logIn({email, password}: LoginForm) {
    if (email && password) {
        const user = await prisma.user.findUnique({
            where: {
                email: email as string
            }
        }) 
        if (user && (user.password && await bcrypt.compare(password as string, user.password))) {
            return user.id
        }
    }
    return null;
};

export async function signUp({firstName, lastName, email, password}: RegisterForm) {
    if (firstName && lastName && email && password) {
        const hashedPassword = await bcrypt.hash(password as string, 10);

        const exists = await prisma.user.count({
            where: {
                email: email as string
            }
        })

        if (!exists) {
            const user = await prisma.user.create({
                data: {
                    profile: {
                        firstName: firstName as string,
                        lastName: lastName as string
                    },
                    email: email as string,
                    password: hashedPassword
                }
            });
            return user.id;
        }
    }
    return null;
};

export async function getUserSession(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    
    if (session.has("userId")) {
        return redirect("/dashboard");
    };

    const data = { error: session.get("error") };

    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export async function getUserId(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    const userId = session.get("userId");
}

export async function getUser(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    
    const userId = session.get("userId");

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            workspaces: true,
            joinedWorkspaces: true
        }
    })

    return user;
};

export async function signOut(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
    });
}