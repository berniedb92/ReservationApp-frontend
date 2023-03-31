export class User {
  username!: string;
  password!: string;
  isAdmin!: boolean;
}

export class Utente {
  id!: string;
	userId!: string;
	password!: string;
	attivo!: string;
	ruoli!: Array<string>;
	codiceTessera!: string;
}
