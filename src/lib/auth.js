import { db, User, Session } from "astro:db";
import { Lucia } from "lucia";
import { AstroDBAdapter } from "lucia-adapter-astrodb";

const adapter = new AstroDBAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: true,
            sameSite: 'strict',
        },
    },
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
            id: attributes.id,
			username: attributes.username
		};
	}
});
