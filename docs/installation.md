nest new blog-api
__________________
nest new blog-api
_________________
	
	## Dependance complete
		npm install --save @nestjs/typeorm typeorm pg @nestjs/passport passport @nestjs/jwt jwt-secret bcryptjs && npm install --save-dev @types/passport-jwt @types/bcryptjs @types/node @types/express @types/jest

		npm install --save @nestjs/typeorm typeorm pg @nestjs/passport passport @nestjs/jwt jwt-secret bcryptjs @nestjs/swagger swagger-ui-express class-validator class-transformer && npm install --save-dev @types/passport-jwt @types/bcryptjs @types/node @types/express @types/jest

	## Pour la config
		`npm install @nestjs/config`


	## Explication

	C'est une excellente question de vérification ! Il est crucial de savoir ce que chaque paquet apporte à votre projet.

Voici la liste de tout ce qui sera installé par cette commande unique, séparée par leur rôle dans votre API.

---

## 💾 Dépendances de Production (`--save`)

Ces paquets sont essentiels au fonctionnement de votre application en production. Ils seront installés dans la section `dependencies` de votre fichier `package.json`.

### 1. 📂 Couche Données (TypeORM)

| Paquet | Rôle Principal | Détails |
| :--- | :--- | :--- |
| **`@nestjs/typeorm`** | **Intégration NestJS** | Fournit le module **NestJS** pour connecter et configurer l'ORM **TypeORM** facilement dans votre application, en utilisant le système d'injection de dépendances de Nest. |
| **`typeorm`** | **ORM** | Le **Mapping Relationnel Objet (ORM)**. Il vous permet d'interagir avec votre base de données (PostgreSQL, MySQL, etc.) en utilisant des classes et des objets TypeScript/JavaScript (appelés **Entités**), au lieu d'écrire du SQL brut. |
| **`pg`** | **Pilote BDD** | Le **pilote (driver)** Node.js pour la base de données **PostgreSQL**. Il assure la communication physique entre TypeORM et le serveur PostgreSQL. (Si vous aviez choisi MySQL, cela aurait été `mysql` ou `mysql2`). |

### 2. 🛡️ Couche Authentification (JWT & Passport)

| Paquet | Rôle Principal | Détails |
| :--- | :--- | :--- |
| **`@nestjs/passport`** | **Intégration NestJS** | Le module **NestJS** qui facilite l'utilisation de la librairie **Passport** au sein de vos **Contrôleurs** et de vos **Guards**. |
| **`passport`** | **Moteur d'Auth** | Le middleware d'authentification de Node.js le plus populaire. Il ne fait pas l'authentification lui-même, mais fournit un **cadre** pour brancher des "stratégies" d'authentification (comme JWT, Local, Google, etc.). |
| **`@nestjs/jwt`** | **Gestion JWT** | Module **NestJS** pour la création et la vérification des **JSON Web Tokens (JWT)**. C'est ce qui vous permet de générer un jeton sécurisé après la connexion d'un utilisateur. |
| **`jwt-secret`** | **Dépendance (Peut être optionnel)** | J'ai inclus ce paquet comme placeholder pour une dépendance JWT courante, bien que souvent il suffise de définir une clé secrète dans les options du module `@nestjs/jwt`. |
| **`bcryptjs`** | **Hachage Mot de Passe** | Librairie rapide pour hacher les mots de passe. C'est absolument **essentiel** pour stocker les mots de passe de manière sécurisée (vous ne devez jamais stocker les mots de passe en clair). |

---

## 🛠️ Dépendances de Développement (`--save-dev` ou `-D`)

Ces paquets sont uniquement nécessaires pendant le développement ou pour la compilation du code. Ils seront installés dans la section `devDependencies` de votre fichier `package.json`.

Ces paquets sont souvent des **définitions de types TypeScript** (appelées **`@types/`**). Ils permettent à l'éditeur de code (comme VS Code) de comprendre la structure et les méthodes des librairies JavaScript traditionnelles (`passport`, `bcryptjs`, etc.) et d'éviter les erreurs de compilation.

| Paquet | Rôle Principal | Détails |
| :--- | :--- | :--- |
| **`@types/passport-jwt`** | **Typage** | Permet d'utiliser les classes et méthodes de la stratégie Passport-JWT avec la sécurité de **TypeScript**. |
| **`@types/bcryptjs`** | **Typage** | Permet d'utiliser `bcryptjs` avec la sécurité de **TypeScript**. |
| **`@types/node`** | **Typage** | Fournit les définitions de types pour les API natives de l'environnement **Node.js** (comme le système de fichiers `fs` ou le serveur HTTP). |
| **`@types/express`** | **Typage** | NestJS est construit au-dessus du framework **Express**. Ces types sont essentiels pour la compatibilité. |
| **`@types/jest`** | **Typage** | Fournit les définitions de types pour le framework de tests **Jest** (le standard de NestJS). |

C'est une excellente observation \! Vous avez tout à fait raison. Un environnement de développement professionnel pour une API NestJS inclut absolument ces outils.

L'omission de **Swagger** et de la **validation** rendrait l'API difficile à documenter et dangereuse (sans validation des données entrantes).

Voici la commande **finale et complète** incluant tous les outils nécessaires pour la base de données, l'authentification, la validation, et la documentation :

-----

## 💻 Commande d'Installation Complète et Finale

```bash
npm install --save @nestjs/typeorm typeorm pg @nestjs/passport passport @nestjs/jwt jwt-secret bcryptjs @nestjs/swagger swagger-ui-express class-validator class-transformer && npm install --save-dev @types/passport-jwt @types/bcryptjs @types/node @types/express @types/jest
```

-----

## 🚀 Les Nouveaux Rôles (Documentation & Validation)

J'ajoute les explications pour les paquets que vous avez mentionnés :

### 1\. 📝 Documentation de l'API (Swagger / OpenAPI)

| Paquet | Rôle Principal | Détails |
| :--- | :--- | :--- |
| **`@nestjs/swagger`** | **Intégration NestJS** | Le module NestJS qui permet de générer automatiquement la documentation de votre API (format **OpenAPI** ou **Swagger**) à partir des décorateurs utilisés dans vos **Contrôleurs** et vos **DTOs**. |
| **`swagger-ui-express`** | **Interface Utilisateur** | C'est la librairie qui sert l'interface graphique interactive (la page web) permettant de **visualiser et de tester** les endpoints de votre API directement dans le navigateur. |

### 2\. ✅ Validation des Requêtes (DTOs)

| Paquet | Rôle Principal | Détails |
| :--- | :--- | :--- |
| **`class-validator`** | **Validation** | Fournit les décorateurs (`@IsString()`, `@IsEmail()`, `@IsNotEmpty()`, etc.) pour définir les règles de validation de vos objets de transfert de données (**DTOs**). |
| **`class-transformer`** | **Transformation** | Une dépendance **obligatoire** de `class-validator`. Elle convertit les données brutes (JSON) reçues dans le corps des requêtes en instances de classes TypeScript, permettant à `class-validator` de vérifier les types et d'appliquer la validation. |

Avec cette commande, vous avez maintenant toutes les briques essentielles pour bâtir une API de niveau professionnel en NestJS :

1.  **Code Propre** (TypeScript, NestJS).
2.  **Base de Données** (TypeORM, pg).
3.  **Sécurité** (Passport, JWT, bcryptjs).
4.  **Qualité des Données** (class-validator, class-transformer).
5.  **Accessibilité/Testabilité** (Swagger).