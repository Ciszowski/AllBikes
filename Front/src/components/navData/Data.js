import favoris from "../../gallerie/icone-favoris.png";
import home from '../../gallerie/blue-home.png';
import rouages from '../../gallerie/rouages.png';
import secret from '../../gallerie/top-secret.png';
import velo from '../../gallerie/velo.png';

export const NavData= {
    Course:{
        Endurance: "",
        'Tri/VLM':'',
        Piste:'',
        Performance:'',
    },
    Trekking:{
        Randonnee:'',
        Gravel:'',
        Voyage:'',
        Cyclocross:'',
    },
    VTT:{
        Descente:'',
        Loisirs:'',
        CrossCountry:'',
        BMX:''
    },
    Ville:{
        Urbain:'',
        Hollandais:'',
        VTC:'',
        Fixie:'',
    },
    VAE:{
        Course:'',
        Trekking:'',
        VTT:'',
        Ville:'',
    }
};
export const characteristic = {
    model : '',
    year : 0,
    price: 0,
    img: '',
    material: '',
    brand: '',
    tempSize : 0,
    description: ''
}

export const objCard = [
    { value: 'favoris', type: 'Mes favoris', image: favoris },
    { value: 'profil', type: 'Modifier profil', image: home },
    { value: 'password', type: 'Changer mot de passe', image: secret },
    { value: 'findOwnBike', type: 'Trouve ton vélo', image: velo},
    { value: 'admin', type: 'admin', image: rouages }
]

export const questionMark=[
    {Q:"Sur quel types de terrains souhaitez-vous pratiquer ?"},
    {Q:"Laquelles de ces pratiques vous correspond le mieux ?"},
    {Q:"Esprit sportif ou cherchez vous la commodité?"},
    {Q:"Quel est votre budget ?"}
]
export const questionPrice=[
    {title: "De 500€ à 2000€", value: [0,2000]},
    {title: 'De 2000€ à 5000€', value: [2000,5000]},
    {title: 'Supérieur à 5000€', value: [5000, 20000]}
]