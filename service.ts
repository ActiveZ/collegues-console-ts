import fetch from "node-fetch";
import { Collegue } from "./collegue";
export class Api {
  /**
   * api GET
   * @returns liste des collègues
   */
  async get() {
    const url =
      "https://formation-angular-collegues.herokuapp.com/api/v1/collegues";

    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      console.log("Erreur:", err);
    }
  }

  /**
   *
   * @param {*} newCollegue = objet collegue
   * @returns
   */
  async post(newCollegue: Collegue) {
    const url =
      "https://formation-angular-collegues.herokuapp.com/api/v1/collegues";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollegue),
      });
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      console.log("Erreur:", err);
    }
  }

  /**
   *
   * @param {*} pseudo = pseudo du collegue
   */
  async vote(pseudo: string) {
    const url =
      "https://formation-angular-collegues.herokuapp.com/api/v1/votes";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avis: "AIMER",
          pseudo: pseudo,
        }),
      });
      if (response.ok) {
        return response.json();
      }
    } catch (err) {
      console.log("Erreur:", err);
    }
  }
}
