// D'abord il faut définir les informations du jeu, qui apparaitra dans h2
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// comment on gagne : on définit les lignes et les diagonales
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// le message de fin de jeu
const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalite = () => "Egalité"
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

// qui commence
statut.innerHTML = tourJoueur()

// On met en place évènements lorsque l'on clic sur une case du morpion, puis les fonctions associées
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#recommencer").addEventListener("click", recommencer)

// lorsque l'on clic, ou est la case
function gestionClicCase(){
    const indexCase = parseInt(this.dataset.index)
    
    // est-ce que le jeu est encore en cours? la case est elle remplie
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

    // sinon, on met dans la case une croix ou un rond en fonction du joueur actif
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    // On vérifie si le joueur a gagné
    verifGagne()
}


//Cette fonction vérifie si le joueur a gagné, pour celà, il faut une fonction qui vérifie en permanence les conditions de victoires, il faut donc les parcourir une par une
 
function verifGagne(){
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for(let conditionVictoire of conditionsVictoire){
        // On récupère les 3 cases de la condition de victoire
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // Si l'une des cases est vide
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // Si les 3 cases sont identiques
        if(val1 === val2 && val2 === val3){
            // On gagne
            tourGagnant = true
            break
        }
    }

    // Si on a gagné
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    // Si toutes les cases sont remplies
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    // On change de joueur
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

// Cette fonction réinitialise le jeu, si on clic sur le bouton crée précedemment, alors on efface les cases en passant l'état du jeu à rien ""

function recommencer(){
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}