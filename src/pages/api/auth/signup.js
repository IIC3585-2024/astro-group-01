import { lucia } from "../../../lib/auth";
import { generateId } from "lucia";
import { db, User } from "astro:db";

export async function POST(context) {
	const formData = await context.request.formData();
	const username = formData.get("username");

	const usersData = await db.select().from(User);
    const existentName = usersData.filter((user) => user.username.toLowerCase() === username.toLowerCase());

    if (existentName.length > 0) {
		return new Response(JSON.stringify({ error: "Username already exists" }), {
			status: 400
		});
	}

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return new Response(JSON.stringify({
			error: "Invalid username: must be 3-31 characters long and alphanumeric with '_' or '-'",
		}), {
			status: 400
		});
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return new Response(JSON.stringify({
			error: "Invalid password: must be 6-255 characters long",
		}), {
			status: 400
		});
	}

	const userId = generateId(10);

	try {
		await db.insert(User).values({
			id: userId,
			username,
			password,
		});
	} catch (error) {
		return new Response(JSON.stringify({
			error: `Error creating user: ${error.message}`,
		}), {
			status: 500
		});
	}

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/");
}
