import favoris from "../../gallerie/icone-favoris.png";
import home from '../../gallerie/blue-home.png';
import rouages from '../../gallerie/rouages.png';
import secret from '../../gallerie/top-secret.png';
import velo from '../../gallerie/velo.png';
import course from "../../gallerie/roadbikes.jpg";
import VTT from "../../gallerie/vttistes.jpg";
import trekking from "../../gallerie/trekking.jpg";
import ville from "../../gallerie/ville.jpg";
import profil from "../../gallerie/profil.png";

export const NavData = {
    Course: {
        Endurance: `Vous recherchez les vélos d'endurance, vélos léger rigide mais confortable.
             Sillonner les routes, défier les cols de légendes, se surpasser ou tout simplement voir du pays
             en gardant une allure qui serait soutenu est votre objectif.Voici un choix de vélos qui pourrait
             vous correspondre.`,
        'Tri/VLM': `Vous êtes un triathlète ou souhaitez en devenir un ? Rien de tel que d'avoir un
            bon engin pour tenir la route et réussir à passer à l'étape suivante de la course. Les 
            vélos de triathlons sont étudiés afin qu'ils soient le plus aerodynamique posssible mais
            aussi ergonomique`,
        Piste: `Vous aimez la force brute, le vélo tout en étant à l'abri des intempéries ? les vélos
               de piste sont fait pour vous! L'activité se situant dans un vélodrome, vous trouverez
               toujours quelqu'un avec qui vous pourrez frotter les roues tout en cherchant les plus 
               grosses vitesses.`,
        Performance: `Esprit compétitif, se surpasser afin de viser l'excellence tout en cherchant la
                vitesse et l'adrénaline de l'éffort? Les vélos de course les plus rigides et nerveux
                sont ceux qui vous plairont.Voici un choix de vélos qui pourrait vous correspondre.`,
    },
    Trekking: {
        Randonnee: `Envie de voyager tout en pédalant sans se soucier de comment transporter sa tente? 
                Les vélos de randonnée sont étudiés afin qu'ils soient robuste et resistant à toute 
                épreuve. Adapté au cyclotourisme, ce vélo vous accompagnera pour vos longs voyages 
                sans ce soucier de vos bagages grâce à ses fixations et son garde-boue.Voici un choix
                de vélos qui pourrait vous correspondre`,
        Gravel: `Vous souhaitez voyager léger, et aimez l'aventure et les sentiers battus? Découvrez
                 la polyvalence du vélo gravel qui vous emmènera en toute stabilité et sérénité sur
                les sentiers les plus sinueux.Voici un choix de vélos qui pourrait vous correspondre.`,
        Voyage: `Vous cherchez le vélo qui peut aller où tout les autres ne peuvent pas? Qu'importe
                l'endroit, dans les prés ou sur une couche épaisse de neige, le fat bike est le vélo
                qui bat à plate coutures tout les autres à ce niveau. Si vous vous en cherchez un,
                voici quelqu'uns qui ont été sélectionnner pour vous`,
        Cyclocross: `Les compétitions sur des circuits composés de chemins, praires, voire de sable est 
                ce que vous recherchez. Les vélos de cyclocross sont spécialement conçus pour être 
                robuste & rigide face aux obstacles rencontrés et chemins empruntés.Voici un choix de vélos
                qui pourrait vous correspondre.`,
    },
    VTT: {
        Descente: `Vous cherchez les sensations fortes & l'adrénaline. Vos principaux itinéraires impliquent-ils
                 de monter & descendre des sentiers qui ne figurent sur aucune carte ? Alors les VTT dit
                 de descente sont fait pour vous. Vous y apprendrez toute la technicité des sauts à travers
                 différents obstacles afin de posséder un sens aiguisé du pilotage. Voici un choix de vélos
                 qui pourrait vous correspondre.`,
        Loisirs: `Vous recherchez la randonnée sportive sur terrain accidenté, hors des routes groudronnées. Le vtt
                est un bon type de vélo pour diverses activités de loisirs individuelle ou collectives, et ainsi
                s'initier à la pratique du vététistes. Voici un éventail de choix qui pourrait vous correspondre.`,
        CrossCountry: `En quête de challenge ? Vous avez un esprit combatif ? Le cross-country est l'activité qui vous
                    conviendra parfaitement. Seule discipline cycliste jusqu'à présent retrouvé dans les jeux olympiques,
                    le but étant d'aller le plus rapidement possible passant par des ascensions dures et des descentes 
                    techniques tout en restant à l'écart des routes goudronnées. Voici un choix qui pourrait vous 
                    correspondre.`,
        BMX: `Vous vous sentez acrobatique ou souhaitez le devenir? Le BMX fait de se sport une activité très technique et 
            spéctaculaire demandant des qualités physiques telles que la vélocité, et l'endurance. A partir de 2020,
            il sera également une discipline olympique.Voici une sélection de vélos qui pourrait vous correspondre.`
    },
    Ville: {
        Urbain: `Vous souhaitez un vélo confortable pour arriver au travail, puis rentrer chez soi tout en
                évitant les bouchons, faire un plein d'économies et profiter pour s'exercer un peu ? Rien de tel qu'
                avoir un simple vélo de ville qui par ailleurs vous simplifiera beaucoup la vie pour de courts 
                déplacements. Voici un petit éventail de choix qui pourrait vous correspondre.`,
        Hollandais: `Vous aimez les vieux vélos traditionnel ? Voici une collection des vélos hollondais qui sont extrèmement
                    resistants grâce à leur géométrie et leurs modèles de conception unique qui supportent des charges 
                    élevées et qui sont durable dans le temps. Idéale pour transporter ses enfants, et faire de joli petite
                    balade en famille.`,
        VTC: `Envi de vous mettre au sport mais vous ne savez pas par quoi commencer?  ou alors vous souhaitez traverser la ville
            plus rapidement tout aussi confortablement ? Voici les vélos tout chemin randonnée, une selection de vélos qui 
            vous permettra d'associer le coté urbain et le coté sport avec des vélos à la fois légers et robustes.`,
        Fixie: `Passionné par le vélo de course, ou tout simplement aimez-vous la vitesse mais vous souhaitez rouler
                principalement en ville ? Pas la peine d'aller chercher plus loin, les vélos à pignon fixe sont construit
                avec l'ergonomie d'un vélo de course sauf qu'ils n'ont qu'une seule vitesse donc une maintenance moins couteuse.
                Voici quelques modèles dont leur légèreté et rigidité vous surprendra.`
    },
    VAE: {
        Course: `Aimez-vous les grands défis sur route mais certains vous semblent inaccessible ? Ces vélos de courses hybride,
                doté d'une assistance electrique, vont vous surprendre en vous permettant de franchir n'importe quel col,
                de vous ramener chez vous quand vous vous sentez fatiguer, voire jusqu'à trouver les sensations qu'éprouvent 
                les professionnels cyclistes en allant à leur vitesse de pointe dans les montée où même dans les longues lignes
                droites.`,
        Trekking: `Vous souhaitez voyager en vélo, aller sur les routes de campagnes et les chemins de terre, voir du pays
                    mais vous vous voulez rouler sans effort et de manière confortable ?  Ces vélos hybride doté d'une assistance
                    sont fait pour vous. Ils vous permettront de rester actif tout en vous divertissant à travers tout types de sentiers`,
        VTT: `Vous aimez partir à l'aventure là ou bon vous semble, souhaitez faire des ascensions hors des routes, et tout cela 
                avec confort et peu d'effort? C'est possible avec les vélos VTTAE, les vélos vtt doté d'une assistance éléctriques.
                Graĉe à leur puissant moteur, découvrez de nouvelles pistes, parcourez les vastes plaines sans effort ou même 
                 partez à l'ascension de pics inconnus. Voici une selection de vélos qui vous pourront vous plaire.`,
        Ville: `Vous souhaitez aller au travail sans effort tout en vous déplaçant en vélo ? Se balader, voire emprunter en toute
                tranquilité les voies vertes ou même en ville ? Cela est possible avec les vélos à assistance électrique de ville. 
                Doté d'un moteur, ce type de vélo vous emmenera là ou vous le souhaitez, arriver au travail à temps, rentrez
                chez soi tout en évitant la circulation.Voici une séléction de vélos qui pourront amplifier grandement votre envi
                de faire du vélo.`,
    },
    findModele: function (modele) {
        return Object.keys(this).filter((element) => {
            return this[element][modele]
        });
    }
};
export const characteristic = {
    model: '',
    year: 0,
    price: 0,
    img: '',
    material: '',
    brand: '',
    tempSize: 0,
    description: ''
}

export const objCard = [
    { value: 'favoris', type: 'Mes favoris', image: favoris },
    { value: 'profil', type: 'Modifier profil', image: home },
    { value: 'password', type: 'Changer mot de passe', image: secret },
    { value: 'findOwnBike', type: 'Trouvez votre vélo', image: velo },
    { value: 'admin', type: 'admin', image: rouages }
]

export const questionMark = [
    { Q: "Sur quel types de terrains souhaitez-vous pratiquer ?" },
    { Q: "Laquelles de ces pratiques vous correspond le mieux ?" },
    { Q: "Esprit sportif ou cherchez vous la commodité?" },
    { Q: "Quel est votre budget ?" }
]
export const questionPrice = [
    { title: "De 500€ à 2000€", value: [0, 2000] },
    { title: 'De 2000€ à 5000€', value: [2000, 5000] },
    { title: 'Supérieur à 5000€', value: [5000, 20000] }
];
export const HomeData = [
    { value: "Ville", description: "Partagez de bons moments sur des trajets quotidiens et simplifiez-vous des trajets longs ", image: ville },
    { value: "VTT", description: "Vivez d'adrénaline avec de nouvelles sensations fortes et dessinez vos propres routes parmis les vastes étendues.", image: VTT },
    { value: "Course", description: "Découvrez les plus grandes vitesses sur deux roues à la force de vos jambes, escalader les cols de légendes parcouru par tout les pros", image: course },
    { value: "Trekking", description: "Partez parcourir les grands chemins de ce monde, et vivez d'expérience que vous n'oublierai jamais.", image: trekking },
    { value: "mon-compte", description: "Pensez à vous inscrire gratuitement sur notre site pour vous rappelez de tout les bons vélos qui vous ont plûs et trouvez le vélo qui vous correspond.", image: profil }
];