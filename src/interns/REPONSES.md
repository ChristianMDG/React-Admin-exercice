# React-Admin — Partie 1

## Question 1.1

### Que représente le dataProvider dans React-Admin ? Quel est son rôle ?

Le `dataProvider` est la couche d'abstraction entre React-Admin et l'API.

Son rôle est de traduire les actions de React-Admin (liste, création, modification, suppression, détail) en requêtes HTTP vers le backend.

Par exemple :

* `getList()` → GET
* `getOne()` → GET
* `create()` → POST
* `update()` → PUT/PATCH
* `delete()` → DELETE

Ainsi, React-Admin reste indépendant de la technologie utilisée côté serveur.

---

## Question 1.2

### Quelle requête HTTP est envoyée au chargement de la liste ?

Lors du chargement de la liste des employés, React-Admin envoie une requête :

```http
GET /employees
```

Avec des paramètres de pagination, tri et filtres :

```http
GET /employees?_page=1&_perPage=10&_sort=id&_order=ASC
```

---

## Question 2.1

### Que fait la prop rowClick="edit" sur le Datagrid ?

La propriété :

```tsx
rowClick="edit"
```

rend chaque ligne du tableau cliquable.

Lorsque l'utilisateur clique sur une ligne, il est automatiquement redirigé vers la page de modification de l'enregistrement concerné.

---

## Question 2.2

### Passez perPage à 2. Que se passe-t-il ?

La liste affiche uniquement 2 employés par page.

Une pagination apparaît automatiquement permettant de naviguer entre les différentes pages.

---

## Question 3.1

### Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?

La validation empêche l'envoi du formulaire.

Un message d'erreur est affiché indiquant que le champ est obligatoire.

Aucune requête HTTP n'est envoyée au serveur.

---

## Question 3.2

### Essayez de saisir un salaire de 500 €. Que se passe-t-il ?

La validation `min(1500)` échoue.

Un message d'erreur est affiché et le formulaire ne peut pas être soumis tant que la valeur reste inférieure à 1500.

---

## Question 4.1

### Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?

Par défaut avec `json-server`, React-Admin utilise :

```http
PUT /employees/:id
```

pour mettre à jour l'employé.

---

## Question 4.2

### À quel moment useRecordContext() est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?

`useRecordContext()` devient disponible lorsque React-Admin a chargé l'enregistrement courant.

Si les données ne sont pas encore disponibles :

```tsx
const record = useRecordContext();
```

retourne :

```tsx
undefined
```

Il est donc nécessaire de vérifier l'existence de `record` avant d'accéder à ses propriétés.

---

## Question 5.1

### Différence entre SimpleShowLayout et TabbedShowLayout ?

### SimpleShowLayout

Affiche toutes les informations dans une seule page.

Avantages :

* Simple
* Rapide à mettre en place

### TabbedShowLayout

Organise les informations dans plusieurs onglets.

Avantages :

* Plus lisible pour les gros volumes de données
* Permet de séparer les informations par catégories

---

# React-Admin — Partie 2

## Question 6.1

### ReferenceField génère quel appel HTTP pour résoudre le manager ?

Pour un stagiaire possédant :

```json
{
  "managerId": 3
}
```

React-Admin effectue :

```http
GET /employees/3
```

afin de récupérer les informations du manager.

---

## Question 6.2

### Que se passe-t-il si managerId ne correspond à aucun employé ?

Le `ReferenceField` ne trouve aucun enregistrement.

Visuellement :

* le champ reste vide ;
* ou React-Admin affiche un contenu vide selon la configuration utilisée.

Aucune donnée du manager n'est affichée.

---

## Question 7.1

### Quelle méthode HTTP est émise lors de la soumission de InternCreate ? Vers quel endpoint ?

React-Admin utilise :

```http
POST /interns
```

pour créer un nouveau stagiaire.

---

## Question 7.2

### Quel hook utilisez-vous pour la validation conditionnelle de remuneration, et pourquoi ?

On utilise :

```tsx
useWatch()
```

issu de `react-hook-form`.

Il permet d'observer en temps réel la valeur de :

```tsx
isRemunerate
```

et de rendre le champ `remuneration` obligatoire uniquement lorsque cette case est cochée.

---

## Question 8.1

### Différence entre useGetOne et ReferenceField ?

### ReferenceField

* Déclaratif
* Destiné principalement à l'affichage d'une référence

Exemple :

```tsx
<ReferenceField source="managerId" reference="employees" />
```

### useGetOne

* Impératif
* Permet de récupérer manuellement un enregistrement
* Gestion complète des états :

  * loading
  * error
  * success

On préfère `useGetOne` lorsqu'une logique personnalisée est nécessaire.

---

## Question 8.2

### Que se passe-t-il si useGetOne reçoit id: undefined sans enabled ?

La requête est quand même déclenchée.

Exemple :

```http
GET /employees/undefined
```

Ce qui produit généralement :

* erreur réseau ;
* erreur 404 ;
* comportement inattendu.

Avec :

```tsx
enabled: !!managerId
```

la requête n'est exécutée que lorsque l'identifiant existe réellement.

---

## Question 9.1

### Différence entre useGetList et ReferenceManyField ?

### ReferenceManyField

Permet simplement d'afficher une relation 1-N.

### useGetList

Permet :

* filtrage avancé ;
* calculs personnalisés ;
* statistiques ;
* récupération du total ;
* traitements métier.

Il est indispensable lorsqu'on a besoin de manipuler les données récupérées.

---

## Question 9.2

### Comment optimiser DepartmentStats ?

On ne récupère qu'un seul élément :

```tsx
pagination: {
    page: 1,
    perPage: 1
}
```

Puis on exploite :

```tsx
total
```

renvoyé par React-Admin.

Ainsi :

* une seule ligne est chargée ;
* le nombre total reste disponible ;
* la requête est plus performante.

---

## Question 10.1

### Quelle méthode HTTP useUpdate utilise-t-il par défaut ? Comment forcer PATCH ?

Par défaut :

```http
PUT
```

Pour utiliser PATCH, il faut que le `dataProvider` soit configuré pour envoyer une requête PATCH lors de l'appel `update`.

La modification se fait généralement dans l'implémentation du `dataProvider`.

---

## Question 10.2

### Pourquoi previousData est-il nécessaire ?

`previousData` contient l'état actuel de l'enregistrement.

Il est utilisé pour :

* l'optimistic update ;
* la comparaison avant/après ;
* la cohérence du cache React-Admin.

Sans `previousData` :

* certaines mises à jour optimistes ne fonctionnent pas correctement ;
* React-Admin peut ne pas pouvoir recalculer correctement l'état local.

---

## Question 11.1

### Différence entre useCreate et le composant Create ?

### Create

Composant complet fourni par React-Admin :

* page dédiée ;
* formulaire complet ;
* navigation automatique.

### useCreate

Hook bas niveau permettant :

* de créer un enregistrement depuis n'importe quel composant ;
* une modale ;
* un bouton personnalisé ;
* un workflow spécifique.

Il offre davantage de contrôle.

---

## Question 11.2

### Comment recharger la liste après une création réussie ?

Après succès :

```tsx
refresh();
```

grâce au hook :

```tsx
useRefresh()
```

Cela force React-Admin à recharger les données de la liste.

---

## Question 12.1

### Les 4 appels useGetList se font-ils en parallèle ou en séquence ?

Ils sont exécutés en parallèle.

Chaque appel utilise React Query et démarre indépendamment des autres.

Cela réduit le temps total de chargement du Dashboard.

---

## Question 12.2

### Pourquoi perPage: 1 est préférable à perPage: 100 ?

Dans le Dashboard, seul le nombre total est nécessaire.

Avec :

```tsx
perPage: 1
```

on récupère :

* le total des éléments ;
* seulement un enregistrement.

Cela réduit :

* le trafic réseau ;
* le temps de chargement ;
* la mémoire utilisée.

C'est donc beaucoup plus performant que :

```tsx
perPage: 100
```
