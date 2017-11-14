// Si une carte à une valeur supérieur à 0, elle devient verte, sinon blanche, non utilisé. une carte verte est visible dans le résumé.
// L'image est aussi activé (colorisé plutôt que noir et blanc si 0 point)
// Si le total de point et supérieur au maximum toute les cartes deviennent orange/warning

var app = new Vue({
    el: '#app',
    data: {
        p:{
            crafting: {fr:"Artisanat", now:0, max:400, active:true},
            combat: {fr:"Combat", now:0, max:400, active:false},
            minor: {fr:"Compétences mineures", active:false},
            stats: {fr: "Statistiques", now:50, max:150, active:false},
            summary: {fr: "Résumé", active:false},
        },
        cards:{
            crafting: { 
                artisan:{ 
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
                    <p><b>100</b>: Légère augmentation des chances de trouver des ingrédients rares dans les arbres (1,5%).",
                    now:0,
                    max:100,
                    tier2: {
                        carpentry: { 
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
                                        bowcraft: {
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
                                            max:100
                                        }
                                    }
                                }
                            }
                        }, 
                        construction: {
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
                                mining: {
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
                                    tier4:{}
                                }
                            }
                        }, 
                        digging: {
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
                                smelting: {
                                    fr: "Minage",
                                    img:"./assets/crafting/Bowcraft.png",
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
                                    tier4:{}
                                }
                            }
                        }, 
                        materials: {
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
                                masonry: {
                                    fr: "Fonte",
                                    img:"./assets/crafting/Masonry.png",
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
                                    tier4:{}
                                }
                            }
                        }
                    } 
                }, 
                nature:{
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
                                    tier4:{}
                                },
                                forestry: {
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
                                    max:100,
                                    tier4:{}
                                }
                            }
                        }, 
                        farming: {
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
                                    tier4:{}
                                }
                            }
                        }                    
                    }
                },
                hunting:{
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
                                    tier4:{}
                                }
                            }
                        }  
                    }
                }
            },
            combat: {},
            minor: {},
            stats: {}
        }
    },
    methods: {
        changePage: function(page){
            for (var p in this.p) {
                this.p[p].active = false
            }
            page.active = true
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