export interface ResultRecommandation{
  recommanded: boolean,
  progRecommanded: string,
  imc: number,
  choix: string,
  taille: number
  poids: number
}
export interface DemandeDeRecommandation{
  taille: number,
  poids: number,
  choix: string
}
