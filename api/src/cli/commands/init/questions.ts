import path from 'path';

const filename = ({ filepath }: { filepath: string }) => ({
	type: 'input',
	name: 'filename',
	message: 'Database File Path:',
	default: path.join(filepath, 'data.db'),
});

const host = () => ({
	type: 'input',
	name: 'host',
	message: 'Database Host:',
	default: '127.0.0.1',
});

const port = ({ client }: { client: string }) => ({
	type: 'input',
	name: 'port',
	message: 'Port:',
	default() {
		const ports: Record<string, number> = {
			pg: 5432,
			mysql: 3306,
			oracledb: 1521,
			mssql: 1433,
		};

		return ports[client];
	},
});

const database = () => ({
	type: 'input',
	name: 'database',
	message: 'Database Name:',
	default: 'directus',
});

const user = () => ({
	type: 'input',
	name: 'user',
	message: 'Database User:',
});

const password = () => ({
	type: 'password',
	name: 'password',
	message: 'Database Password:',
	mask: '*',
});

export const databaseQuestions = {
	sqlite3: [filename],
	mysql: [host, port, database, user, password],
	pg: [host, port, database, user, password],
	oracledb: [host, port, database, user, password],
	mssql: [host, port, database, user, password],
};
