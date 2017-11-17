// Si une carte à une valeur supérieur à 0, elle devient verte, sinon blanche, non utilisé. une carte verte est visible dans le résumé.
// L'image est aussi activé (colorisé plutôt que noir et blanc si 0 point)
// Si le total de point et supérieur au maximum toute les cartes deviennent orange/warning

var app = new Vue({
    el: '#app',
    data: {
        name:"",
        save:true,
        // Help
        help:"<b>Explication</b>: Le nombre de point maximun pour un Tier est de 100, à partir du Tier 2, \
        Il faut un minimum de 30 points au Tier précédent direct pour ajouter des points \
        jusqu'à 29, Il faut un minimum de 60 points à tous les tiers précédents pour ajouter des points au delà de 29.\
        <br> <b>Exemple</b>: (Tier1: 30, Tier2: 29) - (Tier1:60, Tier2:30, Tier:3:29) - (Tier1: 60, Tier2:60, Tier3:60, Tier4:100)\
        <br> <b>Méthode</b>: Vous pouvez définir la compétence que vous souhaitez monter, les point de dépendance minimum de tiers parents seront mise à jour automatiquement.",
        helpStats:"<b>Explication</b>: Le total des statistiques est limité à 150 et ne peut être inférieur à 10. Une seule statistique peut donc monter à 110 au maximum.",
        // Pages
        p:{
            crafting: {fr:"Artisanat", now:0, max:400, active:false},
            combat: {fr:"Combat", now:0, max:400, active:false},
            minor: {fr:"Compétences mineures", active:false},
            stats: {fr: "Statistiques", now:50, max:150, active:true},
            summary: {fr: "Résumé", active:false},
        },
        // Cards
        cards:{
            // CRAFTING CARD DATA
            crafting: { 
                artisan:{
                    tier:1, 
                    id:1,
                    path:[1],
                    fr:"Artisanat", 
                    img:"./assets/crafting/Artisan.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Artisanat",
                    info:"<h3 class='text-center'>Artisanat</h3>\
                    <p><b>Tout niveau</b>:	Vitesse de terrassement. Vitesse d'abattage des arbres.</p>\
                    <p><b>0</b>: Vous pouvez monter et abaisser le niveau du terrain. Vous pouvez arracher l'écorce et abattre des arbres. \
                    Vous pouvez créer des outils primitifs. Vous pouvez tailler des pierres de construction.</p>\
                    <p><b>30</b>: Vous pouvez aplanir le terrain. Vous pouvez déraciner les souches.</p>\
                    <p><b>60</b>: Vous pouvez abattre les arbres de bois dur deux fois plus vite.</p>\
                    <p><b>90</b>: Vous pouvez trouver des ingrédients rares dans les arbres (1%).</p>\
                    <p><b>100</b>: Légère augmentation des chances de trouver des ingrédients rares dans les arbres (1,5%).</p>",
                    now:0,
                    max:100,
                    tier2: {
                        carpentry: { 
                            tier:2,
                            id:8,
                            path:[1, 8],
                            fr: "Menuiserie",
                            img:"./assets/crafting/Carpentry.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Menuiserie",
                            info:"<h3 class='text-center'>Menuiserie</h3>\
                            </p><b>Tout niveau</b>: Qualité maximale des objets de menuiserie.</p>\
                            </p><b>0</b>: Vous pouvez tailler des rondins. Vous pouvez fabriquer des pièces en bois et des petits meubles.</p>\
                            </p><b>30</b>: Vous pouvez utiliser un établi.</p>\
                            </p><b>60</b>: Vous pouvez fabriquer des pièces en bois pour les armes.</p>\
                            </p><b>90</b>: Vous pouvez fabriquer de grands meubles.</p>\
                            </p><b>100</b>: Vous pouvez fabriquer des objets décoratifs.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                bowcraft: {
                                    tier:3,
                                    id:9,
                                    path:[1, 8, 9],
                                    fr: "Fabrication d'arc",
                                    img:"./assets/crafting/Bowcraft.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Fabrication_d%27arc",
                                    info:"<h3 class='text-center'>Fabrication d'arc</h3>\
                                    </p><b>Tout niveau</b>: Qualité maximale de production des arcs et arbalètes.</p>\
                                    </p><b>0</b>: Vous pouvez fabriquer des carreaux et des flèches ordinaires.</p>\
                                    </p><b>30</b>: Vous pouvez fabriquer des arcs et arbalètes ordinaires.</p>\
                                    </p><b>60</b>: Vous pouvez fabriquer des arcs, arbalètes et munitions avancées.</p>\
                                    </p><b>90</b>: Vous pouvez fabriquer des armes exceptionnelles (qualité augmentée de 20% et nom unique) (0,01% chance).</p>\
                                    </p><b>100</b>: Vous pouvez fabriquer des armes exceptionnelles (qualité augmentée de 20% et nom unique) (0,011% chance).</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        warfare: {
                                            tier:4,
                                            id:10,
                                            path:[1, 8, 9, 10],
                                            fr: "Ingénierie de siège",
                                            img:"./assets/crafting/Warfare.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Ing%C3%A9nierie_de_si%C3%A8ge",
                                            info:"<h3 class='text-center'>Ingénierie de siège</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximum des objets de guerre.</p>\
                                            </p><b>0</b>: Vous pouvez fabriquer des Petit kits de siège. Vous pouvez fabriquer des munitions au naphta.</p>\
                                            </p><b>30</b>: Vous pouvez fabriquer des kits de siège moyens.</p>\
                                            </p><b>60</b>: Vous pouvez fabriquer de grands kits de siège. Vous pouvez déployer les charges de sapeur.</p>\
                                            </p><b>90</b>: Vous pouvez fabriquer des explosifs.</p>\
                                            </p><b>100</b>: Bonus constant de 5% à la chance lors de l'utilisation de l’ingénierie de siège.</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                }
                            }
                        }, 
                        construction: {
                            tier:2,
                            id:18,
                            path:[1, 18],
                            fr: "Construction",
                            img:"./assets/crafting/Construction.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Construction",
                            info:"<h3 class='text-center'>Construction</h3>\
                            </p><b>Tout niveau</b>: Qualité et durabilité des objets construits.</p>\
                            </p><b>0</b>: Vous pouvez paver les routes.</p>\
                            </p><b>30</b>: Vous pouvez construire des objets simples en bois.</p>\
                            </p><b>60</b>: Vous pouvez construire des objets simples en pierre et des constructions avancées en bois.</p>\
                            </p><b>90</b>: Vous pouvez construire une variété d'objets complexes.</p>\
                            </p><b>100</b>: Vous pouvez placer des monuments pour limiter un domaine.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                masonry: {
                                    tier:3,
                                    id:19,
                                    path:[1, 18, 19],
                                    fr: "Maçonnerie",
                                    img:"./assets/crafting/Masonry.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Ma%C3%A7onnerie",
                                    info:"<h3 class='text-center'>Maçonnerie</h3>\
                                    </p><b>Tout niveau</b>: Qualité et durabilité des bâtiments érigés.</p>\
                                    </p><b>0</b>: Vous pouvez construire des clôtures en pierre et des objets de base de maçonnerie.</p>\
                                    </p><b>30</b>: Vous pouvez construire des fortifications en pierre.</p>\
                                    </p><b>60</b>: Vous pouvez construire un certain nombre de bâtiments en bois ou en pierre.</p>\
                                    </p><b>90</b>: Vous pouvez construire des objets avancés de maçonnerie.</p>\
                                    </p><b>100</b>: Vous pouvez ériger drapeaux et bannières.</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        architecture: {
                                            tier:4,
                                            id:20,
                                            path:[1, 18, 19, 20],
                                            fr: "Architecture",
                                            img:"./assets/crafting/Architecture.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Architecture",
                                            info:"<h3 class='text-center'>Architecture</h3>\
                                            </p><b>Tout niveau</b>: Qualité et la durabilité des bâtiments érigés.</p>\
                                            </p><b>0</b>: Vous pouvez construire des murs du château (10m). Vous pouvez agir comme contremaître pendant les travaux de constructions (crier sur les gens).</p>\
                                            </p><b>30</b>: Vous pouvez construire des tours et des murs de château avec hourd.</p>\
                                            </p><b>60</b>: Vous pouvez construire plus de fortifications de château et plusieurs bâtiments améliorés.</p>\
                                            </p><b>90</b>: Vous pouvez construire un donjon de château.</p>\
                                            </p><b>100</b>: Vous pouvez construire des fontaines.</p>",
                                            now:0,
                                            max:100
                                        },
                                        building: {
                                            tier:4,
                                            id:7,
                                            path:[1, 18, 19, 7],
                                            fr: "Maintenance des bâtiments",
                                            img:"./assets/crafting/Building.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Maintenance_des_b%C3%A2timents",
                                            info:"<h3 class='text-center'>Maintenance des bâtiments</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale des kits de réparation fabriqués et des actions de maintenance des bâtiments.</p>\
                                            </p><b>0</b>: Vous pouvez fabriquer des petits kits de réparation. Vous pouvez réparer des bâtiments.</p>\
                                            </p><b>30</b>: Vous pouvez fabriquer des kits moyens de réparation.</p>\
                                            </p><b>60</b>: 	Vous pouvez fabriquer de grands kits de réparation</p>\
                                            </p><b>90</b>: Augmente un peu la vitesse de réparation.</p>\
                                            </p><b>100</b>: Qualité maximale des kits de réparation fabriqués et des actions de maintenance des bâtiments.</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                }
                            }
                        }, 
                        digging: {
                            tier:2,
                            id: 16,
                            path:[1, 16],
                            fr: "Forage",
                            img:"./assets/crafting/Digging.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Forage",
                            info:"<h3 class='text-center'>Forage</h3>\
                            </p><b>Tout niveau</b>: Vitesse à laquelle vous creusez les tunnels.</p>\
                            </p><b>0</b>: Vous pouvez creuser des tunnels.</p>\
                            </p><b>30</b>: Vous pouvez creuser des tunnels dans diverses directions.</p>\
                            </p><b>60</b>: Vous pouvez renforcer les murs des tunnels avec des planches.</p>\
                            </p><b>90</b>: Permet de renforcer les ciels(plafond) des mines avec des poutres de soutien)</p>\
                            </p><b>100</b>:	Les poutres fabriquées durent plus longtemps.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                mining: {
                                    tier:3,
                                    id: 2,
                                    path:[1, 16, 2],
                                    fr: "Minage",
                                    img:"./assets/crafting/Mining.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Minage",
                                    info:"<h3 class='text-center'>Minage</h3>\
                                    </p><b>Tout niveau</b>: Vitesse d'extraction du minerai.</p>\
                                    </p><b>0</b>: Vous pouvez miner du minerai de cuivre et de fer. Vous pouvez prospecter le minerai de cuivre..</p>\
                                    </p><b>30</b>: Vous pouvez miner les métaux précieux (or et argent). Vous pouvez prospecter le minerai de fer.</p>\
                                    </p><b>60</b>: Chance de trouver des gemmes (0, 5% par action unique).</p>\
                                    </p><b>90</b>: Permet de trouver des ingrédients minéraux rares dans le minerai (chance de 1% par action unique).</p>\
                                    </p><b>100</b>: Chance légèrement augmentée de trouver des ingrédients rares dans le minerai (1,5% par action unique).</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        prospecting: {
                                            tier:4,
                                            id:31,
                                            path:[1, 16, 2, 31],
                                            fr: "Prospection des éléments précieux",
                                            img:"./assets/crafting/Prospecting.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Prospection_des_%C3%A9l%C3%A9ments_pr%C3%A9cieux",
                                            info:"<h3 class='text-center'>Prospection des éléments précieux</h3>\
                                            </p><b>Tout niveau</b>: Vitesse d'extraction du minerai. Vitesse et portée de prospection des minéraux.</p>\
                                            </p><b>0</b>: Vous pouvez sonder les murs de tunnel.</p>\
                                            </p><b>30</b>: Portée de prospection des minéraux légèrement augmenté.</p>\
                                            </p><b>60</b>: Vous pouvez prospecter du minerai d'argent. Distance de prospection étendue.</p>\
                                            </p><b>90</b>: Vous pouvez prospecter du minerai d'or. Distance de prospection étendue.</p>\
                                            </p><b>100</b>: Distance de prospection légèrement augmentée.</p>",
                                            now:0,
                                            max:100
                                        },
                                        jewelry: {
                                            tier:4,
                                            id:52,
                                            path:[1, 16, 2, 52],
                                            fr: "Bijouterie",
                                            img:"./assets/crafting/Jewelry.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Bijouterie",
                                            info:"<h3 class='text-center'>Bijouterie</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale des bijoux fabriqués. La qualité des bijoux affecte le bonus de chance reçu par le joueur qui le porte.</p>\
                                            </p><b>0</b>: Vous pouvez fabriquer des anneaux simples.</p>\
                                            </p><b>30</b>: Vous pouvez fabriquer des anneaux et des amulettes.</p>\
                                            </p><b>60</b>: Vous pouvez fabriquer des bijoux simples incrustés de pierres précieuses.</p>\
                                            </p><b>90</b>: Vous pouvez fabriquer des bijoux complexes avec plusieurs métaux et pierres précieuses. Vous pouvez fabriquer des bijoux exceptionnels (+20%% en qualité et nom unique) (0,01%% de chances).</p>\
                                            </p><b>100</b>: Vous pouvez fabriquer des bijoux exceptionnels (+20%% en qualité et nom unique) (0,011%% de chances).</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                }
                            }
                        }, 
                        materials: {
                            tier:2,
                            id: 17,
                            path:[1, 17],
                            fr: "Préparation de matériaux",
                            img:"./assets/crafting/Materials.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Pr%C3%A9paration_de_mat%C3%A9riaux",
                            info:"<h3 class='text-center'>Préparation de matériaux</h3>\
                            </p><b>Tout niveau</b>: Vitesse de production des matériaux de construction.</p>\
                            </p><b>0</b>: Vous pouvez concevoir des éléments basiques en argile.</p>\
                            </p><b>30</b>: Vous pouvez préparer du charbon à partir de billettes de bois dur.</p>\
                            </p><b>60</b>: Vous pouvez réaliser des objets en verre et utiliser le tour de potier.</p>\
                            </p><b>90</b>: Vous pouvez fabriquer des objets complexes en argile.</p>\
                            </p><b>100</b>: Vous pouvez créer des panneaux municipaux.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                smelting: {
                                    tier:3,
                                    id: 3,
                                    path:[1, 17, 3],
                                    fr: "Fonte",
                                    img:"./assets/crafting/Smelting.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Fonte",
                                    info:"<h3 class='text-center'>Fonte</h3>\
                                    </p><b>Tout niveau</b>: Qualité maximale du métal produit.</p>\
                                    </p><b>0</b>: Vous pouvez fondre le minerai de fer et de cuivre.</p>\
                                    </p><b>30</b>: Vous pouvez fondre les agglomérats de minerai précieux.</p>\
                                    </p><b>60</b>: Vous pouvez fondre l'acier.</p>\
                                    </p><b>90</b>: Vous pouvez recycler les outils, les armes et les armures en métal. Vous pouvez couler des barres et lingots de métaux précieux. Vous pouvez fondre l'acier Vostaskus.</p>\
                                    </p><b>100</b>: Moins de perte de matériaux durant le recyclage des armes métalliques.</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        forging: {
                                            tier:4,
                                            id:4,
                                            path:[1, 17, 3, 4],
                                            fr: "Forge",
                                            img:"./assets/crafting/Forging.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Forge",
                                            info:"<h3 class='text-center'>Forge</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale des armes produites.</p>\
                                            </p><b>0</b>: Vous pouvez fabriquer des objets ménagers.</p>\
                                            </p><b>30</b>: Vous pouvez fabriquer des armes en fer.</p>\
                                            </p><b>60</b>: Vous pouvez fabriquer des armes en acier.</p>\
                                            </p><b>90</b>: Vous pouvez fabriquer des armes exceptionnelles (qualité augmentée de 20%% et nom unique) (0,01%% chance) et forger des armes en acier Vostaskus.</p>\
                                            </p><b>100</b>: Vous pouvez fabriquer des armes exceptionnelles (qualité augmentée de 20%% et nom unique) (0,011%% chance).</p>",
                                            now:0,
                                            max:100
                                        },
                                        armorsmithing: {
                                            tier:4,
                                            id:5,
                                            path:[1, 17, 3, 5],
                                            fr: "Forge d'armure",
                                            img:"./assets/crafting/Armorsmithing.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Forge_d%27armure",
                                            info:"<h3 class='text-center'>Forge d'armure</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale des armures produites.</p>\
                                            </p><b>0</b>: Vous pouvez fabriquer une armure ordinaire.</p>\
                                            </p><b>30</b>: Vous pouvez fabriquer des armures pour chevaux.</p>\
                                            </p><b>60</b>: Vous pouvez fabriquer des armures avancées.</p>\
                                            </p><b>90</b>: 	Permet de fabriquer des armures exceptionnelles (qualité augmentée de 20%% et un nom unique) (0, 01%% chance).</p>\
                                            </p><b>100</b>: Vous pouvez fabriquer des armures royales.</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }, 
                nature:{
                    tier:1,
                    id:11,
                    path:[11],
                    fr:"Connaissance de la nature", 
                    img:"./assets/crafting/Nature.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Connaissance_de_la_nature",
                    info:"<h3 class='text-center'>Connaissance de la nature</h3>\
                    </p><b>Tout niveau</b>: Vitesse de recherche et qualité maximale des racines comestibles et des fibres utiles. Qualité maximale des herbes récoltées.</p>\
                    </p><b>0</b>: Vous pouvez localiser et de recueillir des herbes comestibles et des fibres utiles sur une parcelle occupée.\
                    <br>Vous pouvez localiser et recueillir des baies et des champignons (pour manger et cuisiner). \
                    Vous pouvez récolter des herbes ordinaires avec une perte de qualité. Vous pouvez inspecter les arbres et arracher des branches.</p>\
                    </p><b>30</b>: Vous pouvez localiser des herbes communes sur la parcelle actuelle et trouver des ingrédients sur des carcasses d'animaux.\
                    <br>Vous pouvez récolter des herbes communes (la qualité allant jusqu'à 30).</p>\
                    </p><b>60</b>: 	Vous pouvez localiser des herbes fraîches sur la parcelle actuelle et les herbes communes dans un rayon de deux parcelles.\
                    <br>Vous pouvez récolter des herbes fraiches (la qualité allant jusqu'à 60).</p>\
                    </p><b>90</b>: Vous pouvez localiser des herbes vierges sur la parcelle actuelle, des herbes fraiches sur un rayon de deux parcelles et des herbes communes sur un rayon de quatre parcelles.\
                    <br>Vous pouvez récolter des herbes vierges (la qualité allant jusqu'à 100).</p>\
                    </p><b>100</b>: Vous pouvez localiser des herbes vierges et des herbes fraîches sur un rayon de deux parcelles et des herbes communes sur un rayon de cinq parcelles.\
                    <br>Bonus permanent de 5 à la chance lors de la cueillette.</p>",
                    now:0,
                    max:100,
                    tier2: {
                        herbalism: { 
                            tier:2,
                            id:12,
                            path:[11, 12],
                            fr: "Herboristerie",
                            img:"./assets/crafting/Herbalism.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Herboristerie",
                            info:"<h3 class='text-center'>Herboristerie</h3>\
                            </p><b>Tout niveau</b>: Qualité maximale des préparation produites.</p>\
                            </p><b>0</b>: Vous pouvez faire des préparations à simple effet (maximum 2 ingrédients)</p>\
                            </p><b>30</b>: Vous pouvez faire des préparations à simple effet (maximum de 3 ingrédients)</p>\
                            </p><b>60</b>: Vous pouvez créer du naphta, des épices et du flux. <br>Vous pouvez planter et récolter des herbes depuis les jardins d'herboristes.</p>\
                            </p><b>90</b>: Vous pouvez faire des préparations à double effet (maximum de 3 ingrédients)</p>\
                            </p><b>100</b>: Bonus permanent de +5 de chance durant la préparation</p>",
                            now:0,
                            max:100,
                            tier3:{
                                healing: {
                                    tier:3,
                                    id:14,
                                    path:[11, 12, 14],
                                    fr: "Soins",
                                    img:"./assets/crafting/Healing.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Soins",
                                    info:"<h3 class='text-center'>Soins</h3>\
                                    </p><b>Tout niveau</b>: % maximale de PV qui peuvent être guéri</p>\
                                    </p><b>0</b>: Vous pouvez aider à reprendre conscience plus rapidement. Vous pouvez soigner.</p>\
                                    </p><b>30</b>: Vous pouvez soigner les blessures aux bras et aux jambes.</p>\
                                    </p><b>60</b>: Vous pouvez soigner les fractures aux bras et aux jambes.</p>\
                                    </p><b>90</b>: Vous pouvez effectuer des interventions chirurgicales et guérir les blessures et fractures n'importe où sur le corps.</p>\
                                    </p><b>100</b>: Bonus permanent de + 5 en chance pendant la guérison.</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        alchemy: {
                                            tier:4,
                                            id:15,
                                            path:[11, 12, 14, 15],
                                            fr: "Alchimie",
                                            img:"./assets/crafting/Alchemy.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Alchimie",
                                            info:"<h3 class='text-center'>Alchimie</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale des cocktails produits.</p>\
                                            </p><b>0</b>: Vous pouvez préparer des cocktails à double effet à partir de trois ingrédients.</p>\
                                            </p><b>30</b>: Vous pouvez préparer des cocktails à double effet (1 catalyseur).</p>\
                                            </p><b>60</b>: Vous pouvez préparer des cocktails à double effet (1 catalyseur), ainsi que du naphta explosif (qualité > à 60), du flux et des épices.</p>\
                                            </p><b>90</b>: Vous pouvez préparer toutes sortes de cocktails avec toutes sortes d'ingrédients et catalyseurs.</p>\
                                            </p><b>100</b>: Vous pouvez essayer de transmuter le fer en or (1 morceau par jour; chances de succès : 1%%).</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                },
                                forestry: {
                                    tier:3,
                                    id:6,
                                    path:[11, 12, 6],
                                    fr: "Foresterie",
                                    img:"./assets/crafting/Forestry.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Foresterie",
                                    info:"<h3 class='text-center'>Foresterie</h3>\
                                    </p><b>Tout niveau</b>: Qualité maximale des pousses cueillies et des arbres plantés.</p>\
                                    </p><b>0</b>: Vous pouvez récolter des pousses d'arbre.</p>\
                                    </p><b>30</b>: Vous pouvez planter des arbres au bois tendre (Pins et sapins).</p>\
                                    </p><b>60</b>: 	Vous pouvez planter les arbres à bois dur de petites tailles (bouleaux et peupliers).</p>\
                                    </p><b>90</b>: Vous pouvez planter les arbres à bois dur (ormes, érables et chênes).</p>\
                                    </p><b>100</b>: Bonus permanent de 5 en chance lors de l'utilisation des capacités de foresterie.</p>",
                                    now:0,
                                    max:100
                                }
                            }
                        }, 
                        farming: {
                            tier:2,
                            id:21,
                            path:[11, 21],
                            fr: "Agriculture",
                            img:"./assets/crafting/Farming.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Agriculture",
                            info:"<h3 class='text-center'>Agriculture</h3>\
                            </p><b>Tout niveau</b>: Vitesse des travaux agricoles.</p>\
                            </p><b>0</b>: Vous pouvez labourer la terre et trouver des graines simples.</p>\
                            </p><b>30</b>: Vous pouvez semer blé, pois, oignons, carottes et lin. Vous pouvez récolter tout type de plantes.</p>\
                            </p><b>60</b>: Vous pouvez semer choux, raisins et pommes de terre. Vous pouvez planter pommiers et mûriers.</p>\
                            </p><b>90</b>: Vous pouvez fertiliser les sols.</p>\
                            </p><b>100</b>: Bonus permanent +5 de chance durant le travail de ferme.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                advfarming: {
                                    tier:3,
                                    id:32,
                                    path:[11, 21, 32],
                                    fr: "Agriculture avancée",
                                    img:"./assets/crafting/Advfarming.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Agriculture_avanc%C3%A9e",
                                    info:"<h3 class='text-center'>Agriculture avancée</h3>\
                                    </p><b>Tout niveau</b>: Qualité maximale des objets crées.</p>\
                                    </p><b>0</b>: Vous pouvez produire de la farine.</p>\
                                    </p><b>30</b>: Vous pouvez extraire du miel.</p>\
                                    </p><b>60</b>: Vous pouvez utiliser une charrue.</p>\
                                    </p><b>90</b>: Vous pouvez extraire de la soie. Vous pouvez utiliser la meule.</p>\
                                    </p><b>100</b>: Qualité maximale des objets crées.</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        cooking: {
                                            tier:4,
                                            id:24,
                                            path:[11, 21, 32, 24],
                                            fr: "Cuisine",
                                            img:"./assets/crafting/Cooking.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Cuisine",
                                            info:"<h3 class='text-center'>Cuisine</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale de la nourriture et des breuvages produits.</p>\
                                            </p><b>0</b>: Vous pouvez préparer des recettes simples (1-2 ingrédients)</p>\
                                            </p><b>30</b>: Vous pouvez préparer des recettes complexes (3 ingrédients).</p>\
                                            </p><b>60</b>: Vous pouvez préparer des recettes expertes (4 ingrédient), et produire du vin.</p>\
                                            </p><b>90</b>: Vous pouvez préparer des recettes délicieuses (5 Ingrédients).</p>\
                                            </p><b>100</b>: Bonus de +5 en chance pour assaisonner des aliments.</p>",
                                            now:0,
                                            max:100
                                        },
                                        brewing: {
                                            tier:4,
                                            id:13,
                                            path:[11, 21, 32, 13],
                                            fr: "Brassage",
                                            img:"./assets/crafting/Brewing.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Brassage",
                                            info:"<h3 class='text-center'>Brassage</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale de l'alcool produit.</p>\
                                            </p><b>0</b>: Vous pouvez brasser du cidre.</p>\
                                            </p><b>30</b>: Vous pouvez brasser du vin.</p>\
                                            </p><b>60</b>: Vous pouvez brasser de l'hydromel.</p>\
                                            </p><b>90</b>: Vous pouvez brasser de la bière.</p>\
                                            </p><b>100</b>: Permet de produire des alcools exceptionnels (+20% qualité et un nom unique)(0,01% chance).</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                }
                            }
                        }                    
                    }
                },
                hunting:{
                    tier:1,
                    id: 51,
                    path:[51],
                    fr:"Chasse", 
                    img:"./assets/crafting/Hunting.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Chasse",
                    info:"<h3 class='text-center'>Connaissance des animaux</h3>\
                    </p><b>Tout niveau</b>: Qualité maximale des ingrédients d'origine animale obtenus.</p>\
                    </p><b>0</b>: Vous pouvez pêcher, récupérer la peau sur les carcasses d'animaux, placer des pièges et traquer les petits animaux.</p>\
                    </p><b>30</b>: Vous pouvez utiliser des pièges pour animaux.</p>\
                    </p><b>60</b>: Vous pouvez traquer les grands animaux.</p>\
                    </p><b>90</b>: Vous pouvez trouver des ingrédients alchimiques dans les carcasses d'animaux.</p>\
                    </p><b>100</b>: Bonus permanent de +5 chance pour la pêche.</p>",
                    now:0,
                    max:100,
                    tier2: {
                        animal: {
                            tier:2,
                            id:22,
                            path:[51, 22],
                            fr: "Connaissance des animaux",
                            img:"./assets/crafting/Animal.png",
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Connaissance_des_animaux",
                            info:"<h3 class='text-center'>Connaissance des animaux</h3>\
                            </p><b>Tout niveau</b>:	Qualité maximale des animaux apprivoisés ou élevés.</p>\
                            </p><b>0</b>: Vous pouvez élever des petits animaux à l'intérieur des poulaillers, vous pouvez nettoyer les poulaillers/granges/écuries.</p>\
                            </p><b>30</b>: Vous pouvez élever des animaux dans des granges.</p>\
                            </p><b>60</b>: Vous pouvez dompter les plus gros animaux apprivoisables et les faire se reproduire dans des petites écuries.</p>\
                            </p><b>90</b>: Vous pouvez élever des animaux dans des grandes écuries.</p>\
                            </p><b>100</b>: Bonus permanent de + 5 en chance pendant un apprivoisement.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                procuration: {
                                    tier:3,
                                    id: 23,
                                    path:[51, 22, 23],
                                    fr: "Élevage",
                                    img:"./assets/crafting/Procuration.png",
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/%C3%89levage",
                                    info:"<h3 class='text-center'>Élevage</h3>\
                                    </p><b>Tout niveau</b>: Qualité maximale des objets produits.</p>\
                                    </p><b>0</b>: Vous pouvez tuer des animaux de poulailler, de grange et d'étable. Vous pouvez fabriquer la colle d'os. Vous pouvez extraire des Fibres de lin.</p>\
                                    </p><b>30</b>: Vous pouvez sécher des peaux. Vous pouvez tisser des cordes, écheveaux et étoffes de lin.</p>\
                                    </p><b>60</b>: Vous pouvez tanner du cuir. Vous pouvez tisser des écheveaux et étoffes de laine.</p>\
                                    </p><b>90</b>: 	Vous pouvez produire de la soie.</p>\
                                    </p><b>100</b>: Bonus permanent de + 5 en chance lors de l'utilisation de capacités d'élevage.</p>",
                                    now:0,
                                    max:100,
                                    tier4:{
                                        warhorse: {
                                            tier:4,
                                            id:26,
                                            path:[51, 22, 23, 26],
                                            fr: "Dressage de chevaux de guerre",
                                            img:"./assets/crafting/Warhorse.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Dressage_de_chevaux_de_guerre",
                                            info:"<h3 class='text-center'>Dressage de chevaux de guerre</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale des chevaux de guerre entraînés (la qualité d'un cheval de guerre influe sur ses points de vie et sur sa vitesse de déplacement et de rotation).</p>\
                                            </p><b>0</b>: Vous pouvez dresser un cheval de bataille (sauf variétés lourdes et robustes).</p>\
                                            </p><b>30</b>: Chance de dresser un cheval de guerre robuste.</p>\
                                            </p><b>60</b>: Chance de dresser un cheval de guerre lourd.</p>\
                                            </p><b>90</b>: Chance de dresser un cheval de guerre fougueux.</p>\
                                            </p><b>100</b>: Chance de dresser un cheval de guerre royal.</p>",
                                            now:0,
                                            max:100
                                        },
                                        tailoring: {
                                            tier:4,
                                            id:25,
                                            path:[51, 22, 23, 25],
                                            fr: "Couture",
                                            img:"./assets/crafting/Tailoring.png",
                                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Couture",
                                            info:"<h3 class='text-center'>Couture</h3>\
                                            </p><b>Tout niveau</b>: Qualité maximale de tenues fabriquées.</p>\
                                            </p><b>0</b>: Vous pouvez fabriquer des objets simples en tissu ou en cuir (bottes, casques, gants).</p>\
                                            </p><b>30</b>: Vous pouvez fabriquer des armures en cuir ou matelassées simples.</p>\
                                            </p><b>60</b>: Vous pouvez fabriquer des armures en cuir avancées. Vous pouvez tisser et tailler des vêtements en soie qui offrent des bonus dans plusieurs compétences.</p>\
                                            </p><b>90</b>: Vous pouvez fabriquer des armures et des vêtements exceptionnels (qualité +20%% et nom unique) (0,01%% chance).</p>\
                                            </p><b>100</b>: Vous pouvez fabriquer des armures royales et des robes décorées.</p>",
                                            now:0,
                                            max:100
                                        }
                                    }
                                }
                            }
                        }  
                    }
                }
            },
            // COMBAT CARD DATA
            combat: {
                cavalry:{ 
                    tier:1,
                    id:28,
                    path: [28],
                    fr:"Cavalier", 
                    img:"./assets/combat/Cavalry.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Cavalier",
                    info:"<h3 class='text-center'>Cavalier</h3>\
                    <p><b>0</b>: Vous pouvez utiliser les épées à une main et demie. Vous pouvez utiliser les armes à une main à dos de cheval. \
                    Vous pouvez créer des outils primitifs. Vous pouvez tailler des pierres de construction.</p>\
                    <p><b>30</b>: Vous pouvez équiper des armures en cotte de mailles pour novice.</p>\
                    <p><b>60</b>: Vous pouvez monter des chevaux de guerre simples.</p>\
                    <p><b>90</b>: Chance réduite de tomber de selle en combat.</p>\
                    <p><b>100</b>: Tour de force.</p>",
                    now:0,
                    max:100,
                    tier2:{
                        knight:{ 
                            tier:2,
                            id:29,
                            path: [28, 29],
                            fr:"Chevalier", 
                            img:"./assets/combat/Knight.png", 
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Chevalier",
                            info:"<h3 class='text-center'>Chevalier</h3>\
                            <p><b>0</b>: Vous pouvez utiliser une épée de chevalier.</p>\
                            <p><b>30</b>: Vous pouvez équiper des armures en cotte de mailles ordinaires.</p>\
                            <p><b>60</b>: Vous pouvez monter des chevaux de guerre fougueux et robustes. Donne une chance aux piques ennemies de glisser sans blesser le cheval ou le cavalier.</p>\
                            <p><b>90</b>: Poigne de fer - Personne n'est capable de vous faire tomber de selle pour une courte durée.</p>\
                            <p><b>100</b>: Tour de force.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                lancer:{ 
                                    tier:3,
                                    id:30,
                                    path: [28, 29, 30],
                                    fr:"Lancier", 
                                    img:"./assets/combat/Lancer.png", 
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Lancier",
                                    info:"<h3 class='text-center'>Lancier</h3>\
                                    <p><b>0</b>: Vous pouvez utiliser des lances à dos de cheval</p>\
                                    <p><b>30</b>: Vous pouvez équiper des armures en cotte de mailles lourdes. Il est plus aisé de viser avec une lance.</p>\
                                    <p><b>60</b>: Vous pouvez monter des chevaux de guerre lourds. Vous pouvez garder la lance baissée plus longtemps.</p>\
                                    <p><b>90</b>: Vous pouvez équiper des armures en cotte de mailles royales.\
                                    <br>Irrésistible - un cheval lourd lancé au galop pendant plus de cinq secondes devient insensible à tout sauf aux murs de piques ou aux clôtures défensives et obtiennent la capacité de renverser les joueurs sans perdre de vitesse. L'effet cesse lorsque le galop est interrompu.</p>\
                                    <p><b>100</b>: La terre gronde autour d'un cheval de guerre lourd au galop. Vous pouvez chevaucher des chevaux de guerre royaux.</p>",
                                    now:0,
                                    max:100
                                }
                            }
                        }
                    }        
                },
                militia:{ 
                    tier:1,
                    id:33,
                    path: [33],
                    fr:"Milice", 
                    img:"./assets/combat/Cavalry.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Milice",
                    info:"<h3 class='text-center'>Milice</h3>\
                    <p><b>0</b>: Vous pouvez attaquer à mains nues et parer les attaques d'armes d'hasts.\
                    Vous pouvez utiliser les armes de milice (fourches, cannes, pioches, pelles et autres outils manuels). \
                    Vous pouvez utiliser la capacité Fuyez ! (la vitesse augmente pendant une courte période, mais les armes deviennent inutilisables pendant la durée). Dégaine depuis l'emplacement ceinture gauche. Dégaine depuis l'emplacement ceinture droit. Dégaine depuis l'emplacement dos gauche. Dégaine depuis l'emplacement dos droit. Demandez grâce à votre adversaire. Fuyez !. Vous pouvez accorder une mort élégante à vos ennemis. </p>\
                    <p><b>30</b>: Vous pouvez équiper les armures matelassées de novice.</p>\
                    <p><b>60</b>: Chance d’assommer si une attaque à mains nues frappe la tête.</p>\
                    <p><b>90</b>: Désarmement : chance d'attraper l'arme d'hast de votre adversaire après une parade à mains nues réussie.</p>\
                    <p><b>100</b>: Tour de force.</p>",
                    now:0,
                    max:100,
                    tier2:{
                        spearman:{ 
                            tier:2,
                            id:34,
                            path: [33, 34],
                            fr:"Piquier", 
                            img:"./assets/combat/Spearman.png", 
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Piquier",
                            info:"<h3 class='text-center'>Piquier</h3>\
                            <p><b>0</b>: Vous pouvez utiliser piques et lances.</p>\
                            <p><b>30</b>: Vous pouvez équiper des armures matelassées ordinaires.</p>\
                            <p><b>60</b>: Vous pouvez effectuer le « Mur de piques » - une attaque d'estoc qui vous rend immobile, inflige beaucoup de dégâts aux chevaux et les arrête toujours.</p>\
                            <p><b>90</b>: Les attaques d'estoc avec les lances ne peuvent être parées.</p>\
                            <p><b>100</b>: Tour de force.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                guard:{ 
                                    tier:3,
                                    id:35,
                                    path: [33, 34, 35],
                                    fr:"Garde", 
                                    img:"./assets/combat/Guard.png", 
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Garde",
                                    info:"<h3 class='text-center'>Garde</h3>\
                                    <p><b>0</b>: Vous pouvez utiliser les armes d'hast.</p>\
                                    <p><b>30</b>: Vous pouvez équiper les armures matelassées lourdes.</p>\
                                    <p><b>60</b>: Peut réaliser une attaque spéciale après une parade réussie\
                                    Peut réaliser une attaque spéciale après avoir frappé un cheval.</p>\
                                    <p><b>90</b>: Vous pouvez équiper les armures matelassées royales. Les attaques en brisé ont une plus grande chance de désarçonner un cavalier.</p>\
                                    <p><b>100</b>: Tour de force.</p>",
                                    now:0,
                                    max:100
                                }
                            }
                        }
                    }        
                },
                footman:{ 
                    tier:1,
                    id:36,
                    path: [36],
                    fr:"Fantassin", 
                    img:"./assets/combat/Footman.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Fantassin",
                    info:"<h3 class='text-center'>Fantassin</h3>\
                    <p><b>0</b>: Vous pouvez utiliser les haches à une main et boucliers primitifs.</p>\
                    <p><b>30</b>: Vous pouvez équiper les armures d'écailles de novice. Vous pouvez utiliser les boucliers de duel.</p>\
                    <p><b>60</b>: Vous pouvez utiliser les targes. Casse-Crâne ! : Dextre - Senestre - Brisé (ou Senestre - Dextre - Brisé). Cet enchaînement donne l'effet Coup puissant.</p>\
                    <p><b>90</b>: Toc-Toc ! : Brisé — Brisé — Brisé. Cet enchaînement donne l'effet Coup puissant.</p>\
                    <p><b>100</b>: Tour de force.</p>",
                    now:0,
                    max:100,
                    tier2:{
                        swordman:{ 
                            tier:2,
                            id:38,
                            path: [36, 38],
                            fr:"Épéiste", 
                            img:"./assets/combat/Swordman.png", 
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Épéiste",
                            info:"<h3 class='text-center'>Épéiste</h3>\
                            <p><b>0</b>: Vous pouvez utiliser les épées à une main.</p>\
                            <p><b>30</b>: Vous pouvez équiper les armures d'écailles ordinaires. Vous pouvez utiliser les boucliers de chevalier.</p>\
                            <p><b>60</b>: Vous pouvez utiliser le grand écu. Vous pouvez donner un coup de bouclier. Mille entailles ! : Dextre - Senestre - Dextre (ou Senestre - Dextre - Senestre). Cet enchaînement a une chance d'infliger un saignement à votre adversaire.</p>\
                            <p><b>90</b>: Vous pouvez courir en bloquant. Avalanche de coups ! : Dextre - Senestre - Estoc (ou Senestre - Dextre - Estoc). Cet enchaînement donne l'effet Coup puissant.</p>\
                            <p><b>100</b>: Tour de force.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                huscarl:{ 
                                    tier:3,
                                    id:40,
                                    path: [36, 38, 40],
                                    fr:"Huscarl", 
                                    img:"./assets/combat/Huscarl.png", 
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Huscarl",
                                    info:"<h3 class='text-center'>Huscarl</h3>\
                                    <p><b>0</b>: Vous pouvez utiliser les masses et armes perçantes à une main.</p>\
                                    <p><b>30</b>: Vous pouvez équiper les armures d'écailles lourdes. Vous pouvez utiliser les targes lourdes.</p>\
                                    <p><b>60</b>: Vous pouvez utiliser les scutums. Point de vulnérabilité ! : Brisé - Dextre - Senestre (ou Brisé - Senestre - Dextre). Cet enchaînement donne l'effet Coup puissant.</p>\
                                    <p><b>90</b>: Vous pouvez équiper les armures d'écailles royales. Un autre trou ! : Brisé - Brisé - Brisé. Cet enchaînement donne l'effet Coup puissant.</p>\
                                    <p><b>100</b>: Tour de force.</p>",
                                    now:0,
                                    max:100
                                }
                            }
                        }
                    }        
                },
                slinger:{ 
                    tier:1,
                    id:47,
                    path: [47],
                    fr:"Frondeur", 
                    img:"./assets/combat/Slinger.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Frondeur",
                    info:"<h3 class='text-center'>Frondeur</h3>\
                    <p><b>0</b>: Vous pouvez utiliser les frondes.</p>\
                    <p><b>30</b>: Vous pouvez équiper les armures en cuir de novice. Vous pouvez utiliser des couteaux de lancer.</p>\
                    <p><b>60</b>: Vous pouvez utiliser des haches de lancer et des javelots.</p>\
                    <p><b>90</b>: Vous pouvez lancer des pots de naphta.</p>\
                    <p><b>100</b>: 	Vous pouvez lancer des pots d'artificier.</p>",
                    now:0,
                    max:100,
                    tier2:{
                        archer:{ 
                            tier:2,
                            id:48,
                            path: [47, 48],
                            fr:"Archer", 
                            img:"./assets/combat/Archer.png", 
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Archer",
                            info:"<h3 class='text-center'>Archer</h3>\
                            <p><b>0</b>: Vous pouvez utiliser des arcs simples et arbalètes légères.</p>\
                            <p><b>30</b>: Rechargement plus rapide, meilleure visée. Vous pouvez équiper les armures en cuir ordinaires.</p>\
                            <p><b>60</b>: Vous pouvez utiliser les arcs courts et composites. Vous pouvez placer des réserves de flèche : réduit le temps de rechargement d'un personnage se tenant à proximité. Puissance d’arrêt : le prochain tir d'arbalète étourdira l'ennemi pendant une seconde.</p>\
                            <p><b>90</b>: Flèche dans le genou ! : la prochaine flèche ralentira l'ennemi de 10%. Si la flèche touche la jambe, l'ennemi sera ralenti de 50%.</p>\
                            <p><b>100</b>: Vous pouvez utiliser les flèches d'artificier.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                ranger:{ 
                                    tier:3,
                                    id:49,
                                    path: [47, 48, 49],
                                    fr:"Veilleur", 
                                    img:"./assets/combat/Ranger.png", 
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Veilleur",
                                    info:"<h3 class='text-center'>Veilleur</h3>\
                                    <p><b>0</b>: Vous pouvez utiliser l’arbalète.</p>\
                                    <p><b>30</b>: Rechargement plus rapide, meilleure visée. Vous pouvez équiper les armures de cuir lourdes. Vous pouvez utiliser un pavois comme couverture, puis le ranger dans l'inventaire.</p>\
                                    <p><b>60</b>: Vous pouvez utiliser l'arc long et l’arbalète lourde. Vous pouvez déployer une clôture défensive : si les chevaux foncent dedans, ils subissent des dégâts ou peuvent mourir. Carreaux perforant : le prochain coup d'arbalète peut toucher jusqu'à trois ennemis s'ils se tiennent les uns derrières les autres</p>\
                                    <p><b>90</b>: Vous pouvez équiper les armures en cuir royales. Volée : tire jusqu'à 10 flèches successivement sur une zone ciblée.</p>\
                                    <p><b>100</b>: Vous pouvez utiliser les carreaux d'artificier.</p>",
                                    now:0,
                                    max:100
                                }
                            }
                        }
                    }        
                },
                assaulter:{ 
                    tier:1,
                    id:43,
                    path: [43],
                    fr:"Assaut", 
                    img:"./assets/combat/Assaulter.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Assaut",
                    info:"<h3 class='text-center'>Assaut</h3>\
                    <p><b>0</b>: Vous pouvez utiliser les épées à deux mains.</p>\
                    <p><b>30</b>: Vous pouvez équiper des armures de plaques de novice.</p>\
                    <p><b>60</b>: Puissance écrasante ! : Dextre - Senestre - Estoc (ou Senestre - Dextre - Estoc). Cet enchaînement donne l'effet Coup puissant.</p>\
                    <p><b>90</b>: Démembrement ! : Senestre - Dextre - Senestre (ou Dextre - Senestre - Dextre). Cet enchaînement donne l'effet Coup puissant.</p>\
                    <p><b>100</b>: Tour de force.</p>",
                    now:0,
                    max:100,
                    tier2:{
                        vanguard:{ 
                            tier:2,
                            id:44,
                            path: [43, 44],
                            fr:"Éclaireur", 
                            img:"./assets/combat/Vanguard.png", 
                            wiki:"https://lifeisfeudal-fr.gamepedia.com/Éclaireur",
                            info:"<h3 class='text-center'>Éclaireur</h3>\
                            <p><b>0</b>: Vous pouvez utiliser haches et masses à deux mains.</p>\
                            <p><b>30</b>: Vous pouvez équiper des armures de plaques ordinaires.</p>\
                            <p><b>60</b>: Vous pouvez faire un bond. Exécution ! : Senestre - Dextre - Brisé (ou Dextre - Senestre - Brisé). Cet enchaînement a une chance d'infliger une blessure à votre adversaire. Si la frappe est bloquée par un bouclier, ce dernier recevra de gros dégâts. Craquant ! : Dextre - Senestre - Estoc (ou Senestre - Dextre - Estoc). Cet enchaînement a une chance d'infliger une fracture.</p>\
                            <p><b>90</b>: À genoux ! : Dextre - Senestre - Brisé (ou Senestre - Dextre - Brisé). Cet enchaînement a une chance de faire chuter l'adversaire.</p>\
                            <p><b>100</b>: Tour de force.</p>",
                            now:0,
                            max:100,
                            tier3:{
                                berserker:{ 
                                    tier:3,
                                    id:45,
                                    path: [43, 44, 45],
                                    fr:"Berserker", 
                                    img:"./assets/combat/Berserker.png", 
                                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Berserker",
                                    info:"<h3 class='text-center'>Berserker</h3>\
                                    <p><b>Tout niveau</b>: </p>\
                                    <p><b>0</b>: Provocation (Orale) — Quelques mots bien choisis sur la mère de votre ennemi (augmentation de la Force).</p>\
                                    <p><b>30</b>: Vous pouvez équiper des armures de plaques complètes. Lâche ! : la vitesse de l'ennemi ciblé augmente fortement, mais il risque également de trébucher et de tomber. Mains tremblantes (Précision des armes à distance réduite).</p>\
                                    <p><b>60</b>: Arghhhhhh ! — Tentative de retirer tous les effets de lenteur et de poison sur soi-même.</p>\
                                    <p><b>90</b>: Vous pouvez équiper des armures de plaques complètes royales. Tu es à moi ! : l'ennemi ciblé devient plus vulnérable et votre vitesse augmente légèrement.</p>\
                                    <p><b>100</b>: Véritable Provocation avec animation.</p>",
                                    now:0,
                                    max:100
                                }
                            }
                        }
                    }        
                },
            },
            secondCombat: {
                formation:{
                    tier:1,
                    id:56,
                    path:[56],
                    fr:"Unité et formations", 
                    img:"./assets/combat/Formation.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Unit%C3%A9_et_formations",
                    info:"<h3 class='text-center'>Unité et formations</h3>\
                    <p><b>Tout niveau</b>: % maximum de bonus d'unité qui peut être reçu et fourni.</p>\
                    <p><b>0</b>: Vous pouvez recevoir des bonus de l'unité du leader si vous êtes dans la formation créée par le chef de cette unité. Vous pouvez donner des commandes vocales pour changer la formation (Mur/Pointe/Cercle) et créer des zones de formation. \
                    <br>Vous pouvez recevoir des bonus de l'unité du leader si vous êtes dans la formation créée par le chef de cette unité. Vous pouvez donner des commandes vocales pour changer la formation (Mur/Pointe/Cercle) et créer des zones de formation.</p>\
                    <p><b>30</b>: Vous pouvez donner l'ordre « Tenez la position ! » qui augmente la défense, mais diminue la vitesse de tous les membres de l'unité.</p>\
                    <p><b>60</b>: Vous pouvez l'ordre « Chargez ! » qui augmente les dégâts infligés par les membres de l'unité pendant 20 secondes. Vous pouvez recevoir le bonus maximum des ordres et des formations.</p>\
                    <p><b>90</b>: Vous pouvez donner l'ordre « En marche ! » qui offre un bonus de vitesse à tous les membres de l'unité à portée.</p>\
                    <p><b>100</b>: La couleur de la zone de formation est différente.</p>",
                    now:0,
                    max:100
                },
                equipment:{ 
                    tier:1,
                    path:[57],
                    id:57,
                    fr:"Entretien du matériel", 
                    img:"./assets/combat/Equipment.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Entretien_du_mat%C3%A9riel",
                    info:"<h3 class='text-center'>Entretien du matériel</h3>\
                    <p><b>Tout niveau</b>: Quantité de durabilité qui peut être restaurée par l'entretien des équipements.</p>\
                    <p><b>0</b>:Vous pouvez effectuer des travaux de maintenance sur les armes, mais au prix d'une perte de durabilité maximale. </p>\
                    <p><b>30</b>: Vous pouvez effectuer des travaux de maintenance sur les armures et boucliers, mais au prix d'une perte de durabilité maximale.</p>\
                    <p><b>60</b>: Chance de récupérer des projectiles qui ont manqué leur cible (20%).</p>\
                    <p><b>90</b>: Vous pouvez enduire de poison les armes à une main équipées.</p>\
                    <p><b>100</b>: Chance de récupérer des projectiles qui ont manqué leur cible (22%).</p>",
                    now:0,
                    max:100
                },
                survival:{ 
                    tier:1,
                    path:[58],
                    id:58,
                    fr:"Survie au combat", 
                    img:"./assets/combat/Survival.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Survie_au_combat",
                    info:"<h3 class='text-center'>Survie au combat</h3>\
                    <p><b>Tout niveau</b>: Durée de traitement d'une blessure. Transforme les dégâts fatals aux points de vie en dégâts aux points de conscience (% de la réduction max).</p>\
                    <p><b>0</b>: Vous pouvez appliquer un bandage sur les blessures aux bras et aux jambes.</p> \
                    <p><b>30</b>: Vous pouvez appliquer un bandage sur les saignement au torse.</p>\
                    <p><b>60</b>: 5% de chances de doubler la quantité de dégâts fatals aux Points de vie (hHP) qui peuvent être transformés en dégâts aux Points de vie (sHP) (affecté par la Chance)</p>\
                    <p><b>90</b>: Vous pouvez appliquer un bandage sur des blessures à la tête. 10% de chances de doubler la quantité de dégâts fatals aux Points de vie (hHP) qui peuvent être transformés en dégâts aux Points de vie (sHP) (affecté par la Chance)</p>\
                    <p><b>100</b>: 11% de chances de doubler la quantité de dégâts fatals aux Points de vie (hHP) qui peuvent être transformés en dégâts aux Points de vie (sHP) (affecté par la Chance)</p>",
                    now:0,
                    max:100
                },
                demolition:{ 
                    tier:1,
                    path:[59],
                    id:59,
                    fr:"Démolition", 
                    img:"./assets/combat/Demolition.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/D%C3%A9molition",
                    info:"<h3 class='text-center'>Démolition</h3>\
                    <p><b>Tout niveau</b>: Efficacité des activités liées à la démolition.</p>\
                    <p><b>0</b>: Vous pouvez utiliser les torches au corps à corps comme une arme de siège. </p>\
                    <p><b>30</b>: Utilisation plus efficace des torches.</p>\
                    <p><b>60</b>: Vous pouvez manipuler un trébuchet.</p>\
                    <p><b>90</b>: Efficacité des activités liées à la démolition.</p>\
                    <p><b>100</b>: Vous pouvez utiliser des vaches comme projectile (juste pour s'amuser). </p>",
                    now:0,
                    max:100
                }
            },
            minor: {
                movement:{ 
                    tier:1,
                    path:[61],
                    id:61,
                    fr:"Mouvement", 
                    img:"./assets/minor/Movement.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Mouvement",
                    info:"<h3 class='text-center'>Mouvement </h3>\
                    <p><b>Chaque niveau</b>: Vitesse maximale en portant quelque chose (%)</p>",
                    now:0,
                    max:100
                    },
                general:{ 
                    tier:1,
                    path:[62],
                    id:62,
                    fr:"Activités générales", 
                    img:"./assets/minor/General.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Activit%C3%A9s_g%C3%A9n%C3%A9rales",
                    info:"<h3 class='text-center'>Activités générales</h3>\
                    <p><b>Chaque niveau</b>: Efficacité du repos. Vous pouvez effectuer plusieurs actions générales. </p>\
                    <p><b>0</b>: Vous pouvez vous reposer correctement pour récupérer de l'endurance (hS) et des points de conscience (sHP).\
                    <br>Animations d’interaction sociale:</p>\
                    <ul><li>Approuver</li>\
                    <li>Courtoisie</li>\
                    <li>Danse</li>\
                    <li>Désapprouver</li>\
                    <li>Effrayé</li>\
                    <li>Rigoler</li>\
                    <li>Provocation</li>\
                    <li>Honorer</li>\
                    <li>Accueillir</li>",
                    now:0,
                    max:100
                    },
                riding:{ 
                    tier:1,
                    path:[63],
                    id:63,
                    fr:"Equitation", 
                    img:"./assets/minor/Riding.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Equitation",
                    info:"<h3 class='text-center'>Equitation</h3>\
                    <p><b>Chaque niveau</b>: Qualité maximale des chevaux ordinaires qui peuvent être chevauchés efficacement.</p>",
                    now:0,
                    max:100
                    },
                swimming:{ 
                    tier:1,
                    path:[64],
                    id:64,
                    fr:"Natation", 
                    img:"./assets/minor/Swimming.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Natation",
                    info:"<h3 class='text-center'>Natation</h3>\
                    <p><b>Chaque niveau</b>: Endurance utilisée pour nager.</p>",
                    now:0,
                    max:100
                    },
                authority:{ 
                    tier:1,
                    path:[65],
                    id:65,
                    fr:"Autorité", 
                    img:"./assets/minor/Authority.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Autorité",
                    info:"<h3 class='text-center'>Autorité</h3>\
                    <p><b>0</b>: Vous pouvez ériger un Monument de guilde. Vous pouvez marquer les intrus comme des criminels</p>",
                    now:0,
                    max:100
                    },
                piety:{ 
                    tier:1,
                    path:[54],
                    id:54,
                    fr:"Piété", 
                    img:"./assets/minor/Piety.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Piété",
                    info:"<h3 class='text-center'>Piété</h3>\
                    <p><b>Chaque niveau</b>: Votre prière a plus de chances d'être entendue par Dieu.</p>\
                    <p><b>0</b>: Vous pouvez prier pour un Retour sain et sauf chez soi.</p>\
                    <p><b>30</b>: Vous pouvez prier Dieu (augmentation de l'alignement, une seule utilisation par jour).</p>\
                    <p><b>60</b>: Vous pouvez bénir les gens en faisant appel à la « Miséricorde » qui supprime la peine de mort pendant les événements JcJ (combats/sièges/Heure du jugement).</p>\
                    <p><b>90</b>: Vous pouvez bénir les gens en faisant appel à « L'amour de Dieu » qui augmente la chance de 3.</p>\
                    <p><b>100</b>: La bénédiction l'Amour de Dieu augmente la chance de 3,5.</p>",
                    now:0,
                    max:100
                    },
                mentoring:{ 
                    tier:1,
                    path:[55],
                    id:55,
                    fr:"Mentorat", 
                    img:"./assets/minor/Mentoring.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Mentorat",
                    info:"<h3 class='text-center'>Mentorat</h3>\
                    <p><b>Chaque niveau</b>: Niveau de compétence maximal qui peut être accordé aux étudiants</p>\
                    <p><b>0</b>: Vous pouvez enseigner des compétences de 1er niveau\
                    <p><b>30</b>: Vous pouvez enseigner des compétences de 2ème niveau et secondaires</p>\
                    <p><b>60</b>: Vous pouvez enseigner des compétences de 3ème et 4ème niveau</p>\
                    <p><b>90</b>: Peut enseigner toutes les compétences</p>\
                    <p><b>100</b>: Bonus permanent de +5 en chance quand vous enseignez</p>",
                    now:0,
                    max:100
                    },
                arts:{ 
                    tier:1,
                    path:[53],
                    id:53,
                    fr:"Beaux Arts", 
                    img:"./assets/minor/Arts.png", 
                    wiki:"https://lifeisfeudal-fr.gamepedia.com/Beaux-arts",
                    info:"<h3 class='text-center'>Beaux Arts</h3>\
                    <p><b>Chaque niveau</b>: Qualité maximale des œuvres d'art.</p>\
                    <p><b>0</b>: Vous pouvez peindre de petits tableaux.</p>\
                    <p><b>30</b>: Vous pouvez fabriquer un trophée de cerf.</p>\
                    <p><b>60</b>: Vous pouvez peindre des tableaux et fabriquer un trophée d'élan.</p>\
                    <p><b>90</b>: Vous pouvez peindre de grandes toiles et fabriquer un trophée d'ours.</p>\
                    <p><b>100</b>: Bonus permanent de + 5 en chance lors de la création d'œuvres d'art.</p>",
                    now:0,
                    max:100
                    },
                }
        },
        stats:{
            main: {
                strength:{
                    fr:"Force",
                    id:0,
                    now: 10,
                    max: 110
                },
                agility:{
                    fr:"Agilité",
                    id:1,
                    now: 10,
                    max: 110
                },
                constitution:{
                    fr:"Constitution",
                    id:2,
                    now: 10,
                    max: 110
                },
                willpower:{
                    fr:"Volonté",
                    id:3,
                    now: 10,
                    max: 110
                },
                Intellect:{
                    fr:"Intelligence",
                    id:4,
                    now: 10,
                    max: 110
                }
            },
            second: {
                life:{
                    fr:"Points de vie",
                    from:"Constitution",
                    now: 100,
                },
                stamina:{
                    fr:"Points d'endurance",
                    from:"Volonté",
                    now:100,
                },
                inventory:{
                    fr:"Capacité d'inventaire",
                    from:"Volonté",
                    now:120
                },
                skillcap:{
                    fr:"Points bonus aux compétences",
                    from:"Intelligence",
                    now:0
                },
                equipment:{
                    fr:"Capacité à porter l'équiment",
                    from:"Constitution et Force",
                    now:20
                }
            }
        },
        updateTimer:0
    },
    computed: {
    },
    methods: {
        backgroundCard(card, page){
            return {greenCard: (card.now > 0) && this.p[page].now <= this.p[page].max, redCard: (card.now > 0) && this.p[page].now > this.p[page].max};
        },
        totalColor(page){
            return {blueTotal: (page.now > 0) && (page.now < page.max), redTotal: (page.now > page.max), greenTotal: (page.now == page.max)};
        },
        changePage: function(page){
            for (var p in this.p) {
                this.p[p].active = false;
            }
            page.active = true;
        },
        checkSkillValue: function(val, card){
            val = Number(val);
            if (val < 0) {
                card.now = 0;
            } else if ( val > 100) {
                card.now = 100;
            } else {
                card.now = val;
            }
        },
        updateTotal: function(page){
            let total = 0;
            if (page == 'crafting') {
                for ( let tier1 in this.cards[page]) {
                    total += Number(this.cards[page][tier1].now);
                    for (let tier2 in this.cards[page][tier1]["tier2"]) {
                        total += Number(this.cards[page][tier1]["tier2"][tier2].now);
                        for (let tier3 in this.cards[page][tier1]["tier2"][tier2]["tier3"]) {
                            total += Number(this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now);
                            for (let tier4 in this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"]) {
                                total += Number(this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"][tier4].now);
                            }
                        }
                    }
                }
            }

            if ( page == 'combat') {
                for ( let tier1 in this.cards[page]) {
                    total += Number(this.cards[page][tier1].now);
                    for (let tier2 in this.cards[page][tier1]["tier2"]) {
                        total += Number(this.cards[page][tier1]["tier2"][tier2].now);
                        for (let tier3 in this.cards[page][tier1]["tier2"][tier2]["tier3"]) {
                            total += Number(this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now);
                        }
                    }
                }
                for ( let node in this.cards["secondCombat"]) {
                    total += Number(this.cards["secondCombat"][node].now);
                }
            }
            this.p[page].now = total;
        },
        updatePath(card, page){
            var cardPath = card.path;
            var cardId = card.id;
            var cardTier = card.tier;
            // var pathValues = [];

            // descendant check
            var modifiedCard = false;
            // TIER 1 PATH to MODIFIED CARD
            for (card in this.cards[page]) {
                var val1 = this.cards[page][card].now;
                if (this.cards[page][card].id == cardId) {
                    modifiedCard = true;
                    // console.log("all the child from this modifiedCard tier 1 are checked")
                    // CHECK HERE CHILDRENS
                    for (var card2 in this.cards[page][card]["tier2"]) {
                        var val2 = this.cards[page][card]["tier2"][card2].now;
                        if (val2 >= 30 && val1 < 60 && val1 >= 30) {
                            this.cards[page][card]["tier2"][card2].now = 29;
                        }
                        if (val1 < 30) this.cards[page][card]["tier2"][card2].now = 0;
                        val2 = this.cards[page][card]["tier2"][card2].now;
                        for (var card3 in this.cards[page][card]["tier2"][card2]["tier3"]) {
                            var val3 = this.cards[page][card]["tier2"][card2]["tier3"][card3].now;
                            if (val3 >= 30 && val2 < 60 && val2 >= 30) {
                                this.cards[page][card]["tier2"][card2]["tier3"][card3].now = 29;
                            }
                            if (val2 < 30) this.cards[page][card]["tier2"][card2]["tier3"][card3].now = 0;
                            val3 = this.cards[page][card]["tier2"][card2]["tier3"][card3].now;
                            for (var card4 in this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"]) {
                                var val4 = this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now;
                                if (val4 >= 30 && val3 < 60 && val3 >= 30) {
                                    this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now = 29;
                                }
                                if (val3 < 30) this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now = 0;
4                         }
                        }
                    }
                } 
                // continue the path to find modified card
                // TIER 2 PATH to MODIFIED CARD
                if (this.cards[page][card].id == cardPath[0] && !modifiedCard) {
                    // console.log("right card tier 1 on path but not modifiedCard", val1);
                    for (var card2 in this.cards[page][card]["tier2"]) {
                        var val2 = this.cards[page][card]["tier2"][card2].now;
                        if (this.cards[page][card]["tier2"][card2].id == cardId) {
                            modifiedCard = true;
                            // console.log("all the child from this modifiedCard tier 2 are checked")
                            // CHECK HERE CHILDRENS
                            for (var card3 in this.cards[page][card]["tier2"][card2]["tier3"]) {
                                var val3 = this.cards[page][card]["tier2"][card2]["tier3"][card3].now;
                                if (val3 >= 30 && val2 < 60 && val2 >= 30) {
                                    this.cards[page][card]["tier2"][card2]["tier3"][card3].now = 29;
                                }
                                if (val2 < 30) this.cards[page][card]["tier2"][card2]["tier3"][card3].now = 0;
                                val3 = this.cards[page][card]["tier2"][card2]["tier3"][card3].now;
                                for (var card4 in this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"]) {
                                    var val4 = this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now;
                                    if (val4 >= 30 && val3 < 60 && val3 >= 30) {
                                        this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now = 29;
                                    }
                                    if (val3 < 30) this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now = 0;
    4                           }
                            }
                        } 
                        // TIER 2 PATH to MODIFIED CARD
                        if (this.cards[page][card]["tier2"][card2].id == cardPath[1] && !modifiedCard) {
                            // console.log("right card tier 2 on path but not modifiedCard", val2);
                            for (var card3 in this.cards[page][card]["tier2"][card2]["tier3"]) {
                                var val3 = this.cards[page][card]["tier2"][card2]["tier3"][card3].now;
                                if (this.cards[page][card]["tier2"][card2]["tier3"][card3].id == cardId) {
                                    modifiedCard = true;
                                    // console.log("all the child from this modifiedCard tier 3 are checked")
                                    // CHECK HERE CHILDRENS
                                    for (var card4 in this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"]) {
                                        var val4 = this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now;
                                        if (val4 >= 30 && val3 < 60 && val3 >= 30) {
                                            this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now = 29;
                                        }
                                        if (val3 < 30) this.cards[page][card]["tier2"][card2]["tier3"][card3]["tier4"][card4].now = 0;
        4                           }
                                }
                            }
                        }
                    }
                }
            }

            var tier = 0;
            // acendant check
            mainloop: for (var tier1 in this.cards[page]) {
                if (this.cards[page][tier1].id == cardPath[tier]) {
                    var val1 = this.cards[page][tier1].now;
                    if (cardTier > 2 && val1 < 60) this.cards[page][tier1].now = 60;
                    // console.log("tier1 value:", this.cards[page][tier1].now)
                    // pathValues.push(this.cards[page][tier1].now)
                    tier++;
                    if (tier == cardTier) { break mainloop; }
                    // console.log("loop through tier 2");
                    for (var tier2 in this.cards[page][tier1]["tier2"]) {
                        if (this.cards[page][tier1]["tier2"][tier2].id == cardPath[tier]){
                            var val2 = this.cards[page][tier1]["tier2"][tier2].now;
                            if (cardTier > 3 && val2 < 60) this.cards[page][tier1]["tier2"][tier2].now = 60;
                            if (val2 > 0 && val1 < 30) this.cards[page][tier1].now = 30;
                            if (val2 >= 30 && val1 < 60) this.cards[page][tier1].now = 60;
                            // console.log("tier2 value:", this.cards[page][tier1]["tier2"][tier2].now)
                            // pathValues.push(this.cards[page][tier1]["tier2"][tier2].now);
                            tier++;
                            if (tier == cardTier) { break mainloop; }
                            // console.log("loop through tier 3");
                            for (var tier3 in this.cards[page][tier1]["tier2"][tier2]["tier3"]) {
                                if (this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].id == cardPath[tier]){
                                    var val3 = this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now;
                                    if (val3 > 0 && val2 < 30) this.cards[page][tier1]["tier2"][tier2].now = 30;
                                    if (val3 >= 30 && val2 < 60) this.cards[page][tier1]["tier2"][tier2].now = 60;
                                    // console.log("tier3 value:", this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now)
                                    // pathValues.push(this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now);
                                    tier++;
                                    if (tier == cardTier) { break mainloop; }
                                    // console.log("loop through tier 4");
                                    for (var tier4 in this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"]) {
                                        if (this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"][tier4].id == cardPath[tier]){
                                            var val4 = this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"][tier4].now;
                                            if (val4 > 0 && val3 < 30) this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now = 30;
                                            if (val4 >= 30 && val3 < 60) this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3].now = 60;
                                            // console.log("tier4 value:", this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"][tier4].now);
                                            // pathValues.push(this.cards[page][tier1]["tier2"][tier2]["tier3"][tier3]["tier4"][tier4].now);
                                            break mainloop;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // console.log("path values:", pathValues);
        },
        updateCard: function(event, card, page, parent){
            clearTimeout(this.updateTimer);
            var global = this;
            // check PATH now with parents and update path and total
            this.updateTimer = setTimeout(function(){
                // value validation
                global.checkSkillValue(event.target.value, card);
                if (page === "combat" || page === "crafting") {
                    global.updatePath(card, page);
                    global.updateTotal(page);
                }
            }, 500);
            // maybe don't need parent anymore
        },
        checkStatValue(stat){
            var value = Number(stat.now);
            if (value < 10) {
                stat.now = 10
            } if (value > 110 )
            stat.now = 110;
        },
        updateStats: function(stat){
            var global = this;
            setTimeout( function(){
                // check if valid value betwen 10 and 110
                global.checkStatValue(stat)
                // update the secondary related stats
                switch(stat.id){
                    case 0:
                        // Force Modificateurs
                        global.modifierEquipment()
                        break;
                    case 2:
                        // Constitution Modificateurs
                        var bonusLife = stat.now - 10;
                        global.stats.second.life.now = 100 + bonusLife;
                        global.modifierEquipment()
                        break;
                    case 3:
                        // Volonté Modificateurs
                        var bonusEndurance = stat.now - 10;
                        var bonusInventaire = (stat.now - 10) * 2;
                        global.stats.second.stamina.now = 100 + bonusEndurance;
                        global.stats.second.inventory.now = 120 + bonusInventaire;
                        break;
                    case 4:
                        // Intelligence Modificateurs
                        var bonus = (stat.now - 10) * 2;
                        global.stats.second.skillcap.now = bonus;
                        global.p.crafting.max = 400 + bonus;
                        global.p.combat.max = 400 + bonus;
                        break;
                }
                // update total of page 0/150
                global.updateStatsTotal();
            }, 500);
        },
        modifierEquipment: function(){
            var bonusForce = (this.stats.main.strength.now - 10) / 2;
            var bonusConstitution = (this.stats.main.constitution.now - 10) / 2;
            this.stats.second.equipment.now = 20 + bonusConstitution + bonusForce;
        },
        updateStatsTotal(){
            var total = 0;
            for (var stat in this.stats.main) {
                total += Number(this.stats.main[stat].now);
            }
            this.p.stats.now = total;
        },
        downloadDoc(){
            this.save = false;
            setTimeout(() => {
                var html = document.documentElement.outerHTML;
                var dataURI = 'data:text/html,' + encodeURIComponent(html);
                var blob = new Blob([html], {type: "text/html;charset=utf-8"});
                saveAs(blob, "fiche.html");
                this.save = true;
            }, 10)
        }
    },
    updated(){
        $(function () {
            $('[data-toggle="popover"]').popover({
                trigger: 'hover',
                html: true
            })
          })
    }
})

$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        html: true
    })
  })