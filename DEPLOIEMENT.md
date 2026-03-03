# 🚀 Guide de Déploiement

## Déploiement Gratuit en 5 Minutes

### Option 1: GitHub Pages (Recommandé)

#### Étape 1: Créer un compte GitHub
1. Allez sur https://github.com
2. Créez un compte gratuit
3. Vérifiez votre adresse email

#### Étape 2: Créer un repository
1. Cliquez sur le bouton "+" → "New repository"
2. Nommez-le : `grilles-points-croix`
3. Cochez "Public" (pour GitHub Pages gratuit)
4. Cliquez sur "Create repository"

#### Étape 3: Uploader les fichiers
**Option A: Via l'interface web (le plus simple)**
1. Cliquez sur "uploading an existing file"
2. Glissez-déposez tous les fichiers du projet
3. Ajoutez un message de commit : "Initial commit"
4. Cliquez sur "Commit changes"

**Option B: Via Git (pour les utilisateurs avancés)**
```bash
cd votre-dossier-projet
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/grilles-points-croix.git
git push -u origin main
```

#### Étape 4: Activer GitHub Pages
1. Allez dans "Settings" du repository
2. Cliquez sur "Pages" dans le menu de gauche
3. Sous "Source", sélectionnez "Deploy from a branch"
4. Sélectionnez "main" branch et "/ (root)" folder
5. Cliquez sur "Save"

#### Étape 5: Accéder à votre site
- Attendez 1-2 minutes
- Votre site sera accessible à : `https://VOTRE_USERNAME.github.io/grilles-points-croix/`

---

### Option 2: Netlify (Encore plus simple)

#### Étape 1: Créer un compte Netlify
1. Allez sur https://netlify.com
2. Créez un compte gratuit
3. Connectez-vous

#### Étape 2: Déployer
1. Cliquez sur "Add new site" → "Deploy manually"
2. Glissez-déposez le dossier complet du projet
3. Attendez quelques secondes
4. Votre site est en ligne ! 🎉

#### Étape 3: Personnaliser le domaine (optionnel)
1. Cliquez sur "Site settings"
2. Allez dans "Change site name"
3. Choisissez un nom : `grilles-points-croix.netlify.app`

---

### Option 3: Vercel

#### Étape 1: Créer un compte Vercel
1. Allez sur https://vercel.com
2. Créez un compte gratuit
3. Connectez-vous avec GitHub

#### Étape 2: Importer le projet
1. Cliquez sur "Add New Project"
2. Sélectionnez votre repository GitHub
3. Cliquez sur "Deploy"
4. Attendez le déploiement

---

## 🌐 Personnaliser Votre Nom de Domaine

### Domaine Gratuit (Subdomain)
- GitHub Pages : `votre-site.github.io`
- Netlify : `votre-site.netlify.app`
- Vercel : `votre-site.vercel.app`

### Domaine Personnalisé (Payant)
1. Achetez un domaine sur :
   - Namecheap (~10€/an)
   - OVH (~10€/an)
   - Gandi (~12€/an)

2. Configurez les DNS :
   - Type A : `192.30.252.153` (GitHub Pages)
   - Type CNAME : `your-username.github.io`

3. Ajoutez le domaine dans les paramètres de votre hébergeur

---

## 💳 Intégration du Paiement

### Stripe (Recommandé)

#### 1. Créer un compte Stripe
1. Allez sur https://stripe.com
2. Créez un compte (gratuit)
3. Complétez votre profil

#### 2. Obtenir les clés API
1. Allez dans "Developers" → "API keys"
2. Copiez la "Publishable key"
3. Copiez la "Secret key"

#### 3. Intégrer Stripe Checkout
Dans `panier.html`, ajoutez :
```html
<script src="https://js.stripe.com/v3/"></script>
<script>
  const stripe = Stripe('VOTRE_PUBLISHABLE_KEY');
</script>
```

#### 4. Créer une session de paiement (Backend nécessaire)
Pour une vraie intégration, vous aurez besoin d'un backend. Utilisez :
- Netlify Functions (gratuit)
- Vercel Serverless Functions (gratuit)
- Cloudflare Workers (gratuit)

### PayPal

#### 1. Créer un compte PayPal Business
1. Allez sur https://paypal.com
2. Créez un compte "Business" (gratuit)
3. Complétez la vérification

#### 2. Obtenir les identifiants
1. Allez dans "Settings" → "API credentials"
2. Créez des identifiants "REST API"
3. Copiez le Client ID

#### 3. Intégrer PayPal
```html
<script src="https://www.paypal.com/sdk/js?client-id=VOTRE_CLIENT_ID&currency=EUR"></script>
```

---

## 📧 Configuration de l'Email Automatique

### SendGrid (100 emails gratuits/jour)

1. Créez un compte sur https://sendgrid.com
2. Créez une API Key
3. Configurez un template email
4. Utilisez l'API pour envoyer les emails

### Alternative Simple
Pour commencer, vous pouvez utiliser un service comme :
- **Formspree** : https://formspree.io (gratuit jusqu'à 50 soumissions/mois)
- **Netlify Forms** : Inclu gratuitement avec Netlify

---

## 📊 Analytics

### Google Analytics (Gratuit)

1. Créez un compte sur https://analytics.google.com
2. Créez une propriété "Web"
3. Obtenez le tracking ID (format: UA-XXXXX-X)
4. Ajoutez dans chaque fichier HTML avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXX-X');
</script>
```

---

## 🔒 Sécurité

### HTTPS
Tous les hébergeurs mentionnés offrent HTTPS gratuit automatiquement.

### Protection Contre le Spam
Ajoutez reCAPTCHA sur vos formulaires :
1. Créez un compte sur https://www.google.com/recaptcha
2. Obtenez les clés Site Key et Secret Key
3. Intégrez le widget dans vos formulaires

---

## 📈 SEO - Premiers Pas

### 1. Soumettre le site à Google
1. Créez un compte Google Search Console
2. Ajoutez votre propriété
3. Vérifiez avec le fichier HTML
4. Soumettez le sitemap

### 2. Soumettre le site à Bing
1. Créez un compte Bing Webmaster Tools
2. Ajoutez votre site
3. Soumettez le sitemap

### 3. Créer un compte Google My Business
1. Ajoutez votre entreprise
2. Vérifiez votre adresse
3. Ajoutez des photos et des informations

---

## 🎯 Après le Déploiement

### Checklist Post-Déploiement

- [ ] Tester toutes les pages
- [ ] Vérifier les liens
- [ ] Tester le panier
- [ ] Configurer Google Analytics
- [ ] Soumettre le sitemap
- [ ] Créer les réseaux sociaux
- [ ] Ajouter de vraies images produits
- [ ] Configurer le paiement
- [ ] Tester sur mobile
- [ ] Vérifier les performances (PageSpeed Insights)

### Améliorations Futures

1. **Ajouter plus de produits** : Étendez le catalogue
2. **Blog** : Créez un blog pour le SEO
3. **Newsletter** : Configurez l'envoi régulier
4. **Réseaux sociaux** : Créez des comptes et partagez
5. **Publicités** : Facebook Ads, Google Ads (optionnel)

---

## 💰 Coûts Totaux

### Gratuit
- Hébergement : 0€
- Nom de domaine (subdomain) : 0€
- Email (jusqu'à 100/jour) : 0€
- Analytics : 0€
- SSL : 0€

### Optionnel (Faible Coût)
- Domaine personnalisé : ~10€/an
- Email supplémentaire : ~5€/mois
- Paiement Stripe : 1.4% + 0.25€ par transaction
- Publicité : Variable

**Coût minimum : 0€** 🎉
**Coût avec domaine : ~10€/an**

---

## 🆘 Support et Ressources

### Documentation
- GitHub Pages : https://docs.github.com/en/pages
- Netlify : https://docs.netlify.com
- Vercel : https://vercel.com/docs
- Stripe : https://stripe.com/docs

### Communautés
- Stack Overflow : https://stackoverflow.com
- Reddit : r/webdev, r/entrepreneur
- Discord : Serveurs webdev et e-commerce

---

**Félicitations ! Votre site de vente de grilles de points de croix est prêt à être déployé ! 🧵✨**