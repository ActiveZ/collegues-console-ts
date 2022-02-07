import { createInterface } from "readline";
import { readFileSync } from "fs";
import { Api } from "./service";
import { Collegue } from "./collegue";

export class Presentation {
  // méthode pour séctionner une réponse utilisateur
  question(title: string): Promise<string> {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise(function (resolve, reject) {
      rl.question(title, function (answer) {
        resolve(answer);
        rl.close();
      });
    });
  }

  /////////////// MENU ////////////////
  async menu() {
    // instanciation de l'api
    const api = new Api();

    do {
      // affichage du menu contenu dans le fichier texte menu.txt
      const menu = readFileSync("menu.txt", "utf-8");
      console.log(menu);

      // sélection du choix utilisateur
      const choice: string = await this.question("Votre choix: ");

      // actions selon choix utilisateur
      switch (choice) {
        case "1": // GET
          await api.get().then((collegues: Collegue[]) => {
            collegues.forEach((c) => console.log(c.prenom + " " + c.nom));
          });
          break;
        case "2": // POST
          // création d'un collègue
          const newCollegue = new Collegue();
          newCollegue.pseudo = await this.question("pseudo: ");
          newCollegue.nom = await this.question("nom: ");
          newCollegue.prenom = await this.question("prénom: ");
          newCollegue.photo = await this.question("photo: ");
          // newCollegue.score = Number(await this.question("score: "));
          // ajout du collègue dans la db
          await api.post(newCollegue).then((data) => console.log(data));
          break;
        case "3": // vote pour un pseudo
          const pseudo = await this.question("pseudo: ");
          await api.vote(pseudo).then((data) => console.log("data", data));
          break;
        case "4": // classement
          await api.get().then((collegues: Collegue[]) => {
            // tri par ordre décroissant des scores
            collegues.sort((a, b) => b.score - a.score);
            // affichage joli :)
            collegues.forEach((c) => {
              console.log(c.prenom + " " + c.nom + " a un score de " + c.score);
            });
          });
          break;
        case "99": // exit
          console.log("Au revoir !");
          process.exit(0);
        default:
          console.log("ERREUR: choix invalide !");
      }
    } while (1);
  }
}
