#Matrice du tableau qui pourra etre modifié en cour de jeu
def tableau(case):
    print(case[1],"|",case[2],"|",case[3])
    print("--|---|---")
    print(case[4],"|",case[5],"|",case[6])
    print("--|---|---")
    print(case[7],"|",case[8],"|",case[9])

#Les differentes combinaisons pour determiner un gagnant
def Condition_Pour_Gagner(case,joueur):
    victoire=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
    for combinaison in victoire:
        if case[combinaison[0]] == case[combinaison[1]] == case[combinaison[2]] == joueur:
            return True 
    return False # Si il y a une combinaison la partie en cour sera en FALSE (fini)

def Morpion():
    #Permet de donner une valeur pour chaque case de 1 à 9
    case={i:str(i) for i in range(1,10)}
    joueur_actuel="X"
    partie_en_cour=True
    print("Viens Jouer Batard")
    tableau(case)
    while partie_en_cour:
        try:
            tour=int(input(f"Joueur {joueur_actuel} choisi un chiffre entre 1 a 9 pour te placer: "))
            #verifie si la case n'est pas déja prise sinon renvoie la question
            if case[tour] in ["X","O"]:
                print("Tié trop lent le sang, c'est deja pris")
                continue
            #verifie que le chiffre demander est entre 1 et 9
            if 1 > tour >10:
                print("Apprend à compter")
                continue
            #Si la réponse n'est pas un chiffre renvoie une erreur et repose la question
        except ValueError:
            print("Un chiffre entre 1 a 9, c'est pas compliquer nan ?")
            continue
        #Le joueur remplace la valeur de la case par X ou O
        case[tour]= joueur_actuel
        tableau(case)

        if Condition_Pour_Gagner(case,joueur_actuel):
            print(f"Joueur {joueur_actuel} à gagner")
            partie_en_cour=False
        else:
            #alterne entre X et O si n'y a pas de gagnant
            joueur_actuel="O" if joueur_actuel=="X" else "X"
    print("C'est FINI DEGAGE")

Morpion()
        

