import fetch from "node-fetch";
import { Collegue } from "./collegue";
export class Api {
  /**
   * api GET
   * @returns liste des collègues
   */
  async get(): Promise<any> {
    const url =
      "https://formation-angular-collegues.herokuapp.com/api/v1/collegues";

    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Erreur:", err);
    }
  }

  /**
   *
   * @param {*} newCollegue = objet collegue
   * @returns
   */
  async post(newCollegue: Collegue): Promise<any> {
    const url =
      "https://formation-angular-collegues.herokuapp.com/api/v1/collegues";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollegue),
      });
      const data = await response.json();
      return data;
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
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Erreur:", err);
    }
  }
}
