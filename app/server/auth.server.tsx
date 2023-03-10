import { json, redirect } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { getSession, commitSession, destroySession } from "./session.server";
import bcrypt from "bcrypt";
import { AccountType } from "@prisma/client";

type LoginForm = {
    email: FormDataEntryValue | null
    password: FormDataEntryValue | null
};

type CreateAccountForm = {
    firstName: FormDataEntryValue | null,
    lastName: FormDataEntryValue | null,
    email: FormDataEntryValue | null, 
    password: FormDataEntryValue | null
}

type CreateGuestAccountForm = {
    firstName: FormDataEntryValue | null,
    lastName: FormDataEntryValue | null,
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

export async function createAccount({firstName, lastName, email, password}: CreateAccountForm) {
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
                    password: hashedPassword, 
                    accountType: AccountType.AUTHENTICATED
                }
            });
            return user.id;
        }
    }
    return null;
};

export async function createGuestAccount({firstName, lastName}: CreateGuestAccountForm) {
    if (firstName && lastName) {
        const user = await prisma.user.create({
            data: {
                profile: {
                    firstName: firstName as string,
                    lastName: lastName as string
                },
                accountType: AccountType.GUEST
            }
        })
        return user.id
    }
} 

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
            workspaces: {
                include: {
                    tasks: {
                        include: {
                            assignee: {
                                select: {
                                    profile: true
                                }
                            }
                        }
                    }
                }   
            },
            joinedWorkspaces: {
                include: {
                    tasks: {
                        include: {
                            assignee: {
                                select: {
                                    profile: true
                                }
                            }
                        }
                    }
                } 
            },
            tasks: {
                include: {
                    workspace: {
                        select: {
                            title: true
                        }
                    }
                }
            }
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

export async function deleteAccount(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    const userId = session.get("userId");

    if (userId) {

        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        
        await signOut(request);
    }
    
}