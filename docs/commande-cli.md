## Les commandes a taper dans l'ordre
`nest generate module [users]`
`nest generate controller [users]`
`nest generate service [users]`

Créez le fichier src/auth/local.strategy.ts :
`nest generate class auth/local.strategy --type=strategy`

Librairie
`npm install passport-local`
Vous devez installer le paquet @types/passport-local
`npm install --save-dev @types/passport-local`
    Rappel Concept : Toute librairie JavaScript qui n'est pas écrite en TypeScript nécessite un paquet @types/nom-de-la-librairie pour que l'éditeur (VS Code) et le compilateur comprennent les fonctions et les structures de cette librairie.

# Génère le module, le contrôleur, et le service
nest generate resource categories

# Génère l'entité de base
nest generate class categories/entities/category --type entity